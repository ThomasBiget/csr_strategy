
import Link from 'next/link'
import { getAuthSession } from '@/lib/nextauth'
import prisma from '../../../lib/client';
import MatriceConfiguration from '@/components/matrice';
import { GraphAction } from '../../../../src/@types/actions'


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

export default async function Matrice() {
  
    const sessionResult = await getAuthSession();


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
  const userName = session.user?.name


  
    const enjeux = await prisma.enjeu.findMany({
        where: {
            authorId: userId
        }
    });
  
  let dataEnjeux:GraphAction[] = []

  enjeux.map((enjeu) => {
    const dataEnjeu = {
      x: Number(enjeu.business_impact),
      y: Number(enjeu.soc_en_impact),
      color: enjeu.color,
      label: enjeu.label
    }
    dataEnjeux.push(dataEnjeu)
  })

  return (
    <div>
    <h2>Matrice de double matérialité de {userName}</h2>
    <MatriceConfiguration dataEnjeux={dataEnjeux} />
    </div>
  )
}
}