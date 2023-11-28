import { Trash2, PenSquare, Plus } from 'lucide-react'
import Link from 'next/link'
import { getAuthSession } from '@/lib/nextauth'
import prisma from '../../../lib/client';
import RemoveEnjeuButton from '@/components/removeEnjeuButton';


interface UserProps {
    user?: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }

interface EnjeuProps {
    id: number;
    label: string;
    color: string;
    pilier: string;
    esrs: string;
    business_impact: number;
    soc_en_impact: number;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
}

export default async function Enjeux() {
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
  const userId = Number(session?.user?.id)

    const enjeux = await prisma.enjeu.findMany({
        where: {
            authorId: userId
        }
    });
    console.log(enjeux)
  return (
    <div>
    <div className='flex justify-end mr-6 mb-4'>
        <Link href={'/dashboard/enjeux/add_enjeu'}><button className='bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold py-2 px-4 inline-flex items-center rounded-full gap-1'><Plus size={16} /><span>Ajouter un enjeu</span></button></Link>
    </div>
    <div className='divide-y divide-solid'></div>
    <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Enjeux
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Pilier
                    </th>
                    <th scope="col" className="px-6 py-3">
                        ESRS
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Note Business impact
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Note Environnement & Social impact
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Modifier / Supprimer
                    </th>
                </tr>
            </thead>
            <tbody>
                { enjeux.map((enjeu: EnjeuProps) => (

                <tr key={enjeu.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {enjeu.label}
                    </th>
                    <td className="px-6 py-4">
                        {enjeu.pilier}
                    </td>
                    <td className="px-6 py-4">
                        {enjeu.esrs}
                    </td>
                    <td className="px-6 py-4">
                        {enjeu.business_impact}
                    </td>
                    <td className="px-6 py-4">
                        {enjeu.soc_en_impact}
                    </td>
                    <td scope="col" className="px-6 py-3 flex gap-2">
                    <PenSquare /><RemoveEnjeuButton id={enjeu.id}/>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
  )
}
}