// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/client';
// import { getAuthSession } from '@/lib/nextauth'

// async function createEnjeu(req: NextApiRequest, res: NextApiResponse) {
//   const { label, pilier, esrs, business_impact, soc_en_impact } = req.body;
//   const session = await getAuthSession();
  
//   if (req.method === 'POST') {
//     try {
//       const newEnjeu = await prisma.enjeu.create({
//         data: {
//           label: label,
//           pilier: pilier,
//           esrs: esrs,
//           business_impact: business_impact,
//           soc_en_impact: soc_en_impact,
//           // author: session?.user?.name,
//           // authorId: session?.user?.id
//         },
//       });
//       res.status(200).json(newEnjeu);
//     } catch (error) {
//       res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur' });
//     }
//   } else {
//     res.status(405).end(); // Méthode non autorisée
//   }
// };

// export default createEnjeu;