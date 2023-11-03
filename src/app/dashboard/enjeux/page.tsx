import { Trash2, PenSquare, Plus } from 'lucide-react'
import Link from 'next/link'


export default function Enjeux() {
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
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Modifier / Supprimer
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Contrôler sa consommation d&apos;électricité
                    </th>
                    <td className="px-6 py-4">
                        Environnement
                    </td>
                    <td className="px-6 py-4">
                        Liste des actions mises en place pour contrôler sa consommation d&apos;électricité
                    </td>
                    <td scope="col" className="px-6 py-3 flex gap-2">
                    <PenSquare /><Trash2 color="#ff0000" />
                    </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Parité homme / femme
                    </th>
                    <td className="px-6 py-4">
                        Social
                    </td>
                    <td className="px-6 py-4">
                        Liste des actions mises en place pour atteindre la parité homme / femme
                    </td>
                    <td scope="col" className="px-6 py-3 flex gap-2">
                    <PenSquare /><Trash2 color="#ff0000" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
  )
}