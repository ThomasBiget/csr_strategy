import Header from '../components/header'
import Footer from '../components/footer'
import prisma from '../lib/client'

export default async function Home() {
  // const allUsers = []

  // try {
  //   const response = await fetch('/api/findUsers', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error('Une erreur s\'est produite lors de la création de l\'utilisateur');
  //   }

  //   const users = await response.json();
  //   allUsers.push(users)
  //   console.log('Utilisateurs récupérés avec succès:', users);
  //   return users;
  // } catch (error: any) {
  //   console.error(error.message);
  // }
  const users = await prisma.user.findMany();
  console.log(users);

  return (
    <div>
    <Header />
    <div>Hello world</div>
    <div>{users.map((user) => {
      return (
        <div key={user.id}>{user.email}</div>
      )
    } )}</div>
    <Footer />
    </div>
  )
}
