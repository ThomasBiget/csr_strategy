import Link  from 'next/link'
import { getAuthSession } from '@/lib/nextauth'


export default async function Dashboard() {
const session = await getAuthSession();

if (!session?.user) {
  return (
    <div>
    <div>Vous n&apos;êtes pas connecté</div>
    <Link href='/login'>Se connecter</Link>
    </div>
  )
}
else {
  return (    
    <div><div>Hello {session?.user?.name}</div>
    <Link href='/dashboard/enjeux'>Voir les enjeux</Link>
    </div>
   )
}
}