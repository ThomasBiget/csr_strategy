import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/client';

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password, entreprise } = req.body;
  
  if (req.method === 'POST') {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password,
          entreprise: entreprise,
        },
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur' });
    }
  } else {
    res.status(405).end(); // Méthode non autorisée
  }
};
