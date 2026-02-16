import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase clients
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

// Service role client for admin operations
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Helper function to get authenticated user
async function getAuthenticatedUser(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.split(' ')[1];
  
  // If it's the anon key, return null (no authenticated user)
  if (token === supabaseAnonKey) {
    return null;
  }
  
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  
  if (error || !user) {
    return null;
  }
  
  return user;
}

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Storage buckets on startup
async function initializeStorage() {
  try {
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    
    // Create media bucket if it doesn't exist
    const mediaBucketName = 'make-ee694789-media';
    const bucketExists = buckets?.some(bucket => bucket.name === mediaBucketName);
    
    if (!bucketExists) {
      await supabaseAdmin.storage.createBucket(mediaBucketName, {
        public: false,
        fileSizeLimit: 52428800, // 50MB
      });
      console.log(`Created bucket: ${mediaBucketName}`);
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
}

// Initialize storage on startup
initializeStorage();

// ============================================
// HEALTH CHECK
// ============================================

app.get("/make-server-ee694789/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Sign up - create new user (Customer or Foreman)
app.post("/make-server-ee694789/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { 
      email, 
      password, 
      userType, 
      firstName, 
      lastName, 
      middleName, 
      phone, 
      supervisorPhone 
    } = body;

    if (!email || !password || !userType || !firstName || !lastName || !phone) {
      return c.json({ 
        error: 'Missing required fields: email, password, userType, firstName, lastName, phone' 
      }, 400);
    }

    if (!['customer', 'foreman'].includes(userType)) {
      return c.json({ error: 'userType must be either "customer" or "foreman"' }, 400);
    }

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        user_type: userType,
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (authError || !authData.user) {
      console.error('Sign up auth error:', authError);
      return c.json({ error: `Sign up failed: ${authError?.message}` }, 400);
    }

    // Create customer or foreman record in database
    let dbRecord;
    if (userType === 'customer') {
      const { data, error } = await supabaseAdmin
        .from('customers')
        .insert({
          email,
          phone,
          first_name: firstName,
          last_name: lastName,
          middle_name: middleName || null,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating customer:', error);
        // Cleanup auth user if DB insert fails
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
        return c.json({ error: `Failed to create customer record: ${error.message}` }, 500);
      }
      dbRecord = data;
    } else {
      if (!supervisorPhone) {
        return c.json({ error: 'supervisor_phone is required for foremen' }, 400);
      }

      const { data, error } = await supabaseAdmin
        .from('foremen')
        .insert({
          email,
          phone,
          supervisor_phone: supervisorPhone,
          first_name: firstName,
          last_name: lastName,
          middle_name: middleName || null,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating foreman:', error);
        // Cleanup auth user if DB insert fails
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
        return c.json({ error: `Failed to create foreman record: ${error.message}` }, 500);
      }
      dbRecord = data;
    }

    // Store mapping between auth user and database record
    await kv.set(`user_mapping:${authData.user.id}`, {
      userType,
      dbId: userType === 'customer' ? dbRecord.customer_id : dbRecord.foreman_id,
      email,
    });

    return c.json({ 
      success: true, 
      user: {
        id: authData.user.id,
        email: authData.user.email,
        userType,
        dbRecord,
      }
    });
  } catch (error) {
    console.error('Sign up error:', error);
    return c.json({ error: `Sign up failed: ${error.message}` }, 500);
  }
});

// Get current user profile
app.get("/make-server-ee694789/profile", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized: Please sign in' }, 401);
    }

    // Get user mapping
    const mapping = await kv.get(`user_mapping:${user.id}`);
    
    if (!mapping) {
      return c.json({ 
        error: 'User profile not found. Please contact support.' 
      }, 404);
    }

    // Fetch from appropriate table
    let profile;
    if (mapping.userType === 'customer') {
      const { data, error } = await supabaseAdmin
        .from('customers')
        .select('*')
        .eq('customer_id', mapping.dbId)
        .single();

      if (error) {
        console.error('Error fetching customer:', error);
        return c.json({ error: 'Failed to fetch profile' }, 500);
      }
      profile = data;
    } else {
      const { data, error } = await supabaseAdmin
        .from('foremen')
        .select('*')
        .eq('foreman_id', mapping.dbId)
        .single();

      if (error) {
        console.error('Error fetching foreman:', error);
        return c.json({ error: 'Failed to fetch profile' }, 500);
      }
      profile = data;
    }

    return c.json({
      success: true,
      userType: mapping.userType,
      profile,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return c.json({ error: `Failed to get profile: ${error.message}` }, 500);
  }
});

// ============================================
// CUSTOMER ROUTES
// ============================================

// Get all customers (admin/foreman only)
app.get("/make-server-ee694789/customers", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data, error } = await supabaseAdmin
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching customers:', error);
      return c.json({ error: 'Failed to fetch customers' }, 500);
    }

    return c.json({ success: true, customers: data });
  } catch (error) {
    console.error('Get customers error:', error);
    return c.json({ error: `Failed to get customers: ${error.message}` }, 500);
  }
});

