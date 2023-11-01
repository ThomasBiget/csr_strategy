import prisma from '../lib/client'

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div>
    <div>Hello world</div>
    <div>{users.map((user) => {
      return (
        <div key={user.id}>{user.email}</div>
      )
    } )}</div>
    </div>
  )
}
