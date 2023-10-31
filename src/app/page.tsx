import Header from '../components/header'
import Footer from '../components/footer'
import prisma from '../lib/client'

export default async function Home() {
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
