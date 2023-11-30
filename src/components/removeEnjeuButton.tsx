"use client"
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';



interface RemoveEnjeuButtonProps {
    id: number;
  }


export default function RemoveEnjeuButton({ id }: RemoveEnjeuButtonProps) {
    const router = useRouter()
    const handleClick = async () => {
        console.log(id)
    try {
        const response = await fetch('/api/enjeu/deleteEnjeu', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(id),
        });
  
        if (!response.ok) {
          throw new Error('Problème lors de la suppression de l\'enjeu');
        }
        router.refresh();
        // Gérer la réponse (par exemple, rafraîchir les données affichées ou notifier l'utilisateur)
      } catch (error) {
        console.error(error);
        // Gérer l'erreur (par exemple, afficher un message d'erreur)
      }
    }   
    return (
<button onClick={handleClick} ><Trash2 color="#ff0000" /></button>
                 
)
}