// Get single customer
app.get("/make-server-ee694789/customers/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const customerId = parseInt(c.req.param('id'));

    const { data, error } = await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('customer_id', customerId)
      .single();

    if (error) {
      console.error('Error fetching customer:', error);
      return c.json({ error: 'Customer not found' }, 404);
    }

    return c.json({ success: true, customer: data });
  } catch (error) {
    console.error('Get customer error:', error);
    return c.json({ error: `Failed to get customer: ${error.message}` }, 500);
  }
});

// Update customer
app.put("/make-server-ee694789/customers/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const customerId = parseInt(c.req.param('id'));
    const body = await c.req.json();

    const { data, error } = await supabaseAdmin
      .from('customers')
      .update({
        phone: body.phone,
        first_name: body.firstName,
        last_name: body.lastName,
        middle_name: body.middleName,
      })
      .eq('customer_id', customerId)
      .select()
      .single();

    if (error) {
      console.error('Error updating customer:', error);
      return c.json({ error: 'Failed to update customer' }, 500);
    }

    return c.json({ success: true, customer: data });
  } catch (error) {
    console.error('Update customer error:', error);
    return c.json({ error: `Failed to update customer: ${error.message}` }, 500);
  }
});

// ============================================
// FOREMAN ROUTES
// ============================================

// Get all foremen
app.get("/make-server-ee694789/foremen", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data, error } = await supabaseAdmin
      .from('foremen')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching foremen:', error);
      return c.json({ error: 'Failed to fetch foremen' }, 500);
    }

    return c.json({ success: true, foremen: data });
  } catch (error) {
    console.error('Get foremen error:', error);
    return c.json({ error: `Failed to get foremen: ${error.message}` }, 500);
  }
});

// Get single foreman
app.get("/make-server-ee694789/foremen/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const foremanId = parseInt(c.req.param('id'));

    const { data, error } = await supabaseAdmin
      .from('foremen')
      .select('*')
      .eq('foreman_id', foremanId)
      .single();

    if (error) {
      console.error('Error fetching foreman:', error);
      return c.json({ error: 'Foreman not found' }, 404);
    }

    return c.json({ success: true, foreman: data });
  } catch (error) {
    console.error('Get foreman error:', error);
    return c.json({ error: `Failed to get foreman: ${error.message}` }, 500);
  }
});

// Update foreman
app.put("/make-server-ee694789/foremen/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const foremanId = parseInt(c.req.param('id'));
    const body = await c.req.json();

    const { data, error } = await supabaseAdmin
      .from('foremen')
      .update({
        phone: body.phone,
        supervisor_phone: body.supervisorPhone,
        first_name: body.firstName,
        last_name: body.lastName,
        middle_name: body.middleName,
      })
      .eq('foreman_id', foremanId)
      .select()
      .single();

    if (error) {
      console.error('Error updating foreman:', error);
      return c.json({ error: 'Failed to update foreman' }, 500);
    }

    return c.json({ success: true, foreman: data });
  } catch (error) {
    console.error('Update foreman error:', error);
    return c.json({ error: `Failed to update foreman: ${error.message}` }, 500);
  }
});

// ============================================
// PROJECT ROUTES
// ============================================

