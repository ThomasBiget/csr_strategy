import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import prisma from '../../../lib/client';

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password, entreprise } = req.body;

  const hashedPassword = await hash(password, 10);
  
  if (req.method === 'POST') {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
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

export default createUser;