import Link  from 'next/link'
import { getAuthSession } from '@/lib/nextauth'

interface UserProps {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
  };
}
export default async function Dashboard() {
  
const sessionResult = await getAuthSession();

console.log(sessionResult);

if (!sessionResult?.user) {
  return (
    <div>
    <div>Vous n&apos;êtes pas connecté</div>
    <Link href='/login'>Se connecter</Link>
    </div>
  )
}
else {
  const session: UserProps = sessionResult as UserProps;
  return (    
    <div>
      <div>Hello {session?.user?.name}</div>
      <div>Vous êtes connecté avec id : {session?.user?.id}</div>
      <div>
      <header>
        <nav>
          <ul className='flex gap-3'>
            <li>Overview</li>
            <li>Enjeux</li>
            <li>Projets</li>
            <li>Matrice</li>
          </ul>
        </nav>
      </header>
      </div>
      <div>
        <div className='flex gap-1 my-4 mx-1'>
          <Link href="/dashboard/enjeux" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Enjeux</h2>
              <p className="font-normal text-gray-700 dark:text-gray-400">Retrouvez la listes de vos enjeux</p>
          </Link>
          <Link href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Projets</h2>
              <p className="font-normal text-gray-700 dark:text-gray-400">Retrouvez la listes et l&apos;avancement de vos projets</p>
          </Link>
          <Link href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Matrice</h2>
              <p className="font-normal text-gray-700 dark:text-gray-400">Retrouvez la matrice de double matérialité éditée en fonction des enjeux sélectionnés et leurs notes attribuées</p>
          </Link>
        </div>
      </div>
    </div>
   )
}
}