// Get all projects for authenticated user
app.get("/make-server-ee694789/projects", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const mapping = await kv.get(`user_mapping:${user.id}`);
    if (!mapping) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    let query = supabaseAdmin
      .from('projects')
      .select(`
        *,
        customer:customers(customer_id, first_name, last_name, email, phone),
        foreman:foremen(foreman_id, first_name, last_name, email, phone)
      `);

    // Filter based on user type
    if (mapping.userType === 'customer') {
      query = query.eq('customer_id', mapping.dbId);
    } else {
      query = query.eq('foreman_id', mapping.dbId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return c.json({ error: 'Failed to fetch projects' }, 500);
    }

    return c.json({ success: true, projects: data });
  } catch (error) {
    console.error('Get projects error:', error);
    return c.json({ error: `Failed to get projects: ${error.message}` }, 500);
  }
});

// Get single project with details
app.get("/make-server-ee694789/projects/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const projectId = parseInt(c.req.param('id'));

    const { data, error } = await supabaseAdmin
      .from('projects')
      .select(`
        *,
        customer:customers(*),
        foreman:foremen(*),
        rooms(*)
      `)
      .eq('project_id', projectId)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      return c.json({ error: 'Project not found' }, 404);
    }

    // Verify user has access
    const mapping = await kv.get(`user_mapping:${user.id}`);
    if (mapping) {
      const hasAccess = 
        (mapping.userType === 'customer' && data.customer_id === mapping.dbId) ||
        (mapping.userType === 'foreman' && data.foreman_id === mapping.dbId);

      if (!hasAccess) {
        return c.json({ error: 'Forbidden' }, 403);
      }
    }

    return c.json({ success: true, project: data });
  } catch (error) {
    console.error('Get project error:', error);
    return c.json({ error: `Failed to get project: ${error.message}` }, 500);
  }
});

// Create new project
app.post("/make-server-ee694789/projects", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { 
      projectName, 
      customerId, 
      foremanId, 
      budget, 
      startDate, 
      endDate 
    } = body;

    if (!projectName || !customerId || !foremanId || !budget) {
      return c.json({ 
        error: 'Missing required fields: projectName, customerId, foremanId, budget' 
      }, 400);
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert({
        project_name: projectName,
        customer_id: customerId,
        foreman_id: foremanId,
        budget: budget,
        spent_budget: 0,
        start_date: startDate || null,
        end_date: endDate || null,
        status: 'planning',
      })
      .select(`
        *,
        customer:customers(*),
        foreman:foremen(*)
      `)
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return c.json({ error: `Failed to create project: ${error.message}` }, 500);
    }

    return c.json({ success: true, project: data });
  } catch (error) {
    console.error('Create project error:', error);
    return c.json({ error: `Failed to create project: ${error.message}` }, 500);
  }
});

// Update project
app.put("/make-server-ee694789/projects/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const projectId = parseInt(c.req.param('id'));
    const body = await c.req.json();

    const updates: any = {};
    if (body.projectName !== undefined) updates.project_name = body.projectName;
    if (body.budget !== undefined) updates.budget = body.budget;
    if (body.spentBudget !== undefined) updates.spent_budget = body.spentBudget;
    if (body.startDate !== undefined) updates.start_date = body.startDate;
    if (body.endDate !== undefined) updates.end_date = body.endDate;
    if (body.status !== undefined) updates.status = body.status;

    const { data, error } = await supabaseAdmin
      .from('projects')
      .update(updates)
      .eq('project_id', projectId)
      .select(`
        *,
        customer:customers(*),
        foreman:foremen(*)
      `)
      .single();

    if (error) {
      console.error('Error updating project:', error);
      return c.json({ error: 'Failed to update project' }, 500);
    }

    return c.json({ success: true, project: data });
  } catch (error) {
    console.error('Update project error:', error);
    return c.json({ error: `Failed to update project: ${error.message}` }, 500);
  }
});

// Delete project
app.delete("/make-server-ee694789/projects/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const projectId = parseInt(c.req.param('id'));

    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('project_id', projectId);

    if (error) {
      console.error('Error deleting project:', error);
      return c.json({ error: 'Failed to delete project' }, 500);
    }

    return c.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    return c.json({ error: `Failed to delete project: ${error.message}` }, 500);
  }
});

// ============================================
// ROOM ROUTES
// ============================================

