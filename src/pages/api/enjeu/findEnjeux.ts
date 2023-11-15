import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/client';

export default async function findEnjeux(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const enjeux = await prisma.enjeu.findMany();
      res.status(200).json(enjeux);
      console.log(enjeux);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur s\'est produite lors du chargement des utilisateurs' });
    }
  } else {
    res.status(405).end(); // Méthode non autorisée
  }
};