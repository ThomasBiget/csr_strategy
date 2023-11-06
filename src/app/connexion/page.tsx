"use client"
import { useRouter } from 'next/navigation';

export default function Connexion() {


    const router = useRouter()
    setTimeout(() => {
        router.push('/dashboard');
    }, 2000) 
  return (
    <div>
    <p>Connexion réussie</p>
    </div>
  )
}