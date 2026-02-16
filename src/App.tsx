import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Home } from './pages/Home';
import { About } from './pages/About';

// Clients pages
import { ClientsAdvantages } from './pages/clients/ClientsAdvantages';
import { ClientsGallery } from './pages/clients/ClientsGallery';
import { ClientsFunctionality } from './pages/clients/ClientsFunctionality';
import { ClientsTraining } from './pages/clients/ClientsTraining';

// Brigades pages
import { BrigadesAdvantages } from './pages/brigades/BrigadesAdvantages';
import { BrigadesReviews } from './pages/brigades/BrigadesReviews';
import { BrigadesFunctionality } from './pages/brigades/BrigadesFunctionality';
import { BrigadesTraining } from './pages/brigades/BrigadesTraining';

// Support page
import { Support } from './pages/Support';

// Demo pages
import { DemoSelection } from './pages/demo/DemoSelection';
import { DemoClient } from './pages/demo/DemoClient';
import { DemoClientRoom } from './pages/demo/DemoClientRoom';
import { DemoBrigade } from './pages/demo/DemoBrigade';
import { DemoBrigadeRoom } from './pages/demo/DemoBrigadeRoom';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Clients routes */}
          <Route path="/clients/advantages" element={<ClientsAdvantages />} />
          <Route path="/clients/gallery" element={<ClientsGallery />} />
          <Route path="/clients/functionality" element={<ClientsFunctionality />} />
          <Route path="/clients/training" element={<ClientsTraining />} />
          
          {/* Brigades routes */}
          <Route path="/brigades/advantages" element={<BrigadesAdvantages />} />
          <Route path="/brigades/reviews" element={<BrigadesReviews />} />
          <Route path="/brigades/functionality" element={<BrigadesFunctionality />} />
          <Route path="/brigades/training" element={<BrigadesTraining />} />
          
          {/* Support route */}
          <Route path="/support" element={<Support />} />
          
          {/* Demo routes */}
          <Route path="/demo" element={<DemoSelection />} />
          <Route path="/demo/client" element={<DemoClient />} />
          <Route path="/demo/client/room/:roomId" element={<DemoClientRoom />} />
          <Route path="/demo/brigade" element={<DemoBrigade />} />
          <Route path="/demo/brigade/room/:roomId" element={<DemoBrigadeRoom />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}