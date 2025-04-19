
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Loader2, Upload, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import api from '@/services/api';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const signupSchema = z.object({
  firstName: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  lastName: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Veuillez saisir une adresse email valide' }),
  password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
  accountType: z.enum(['PATIENT', 'DOCTOR'], {
    required_error: "Veuillez sélectionner un type de compte",
  }),
  photo: z.instanceof(FileList).optional(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      accountType: 'PATIENT',
    },
  });
  
  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    
    try {
      // Préparer les données pour l'API
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('accountType', data.accountType);
      
      // Ajouter la photo si elle existe
      if (data.photo && data.photo.length > 0) {
        formData.append('photo', data.photo[0]);
      }
      
      // Appel à l'API pour l'inscription
      await api.post('/users', formData, true);
      
      toast({
        title: "Compte créé avec succès!",
        description: "Vous pouvez maintenant vous connecter.",
        variant: "default",
      });
      
      // Redirection vers la page de connexion
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      
      toast({
        variant: "destructive",
        title: "Échec de l'inscription",
        description: "Une erreur s'est produite lors de la création de votre compte. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-light to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center">
            <Calendar className="h-12 w-12 text-medical-teal" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Créer un compte DrBooking</h2>
          <p className="mt-2 text-sm text-gray-600">
            Rejoignez notre plateforme médicale pour prendre rendez-vous avec des professionnels de santé
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="vous@exemple.com" 
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
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Entrez votre mot de passe" 
                      type="password"
                      autoComplete="new-password"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Type de compte</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="PATIENT" id="patient" />
                        <label htmlFor="patient" className="cursor-pointer">Patient</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="DOCTOR" id="doctor" />
                        <label htmlFor="doctor" className="cursor-pointer">Médecin</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Photo (optionnelle)</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          onChange(e.target.files);
                          handlePhotoChange(e);
                        }}
                        {...fieldProps}
                        className="hidden"
                      />
                      <div className="flex justify-center">
                        <label 
                          htmlFor="photo" 
                          className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-medical-teal hover:bg-medical-light/30 transition-colors"
                        >
                          {photoPreview ? (
                            <img 
                              src={photoPreview} 
                              alt="Aperçu" 
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <>
                              <Upload className="h-6 w-6 text-medical-teal mb-2" />
                              <span className="text-xs text-medical-teal">Ajouter une photo</span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-medical-teal hover:bg-medical-dark"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création du compte...
                </>
              ) : (
                "Créer mon compte"
              )}
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-gray-600">Vous avez déjà un compte?</span>{' '}
              <a href="/login" className="font-medium text-medical-teal hover:text-medical-dark">
                Connectez-vous
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
