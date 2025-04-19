
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import api from '@/services/api';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Définir le type de la réponse attendue
interface LoginResponse {
  token: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      // Appel à l'API pour la connexion avec typage correct
      const response = await api.post<LoginResponse>('/login_check', data);
      
      // Vérifie si la réponse contient un token
      if (!response || !response.token) {
        throw new Error('No token received from server');
      }
      
      // Stockage du token JWT
      localStorage.setItem('auth_token', response.token);
      
      // Configuration du token dans le service API
      api.setAuthToken(response.token);
      
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
      
      // Redirection vers la page de profil
      navigate('/me');
    } catch (error) {
      console.error('Login error:', error);
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-light to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center">
            <Calendar className="h-12 w-12 text-medical-teal" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to DrBooking</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      type="email" 
                      autoComplete="email"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your password" 
                      type="password"
                      autoComplete="current-password"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="text-sm text-right">
              <a href="#" className="font-medium text-medical-teal hover:text-medical-dark">
                Forgot your password?
              </a>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-medical-teal hover:bg-medical-dark"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account?</span>{' '}
              <a href="#" className="font-medium text-medical-teal hover:text-medical-dark">
                Sign up
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
