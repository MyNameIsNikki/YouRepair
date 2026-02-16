import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useAuth } from '../hooks/useAuth';
import { authAPI } from '../utils/api';
import { toast } from 'sonner@2.0.3';
import { Loader2, Mail } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const { login, loginWithProvider } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);

  // Sign in form
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  // Sign up form
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'client' as 'client' | 'brigade',
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signInData.email || !signInData.password) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    try {
      setLoading(true);
      await login(signInData.email, signInData.password);
      toast.success('Вы успешно вошли в систему!');
      onClose();
      setSignInData({ email: '', password: '' });
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Неверный email или пароль'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    if (signUpData.password.length < 6) {
      toast.error('Пароль должен содержать минимум 6 символов');
      return;
    }

    try {
      setLoading(true);
      await authAPI.signUp({
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
        userType: signUpData.userType,
      });

      // Sign in after successful registration
      await login(signUpData.email, signUpData.password);
      
      toast.success('Регистрация успешна! Добро пожаловать!');
      onClose();
      setSignUpData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'client',
      });
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Ошибка при регистрации. Пожалуйста, попробуйте снова.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await loginWithProvider('google');
      // Note: User needs to complete Google OAuth setup in Supabase Dashboard
      // See: https://supabase.com/docs/guides/auth/social-login/auth-google
      toast.info('Перенаправление на Google...');
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Ошибка при входе через Google. Убедитесь, что OAuth настроен в Supabase Dashboard.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#6C584C]">
            {activeTab === 'signin' ? 'Вход в систему' : 'Регистрация'}
          </DialogTitle>
          <DialogDescription className="text-[#6C584C]/70">
            {activeTab === 'signin' 
              ? 'Войдите, чтобы получить доступ к вашим проектам' 
              : 'Создайте аккаунт, чтобы начать управлять ремонтами'}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'signin' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Вход</TabsTrigger>
            <TabsTrigger value="signup">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="example@email.com"
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                  required
                  className="border-[#DDE5B6] focus:border-[#ADC178]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password">Пароль</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="••••••••"
                  value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                  required
                  className="border-[#DDE5B6] focus:border-[#ADC178]"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ADC178] hover:bg-[#9BB167] text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Вход...
                  </>
                ) : (
                  'Войти'
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#DDE5B6]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-[#6C584C]/60">или</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full border-[#DDE5B6] hover:bg-[#F0EAD2]"
            >
              <Mail className="w-4 h-4 mr-2" />
              Войти через Google
            </Button>

            <p className="text-xs text-[#6C584C]/60 text-center">
              Примечание: для входа через Google необходимо настроить OAuth в Supabase Dashboard
            </p>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">
                  Имя <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Иван Иванов"
                  value={signUpData.name}
                  onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                  required
                  className="border-[#DDE5B6] focus:border-[#ADC178]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="example@email.com"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  required
                  className="border-[#DDE5B6] focus:border-[#ADC178]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">
                  Пароль <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Минимум 6 символов"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                  required
                  minLength={6}
                  className="border-[#DDE5B6] focus:border-[#ADC178]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">
                  Подтверждение пароля <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  placeholder="Повторите пароль"
                  value={signUpData.confirmPassword}
                  onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                  required
                  className="border-[#DDE5B6] focus:border-[#ADC178]"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Вы являетесь <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={signUpData.userType}
                  onValueChange={(value) => 
                    setSignUpData({ ...signUpData, userType: value as 'client' | 'brigade' })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="client" id="signup-client" />
                    <Label htmlFor="signup-client" className="font-normal cursor-pointer">
                      Заказчиком
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="brigade" id="signup-brigade" />
                    <Label htmlFor="signup-brigade" className="font-normal cursor-pointer">
                      Бригадиром
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ADC178] hover:bg-[#9BB167] text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Регистрация...
                  </>
                ) : (
                  'Зарегистрироваться'
                )}
              </Button>
            </form>

            <p className="text-xs text-[#6C584C]/60 text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