// Get all rooms for a project
app.get("/make-server-ee694789/projects/:projectId/rooms", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const projectId = parseInt(c.req.param('projectId'));

    const { data, error } = await supabaseAdmin
      .from('rooms')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching rooms:', error);
      return c.json({ error: 'Failed to fetch rooms' }, 500);
    }

    return c.json({ success: true, rooms: data });
  } catch (error) {
    console.error('Get rooms error:', error);
    return c.json({ error: `Failed to get rooms: ${error.message}` }, 500);
  }
});

// Get single room with tasks
app.get("/make-server-ee694789/rooms/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const roomId = parseInt(c.req.param('id'));

    const { data, error } = await supabaseAdmin
      .from('rooms')
      .select(`
        *,
        project:projects(*),
        tasks(*)
      `)
      .eq('room_id', roomId)
      .single();

    if (error) {
      console.error('Error fetching room:', error);
      return c.json({ error: 'Room not found' }, 404);
    }

    return c.json({ success: true, room: data });
  } catch (error) {
    console.error('Get room error:', error);
    return c.json({ error: `Failed to get room: ${error.message}` }, 500);
  }
});

// Create new room
app.post("/make-server-ee694789/projects/:projectId/rooms", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const projectId = parseInt(c.req.param('projectId'));
    const body = await c.req.json();

    if (!body.roomName) {
      return c.json({ error: 'Missing required field: roomName' }, 400);
    }

    const { data, error } = await supabaseAdmin
      .from('rooms')
      .insert({
        project_id: projectId,
        room_name: body.roomName,
        status: body.status || 'pending',
        description: body.description || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating room:', error);
      return c.json({ error: `Failed to create room: ${error.message}` }, 500);
    }

    return c.json({ success: true, room: data });
  } catch (error) {
    console.error('Create room error:', error);
    return c.json({ error: `Failed to create room: ${error.message}` }, 500);
  }
});

// Update room
app.put("/make-server-ee694789/rooms/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const roomId = parseInt(c.req.param('id'));
    const body = await c.req.json();

    const updates: any = {};
    if (body.roomName !== undefined) updates.room_name = body.roomName;
    if (body.status !== undefined) updates.status = body.status;
    if (body.description !== undefined) updates.description = body.description;
    if (body.status === 'completed' && !body.completedAt) {
      updates.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('rooms')
      .update(updates)
      .eq('room_id', roomId)
      .select()
      .single();

    if (error) {
      console.error('Error updating room:', error);
      return c.json({ error: 'Failed to update room' }, 500);
    }

    return c.json({ success: true, room: data });
  } catch (error) {
    console.error('Update room error:', error);
    return c.json({ error: `Failed to update room: ${error.message}` }, 500);
  }
});

// Delete room
app.delete("/make-server-ee694789/rooms/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const roomId = parseInt(c.req.param('id'));

    const { error } = await supabaseAdmin
      .from('rooms')
      .delete()
      .eq('room_id', roomId);

    if (error) {
      console.error('Error deleting room:', error);
      return c.json({ error: 'Failed to delete room' }, 500);
    }

    return c.json({ success: true, message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Delete room error:', error);
    return c.json({ error: `Failed to delete room: ${error.message}` }, 500);
  }
});

// ============================================
// TASK ROUTES
// ============================================

// Get all tasks for a room
app.get("/make-server-ee694789/rooms/:roomId/tasks", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const roomId = parseInt(c.req.param('roomId'));

    const { data, error } = await supabaseAdmin
      .from('tasks')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching tasks:', error);
      return c.json({ error: 'Failed to fetch tasks' }, 500);
    }

    return c.json({ success: true, tasks: data });
  } catch (error) {
    console.error('Get tasks error:', error);
    return c.json({ error: `Failed to get tasks: ${error.message}` }, 500);
  }
});

// Get single task with materials and media
app.get("/make-server-ee694789/tasks/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const taskId = parseInt(c.req.param('id'));

    const { data, error } = await supabaseAdmin
      .from('tasks')
      .select(`
        *,
        room:rooms(*),
        materials(*),
        media(*),
        reports(*)
      `)
      .eq('task_id', taskId)
      .single();

    if (error) {
      console.error('Error fetching task:', error);
      return c.json({ error: 'Task not found' }, 404);
    }

    return c.json({ success: true, task: data });
  } catch (error) {
    console.error('Get task error:', error);
    return c.json({ error: `Failed to get task: ${error.message}` }, 500);
  }
});

