import Link from 'next/link';
import { getAuthSession } from '@/lib/nextauth'
import SignOutButton from '@/components/signOutButton'
import Image from 'next/image'
import Logo from '../../public/logo_rse.png'

export default async function header() {
    const session = await getAuthSession();
    return (
        <header className="flex justify-between p-4">
            <div><Link href="/"><Image
      src={Logo}
      width={70}
      height={70}
      alt="Logo Odurable"
    /></Link></div>
            <nav>
                <ul className="flex gap-4">
                    <li className='smky-btn3 text-sm relative hover:text-gray-700 py-2 px-6 after:absolute after:h-1 after:hover:h-[100%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-green-400 after:rounded-t-md after:w-full after:bottom-0 after:left-0 text-gray-600'><Link href="/">Accueil</Link></li>
                    <li className='smky-btn3 text-sm relative hover:text-gray-700 py-2 px-6 after:absolute after:h-1 after:hover:h-[100%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-green-400 after:rounded-t-md after:w-full after:bottom-0 after:left-0 text-gray-600'><Link href="/about">A propos</Link></li>
                    <li className='smky-btn3 text-sm relative hover:text-gray-700 py-2 px-6 after:absolute after:h-1 after:hover:h-[100%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-green-400 after:rounded-t-md after:w-full after:bottom-0 after:left-0 text-gray-600'><Link href="/howtostart">Débuter ma démarche</Link></li>
                    {!session?.user ? '' :
                    <li className='smky-btn3 text-sm relative hover:text-gray-700 py-2 px-6 after:absolute after:h-1 after:hover:h-[100%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-green-400 after:rounded-t-md after:w-full after:bottom-0 after:left-0 text-gray-600'><Link href="/dashboard">Tableau de bord</Link></li>
                    }
                    <li className='smky-btn3 text-sm relative hover:text-gray-700 py-2 px-6 after:absolute after:h-1 after:hover:h-[100%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-green-400 after:rounded-t-md after:w-full after:bottom-0 after:left-0 text-gray-600'><Link href="/contact">Contact</Link></li>
                    </ul>
            </nav>
            <div className="flex gap-2">
            {!session?.user ?

            <div className='flex gap-2'><Link href="/login"><button className="cursor-pointer h-10 text-xs transition-all 
                    bg-green-400 text-gray-800 px-6 py-2 rounded-lg
                    border-gray-700
                    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-gray-400 shadow-gray-400 active:shadow-none">Se connecter
                    </button></Link>
                <Link href="/register"><button className="cursor-pointer h-10 text-xs transition-all 
                    bg-gray-700 text-white px-6 py-2 rounded-lg
                    border-green-400
                    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none">S&apos;enregistrer
                </button></Link></div> 
                
                : 
                            
               <SignOutButton />}
            </div>
        </header>
    )
  }