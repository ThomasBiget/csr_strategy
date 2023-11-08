import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/client';


async function createEnjeu(req: NextApiRequest, res: NextApiResponse) {

    const { pilier, esrs, label, business_impact, soc_en_impact, color, authorId } = req.body;

    const userId = Number(authorId);
    const businessNote = Number(business_impact)
    const socEnNote = Number(soc_en_impact)
    console.log(userId);
  if (req.method === 'POST') {
    try {
        const newEnjeu = await prisma.enjeu.create({
            data: {
              label,
              color,
              pilier,
              esrs,
              business_impact: businessNote,
              soc_en_impact: socEnNote,
              authorId: userId,

        },
      });
      res.status(200).json(newEnjeu);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur' });
    }
  } else {
    res.status(405).end(); // Méthode non autorisée
  }
};

export default createEnjeu;