// Create new task
app.post("/make-server-ee694789/rooms/:roomId/tasks", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const roomId = parseInt(c.req.param('roomId'));
    const body = await c.req.json();

    if (!body.taskName) {
      return c.json({ error: 'Missing required field: taskName' }, 400);
    }

    const { data, error } = await supabaseAdmin
      .from('tasks')
      .insert({
        room_id: roomId,
        task_name: body.taskName,
        description: body.description || null,
        start_date: body.startDate || null,
        end_date: body.endDate || null,
        status: body.status || 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating task:', error);
      return c.json({ error: `Failed to create task: ${error.message}` }, 500);
    }

    return c.json({ success: true, task: data });
  } catch (error) {
    console.error('Create task error:', error);
    return c.json({ error: `Failed to create task: ${error.message}` }, 500);
  }
});

// Update task
app.put("/make-server-ee694789/tasks/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const taskId = parseInt(c.req.param('id'));
    const body = await c.req.json();

    const updates: any = {};
    if (body.taskName !== undefined) updates.task_name = body.taskName;
    if (body.description !== undefined) updates.description = body.description;
    if (body.startDate !== undefined) updates.start_date = body.startDate;
    if (body.endDate !== undefined) updates.end_date = body.endDate;
    if (body.status !== undefined) updates.status = body.status;
    if (body.status === 'completed' && !body.completedAt) {
      updates.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('tasks')
      .update(updates)
      .eq('task_id', taskId)
      .select()
      .single();

    if (error) {
      console.error('Error updating task:', error);
      return c.json({ error: 'Failed to update task' }, 500);
    }

    return c.json({ success: true, task: data });
  } catch (error) {
    console.error('Update task error:', error);
    return c.json({ error: `Failed to update task: ${error.message}` }, 500);
  }
});

// Delete task
app.delete("/make-server-ee694789/tasks/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const taskId = parseInt(c.req.param('id'));

    const { error } = await supabaseAdmin
      .from('tasks')
      .delete()
      .eq('task_id', taskId);

    if (error) {
      console.error('Error deleting task:', error);
      return c.json({ error: 'Failed to delete task' }, 500);
    }

    return c.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    return c.json({ error: `Failed to delete task: ${error.message}` }, 500);
  }
});

// ============================================
// MATERIAL ROUTES
// ============================================

// Get all materials for a task
app.get("/make-server-ee694789/tasks/:taskId/materials", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const taskId = parseInt(c.req.param('taskId'));

    const { data, error } = await supabaseAdmin
      .from('materials')
      .select('*')
      .eq('task_id', taskId)
      .order('purchase_date', { ascending: false });

    if (error) {
      console.error('Error fetching materials:', error);
      return c.json({ error: 'Failed to fetch materials' }, 500);
    }

    return c.json({ success: true, materials: data });
  } catch (error) {
    console.error('Get materials error:', error);
    return c.json({ error: `Failed to get materials: ${error.message}` }, 500);
  }
});

// Create new material
app.post("/make-server-ee694789/tasks/:taskId/materials", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const taskId = parseInt(c.req.param('taskId'));
    const body = await c.req.json();

    if (!body.materialName || !body.quantity || !body.unitPrice || !body.purchaseDate) {
      return c.json({ 
        error: 'Missing required fields: materialName, quantity, unitPrice, purchaseDate' 
      }, 400);
    }

    const { data, error } = await supabaseAdmin
      .from('materials')
      .insert({
        task_id: taskId,
        material_name: body.materialName,
        quantity: body.quantity,
        unit_price: body.unitPrice,
        receipt_photo_base64: body.receiptPhoto || null,
        purchase_date: body.purchaseDate,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating material:', error);
      return c.json({ error: `Failed to create material: ${error.message}` }, 500);
    }

    // Update project spent_budget
    const { data: task } = await supabaseAdmin
      .from('tasks')
      .select('room_id')
      .eq('task_id', taskId)
      .single();

    if (task) {
      const { data: room } = await supabaseAdmin
        .from('rooms')
        .select('project_id')
        .eq('room_id', task.room_id)
        .single();

      if (room) {
        const totalCost = body.quantity * body.unitPrice;
        await supabaseAdmin.rpc('increment_spent_budget', {
          proj_id: room.project_id,
          amount: totalCost
        }).catch(() => {
          // If RPC doesn't exist, update manually
          supabaseAdmin
            .from('projects')
            .select('spent_budget')
            .eq('project_id', room.project_id)
            .single()
            .then(({ data: project }) => {
              if (project) {
                supabaseAdmin
                  .from('projects')
                  .update({ spent_budget: (project.spent_budget || 0) + totalCost })
                  .eq('project_id', room.project_id);
              }
            });
        });
      }
    }

    return c.json({ success: true, material: data });
  } catch (error) {
    console.error('Create material error:', error);
    return c.json({ error: `Failed to create material: ${error.message}` }, 500);
  }
});

