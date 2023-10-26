"use client"
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import Header from '../../components/header'
import Footer from '../../components/footer'

// typage des éléments envoyés en post à l'API
interface InputProps {
  name: string,
  entreprise: string,
  email: string,
  password: string,
  passwordConfirm: string
}

function Register() {

  // state qui va contenir tout le contenu des inputs au fur
  // et à mesure qu'ils se remplissent par le user, cela permettra de valider le format du password
  const [inputs, setInputs] = useState<InputProps>({ name: '', entreprise: '', email: '', password: '', passwordConfirm: '' });
  // les deux states ci-dessous sont des booléens
  // qui permettent d'afficher ou de masquer les passwords en cliquant sur l'icone 'oeil'
  // (voir dans handleEyeClickPwd et handleEyeClickPwdVerif)
  const [clickEye, setClickEye] = useState(false);
  const [clickEyeVerif, setClickEyeVerif] = useState(false);
  // ------Variables de test pour chaque condition du password (min, maj, num, carac spé, nb carac)----------
  const isMajInPwd = (password: string) => /[A-Z]/.test(password);
  const isMinInPwd = (password: string) => /[a-z]/.test(password);
  const isNumbInPwd = (password: string) => /[0-9]/.test(password);
  const isSpeCaracInPwd = (password: string) => /[\W_]/.test(password);
  const isLengthValid = (password: string) => {
    if (password) {
      return password.length >= 8
    }
  }
  // ------------------------------------------------------------------------------------------------------
  // handleChange permet de récupérer les contenus des inputs (onChange)
  // et de l'ajouter au state 'inputs' au fur et à mesure de la saisie
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const { value } = e.target!
    setInputs((values) => ({ ...values, [name]: value }));
  }
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
    // Si les mots de passe ne correspondent pas une notification est envoyée
    if (data.password !== data.passwordConfirm) {
      return console.log('🦄 Les mots de passe sont différents');
    }
    // on envoie un post vers l'API
    console.log(data);
    console.log(JSON.stringify(data))
      const response = await fetch('/api/user/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const newUser = await response.json();
      console.log(newUser);
  };


  return (
  <div>
  <Header />
        <div className="flex flex-col items-center justify-between mb-3 mt-6">
          <h1 className="text-2xl font-bold lg:pt-0 text-center my-4 text-green-400">S&apos;inscrire</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
            {/* Name */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="name">
                  Nom d&apos;utilisateur
                </label>
                <input {...register("name")} name="name" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white]" id="last_name" type="text" placeholder="Nom d&apos;utilisateur" />
              </div>
            </div>
            {/* Entreprise */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="entreprise">
                  Entreprise
                </label>
                <input {...register("entreprise")} name="entreprise" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white]" id="first_name" type="text" placeholder="Nom de l&apos;entreprise" />
              </div>
            </div>
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
                <input {...register("password")} onChange={handleChange} required name="password" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="password" type={clickEye ? 'text' : 'password'} placeholder="Mot de passe" />
                <button type="button" className="absolute top-9 right-6" onClick={() => setClickEye(!clickEye)}>
                  {clickEye ? <EyeOff /> : <Eye />}
                </button>
                <p className="font-bold">Le mot de passe doit contenir au moins :</p>
                <ul className="text-sm">
                  {/*  on passe le password en cours (à chaque caractère ajouté à l'input) dans les variables de test */}
                  {/* si la variable est vérifiée la ligne de la liste devient verte */}
                  {isMinInPwd(inputs.password) ? <li className="text-secondary10">une lettre minuscule</li> : <li className="text-[grey]">une lettre minuscule</li>}
                  {isMajInPwd(inputs.password) ? <li className="text-secondary10">une lettre majuscule</li> : <li className="text-[grey]">une lettre majuscule</li>}
                  {isNumbInPwd(inputs.password) ? <li className="text-secondary10">un chiffre</li> : <li className="text-[grey]">un chiffre</li>}
                  {isSpeCaracInPwd(inputs.password) ? <li className="text-secondary10">un caractère spécial</li> : <li className="text-[grey]">un caractère spécial</li>}
                  {isLengthValid(inputs.password) ? <li className="text-secondary10">au moins 8 caractères</li> : <li className="text-[grey]">au moins 8 caractères</li>}
                </ul>
              </div>
            </div>
            {/* Confirmation password */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="passwordConfirm">
                  Confirmation password
                </label>
                <input {...register("passwordConfirm")} required name="passwordConfirm" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="password_confirmation" type={clickEyeVerif ? 'text' : 'password'} placeholder="Confirmation mot de passe" />
                <button type="button" className="absolute top-9 right-6" onClick={() => setClickEyeVerif(!clickEyeVerif)}>
                  {clickEyeVerif ? <EyeOff /> : <Eye />}
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
                  S&apos;inscrire
                </button>
              </div>
              <div className="md:w-2/3" />
            </div>
          </form>
        </div>
        <Footer />
        </div>
  );
}



export default Register;