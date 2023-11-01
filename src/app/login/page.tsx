"use client"
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';

// typage des éléments envoyés en post à l'API
interface InputProps {
  email: string,
  password: string,
}

function Login() {
  const router = useRouter()
  // les deux states ci-dessous sont des booléens
  // qui permettent d'afficher ou de masquer les passwords en cliquant sur l'icone 'oeil'
  const [clickEye, setClickEye] = useState(false);
  
  // handleChange permet de récupérer les contenus des inputs (onChange)
  // et de l'ajouter au state 'inputs' au fur et à mesure de la saisie

  // permet de vérifier le format de l'email
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  // permet de vérifier le format du password
  const isValidPassword = (password: string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\/])(?=.*[a-zA-Z]).{8,}$/.test(password);
  // permet d'envoyer les éléments contenus dans les inputs (en donc dans le state 'inputs')
  // tout en vérifiant au moment du submit le format de l'email
  // et la correspondance des deux passwords
  
  const { register, handleSubmit } = useForm<InputProps>()
  async function onSubmit (data: InputProps) {
    // Si le format de l'email n'est pas correct une notification est envoyée
    if (isValidEmail(data.email) === false) {
      return console.log("🦄 L'email n'est pas valide");
    }
    // Si le format du mot de passe n'est pas correct une notification est envoyée
    if (isValidPassword(data.password) === false) {
      return console.log("🦄 Le mot de passe n'est pas au bon format");
    }
    // on envoie un post vers l'API
    console.log(data);
    const signInData = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false, 
        })
    if (signInData?.error) {
      console.log(signInData.error);
    } else {
      router.refresh();
      router.push('/connexion');
    }
    console.log(signInData);
  };


  return (
  <div>
        <div className="flex flex-col items-center justify-between mb-48 mt-6">
          <h1 className="text-2xl font-bold lg:pt-0 text-center my-4 text-green-400">Se connecter</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
            {/* Email */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="email">
                  E-mail
                </label>
                <input {...register("email")} required name="email" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="email" type="email" placeholder="votremail@mail.com" />
              </div>
            </div>
            {/* Password */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input {...register("password")} required name="password" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="password" type={clickEye ? 'text' : 'password'} placeholder="Mot de passe" />
                <button type="button" className="absolute top-9 right-6" onClick={() => setClickEye(!clickEye)}>
                  {clickEye ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            {/* Register button */}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <button className="cursor-pointer transition-all 
                    bg-green-400 text-gray-800 px-6 py-2 rounded-lg
                    border-gray-700
                    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-gray-400 shadow-gray-400 active:shadow-none" type="submit">
                  Se connecter
                </button>
              </div>
              <div className="md:w-2/3" />
            </div>
          </form>
        </div>
        </div>
  );
}



export default Login;