// Update material
app.put("/make-server-ee694789/materials/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const materialId = parseInt(c.req.param('id'));
    const body = await c.req.json();

    const updates: any = {};
    if (body.materialName !== undefined) updates.material_name = body.materialName;
    if (body.quantity !== undefined) updates.quantity = body.quantity;
    if (body.unitPrice !== undefined) updates.unit_price = body.unitPrice;
    if (body.receiptPhoto !== undefined) updates.receipt_photo_base64 = body.receiptPhoto;
    if (body.purchaseDate !== undefined) updates.purchase_date = body.purchaseDate;

    const { data, error } = await supabaseAdmin
      .from('materials')
      .update(updates)
      .eq('material_id', materialId)
      .select()
      .single();

    if (error) {
      console.error('Error updating material:', error);
      return c.json({ error: 'Failed to update material' }, 500);
    }

    return c.json({ success: true, material: data });
  } catch (error) {
    console.error('Update material error:', error);
    return c.json({ error: `Failed to update material: ${error.message}` }, 500);
  }
});

// Delete material
app.delete("/make-server-ee694789/materials/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const materialId = parseInt(c.req.param('id'));

    const { error } = await supabaseAdmin
      .from('materials')
      .delete()
      .eq('material_id', materialId);

    if (error) {
      console.error('Error deleting material:', error);
      return c.json({ error: 'Failed to delete material' }, 500);
    }

    return c.json({ success: true, message: 'Material deleted successfully' });
  } catch (error) {
    console.error('Delete material error:', error);
    return c.json({ error: `Failed to delete material: ${error.message}` }, 500);
  }
});

// ============================================
// MEDIA ROUTES
// ============================================

// Get all media for a task
app.get("/make-server-ee694789/tasks/:taskId/media", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const taskId = parseInt(c.req.param('taskId'));

    const { data, error } = await supabaseAdmin
      .from('media')
      .select('*')
      .eq('task_id', taskId)
      .order('upload_date', { ascending: false });

    if (error) {
      console.error('Error fetching media:', error);
      return c.json({ error: 'Failed to fetch media' }, 500);
    }

    return c.json({ success: true, media: data });
  } catch (error) {
    console.error('Get media error:', error);
    return c.json({ error: `Failed to get media: ${error.message}` }, 500);
  }
});

// Create new media
app.post("/make-server-ee694789/tasks/:taskId/media", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const mapping = await kv.get(`user_mapping:${user.id}`);
    const taskId = parseInt(c.req.param('taskId'));
    const body = await c.req.json();

    if (!body.fileName || !body.fileData || !body.fileType || !body.fileSize) {
      return c.json({ 
        error: 'Missing required fields: fileName, fileData, fileType, fileSize' 
      }, 400);
    }

    const { data, error } = await supabaseAdmin
      .from('media')
      .insert({
        task_id: taskId,
        file_name: body.fileName,
        file_data_base64: body.fileData,
        file_type: body.fileType,
        file_size: body.fileSize,
        description: body.description || null,
        uploaded_by: mapping?.dbId || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating media:', error);
      return c.json({ error: `Failed to create media: ${error.message}` }, 500);
    }

    return c.json({ success: true, media: data });
  } catch (error) {
    console.error('Create media error:', error);
    return c.json({ error: `Failed to create media: ${error.message}` }, 500);
  }
});

// Delete media
app.delete("/make-server-ee694789/media/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const mediaId = parseInt(c.req.param('id'));

    const { error } = await supabaseAdmin
      .from('media')
      .delete()
      .eq('media_id', mediaId);

    if (error) {
      console.error('Error deleting media:', error);
      return c.json({ error: 'Failed to delete media' }, 500);
    }

    return c.json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Delete media error:', error);
    return c.json({ error: `Failed to delete media: ${error.message}` }, 500);
  }
});

// ============================================
// REPORT ROUTES
// ============================================

// Get all reports for a task
app.get("/make-server-ee694789/tasks/:taskId/reports", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const taskId = parseInt(c.req.param('taskId'));

    const { data, error } = await supabaseAdmin
      .from('reports')
      .select('*')
      .eq('task_id', taskId)
      .order('upload_date', { ascending: false });

    if (error) {
      console.error('Error fetching reports:', error);
      return c.json({ error: 'Failed to fetch reports' }, 500);
    }

    return c.json({ success: true, reports: data });
  } catch (error) {
    console.error('Get reports error:', error);
    return c.json({ error: `Failed to get reports: ${error.message}` }, 500);
  }
});

// Create new report
app.post("/make-server-ee694789/tasks/:taskId/reports", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const taskId = parseInt(c.req.param('taskId'));
    const body = await c.req.json();

    if (!body.fileName || !body.fileData || !body.fileType || !body.fileSize) {
      return c.json({ 
        error: 'Missing required fields: fileName, fileData, fileType, fileSize' 
      }, 400);
    }

    const { data, error } = await supabaseAdmin
      .from('reports')
      .insert({
        task_id: taskId,
        file_name: body.fileName,
        file_data_base64: body.fileData,
        file_type: body.fileType,
        file_size: body.fileSize,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating report:', error);
      return c.json({ error: `Failed to create report: ${error.message}` }, 500);
    }

    return c.json({ success: true, report: data });
  } catch (error) {
    console.error('Create report error:', error);
    return c.json({ error: `Failed to create report: ${error.message}` }, 500);
  }
});

// Delete report
app.delete("/make-server-ee694789/reports/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const reportId = parseInt(c.req.param('id'));

    const { error } = await supabaseAdmin
      .from('reports')
      .delete()
      .eq('report_id', reportId);

    if (error) {
      console.error('Error deleting report:', error);
      return c.json({ error: 'Failed to delete report' }, 500);
    }

    return c.json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Delete report error:', error);
    return c.json({ error: `Failed to delete report: ${error.message}` }, 500);
  }
});

// ============================================
// TICKET ROUTES
// ============================================

// Get all tickets
app.get("/make-server-ee694789/tickets", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const mapping = await kv.get(`user_mapping:${user.id}`);
    if (!mapping) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    let query = supabaseAdmin
      .from('tickets')
      .select(`
        *,
        foreman:foremen(first_name, last_name, phone),
        customer:customers(first_name, last_name, phone)
      `);

    // Filter based on user type
    if (mapping.userType === 'customer') {
      query = query.eq('customer_id', mapping.dbId);
    } else {
      query = query.eq('foreman_id', mapping.dbId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tickets:', error);
      return c.json({ error: 'Failed to fetch tickets' }, 500);
    }

    return c.json({ success: true, tickets: data });
  } catch (error) {
    console.error('Get tickets error:', error);
    return c.json({ error: `Failed to get tickets: ${error.message}` }, 500);
  }
});

// Get single ticket
app.get("/make-server-ee694789/tickets/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const ticketId = parseInt(c.req.param('id'));

    const { data, error } = await supabaseAdmin
      .from('tickets')
      .select(`
        *,
        foreman:foremen(*),
        customer:customers(*)
      `)
      .eq('ticket_id', ticketId)
      .single();

    if (error) {
      console.error('Error fetching ticket:', error);
      return c.json({ error: 'Ticket not found' }, 404);
    }

    return c.json({ success: true, ticket: data });
  } catch (error) {
    console.error('Get ticket error:', error);
    return c.json({ error: `Failed to get ticket: ${error.message}` }, 500);
  }
});

