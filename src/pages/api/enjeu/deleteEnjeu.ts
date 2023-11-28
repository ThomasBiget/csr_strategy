import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/client';

export default async function deleteEnjeu(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
      console.log(req.body)  
      const id = req.body;
      const enjeuId = Number(id)
      console.log(id)
      console.log(enjeuId)
      try {
        const deletedEnjeu = await prisma.enjeu.delete({
          where: { 
            id: enjeuId
         },
        });
        res.status(200).json(deletedEnjeu);
      } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de l'enjeu" });
      }
    } else {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }