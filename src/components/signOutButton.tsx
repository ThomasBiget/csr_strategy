"use client"
import { signOut } from 'next-auth/react'


export default function signOutButton() {
    
 const handleClick = async () => {
    await signOut();
    }   
    return (
<button onClick={handleClick} className="cursor-pointer h-10 text-xs transition-all 
                 bg-green-400 text-gray-800 px-6 py-2 rounded-lg
                 border-gray-700
                 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-gray-400 shadow-gray-400 active:shadow-none">Se déconnecter
                 </button>
                 
)
}