// Create new ticket
app.post("/make-server-ee694789/tickets", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const mapping = await kv.get(`user_mapping:${user.id}`);
    if (!mapping) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    const body = await c.req.json();

    const ticketData: any = {
      description: body.description || null,
      status: body.status || 'open',
    };

    // Set appropriate IDs based on user type
    if (mapping.userType === 'customer') {
      ticketData.customer_id = mapping.dbId;
      if (body.foremanId) ticketData.foreman_id = body.foremanId;
    } else {
      ticketData.foreman_id = mapping.dbId;
      if (body.customerId) ticketData.customer_id = body.customerId;
    }

    if (body.foremanPhone) ticketData.foreman_phone = body.foremanPhone;
    if (body.supervisorPhone) ticketData.supervisor_phone = body.supervisorPhone;

    const { data, error } = await supabaseAdmin
      .from('tickets')
      .insert(ticketData)
      .select(`
        *,
        foreman:foremen(*),
        customer:customers(*)
      `)
      .single();

    if (error) {
      console.error('Error creating ticket:', error);
      return c.json({ error: `Failed to create ticket: ${error.message}` }, 500);
    }

    return c.json({ success: true, ticket: data });
  } catch (error) {
    console.error('Create ticket error:', error);
    return c.json({ error: `Failed to create ticket: ${error.message}` }, 500);
  }
});

// Update ticket
app.put("/make-server-ee694789/tickets/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const ticketId = parseInt(c.req.param('id'));
    const body = await c.req.json();

    const updates: any = {};
    if (body.description !== undefined) updates.description = body.description;
    if (body.status !== undefined) updates.status = body.status;
    if (body.foremanPhone !== undefined) updates.foreman_phone = body.foremanPhone;
    if (body.supervisorPhone !== undefined) updates.supervisor_phone = body.supervisorPhone;

    const { data, error } = await supabaseAdmin
      .from('tickets')
      .update(updates)
      .eq('ticket_id', ticketId)
      .select(`
        *,
        foreman:foremen(*),
        customer:customers(*)
      `)
      .single();

    if (error) {
      console.error('Error updating ticket:', error);
      return c.json({ error: 'Failed to update ticket' }, 500);
    }

    return c.json({ success: true, ticket: data });
  } catch (error) {
    console.error('Update ticket error:', error);
    return c.json({ error: `Failed to update ticket: ${error.message}` }, 500);
  }
});

// Delete ticket
app.delete("/make-server-ee694789/tickets/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const ticketId = parseInt(c.req.param('id'));

    const { error } = await supabaseAdmin
      .from('tickets')
      .delete()
      .eq('ticket_id', ticketId);

    if (error) {
      console.error('Error deleting ticket:', error);
      return c.json({ error: 'Failed to delete ticket' }, 500);
    }

    return c.json({ success: true, message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Delete ticket error:', error);
    return c.json({ error: `Failed to delete ticket: ${error.message}` }, 500);
  }
});

// ============================================
// DEMO REQUEST ROUTES (Lead Capture) - Keep using KV
// ============================================

// Create demo request
app.post("/make-server-ee694789/demo-requests", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, userType, message } = body;

    if (!name || !email || !userType) {
      return c.json({ error: 'Missing required fields: name, email, userType' }, 400);
    }

    const requestId = `demo_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const demoRequest = {
      id: requestId,
      name,
      email,
      phone: phone || '',
      userType,
      message: message || '',
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`demo_request:${requestId}`, demoRequest);

    // Also add to index for easy retrieval
    const requests = await kv.get('demo_requests_index') || [];
    requests.push(requestId);
    await kv.set('demo_requests_index', requests);

    return c.json({ 
      success: true, 
      message: 'Заявка на демо успешно отправлена!',
      requestId 
    });
  } catch (error) {
    console.error('Create demo request error:', error);
    return c.json({ error: `Failed to create demo request: ${error.message}` }, 500);
  }
});

// Get all demo requests (admin only)
app.get("/make-server-ee694789/demo-requests", async (c) => {
  try {
    const requestIds = await kv.get('demo_requests_index') || [];
    const requests = await kv.mget(requestIds.map(id => `demo_request:${id}`));

    return c.json({ 
      success: true, 
      requests: requests.filter(r => r !== null),
      total: requests.length 
    });
  } catch (error) {
    console.error('Get demo requests error:', error);
    return c.json({ error: `Failed to get demo requests: ${error.message}` }, 500);
  }
});

// ============================================
// START SERVER
// ============================================

Deno.serve(app.fetch);
