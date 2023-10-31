"use client"
import Header from '../../components/header'
import Footer from '../../components/footer'
import Link  from 'next/link'
import { signOut } from 'next-auth/react'
import { getAuthSession } from '@/lib/nextauth'


export default async function Dashboard() {
const session = await getAuthSession();
console.log(session)
  return (
    <div>
    <Header />
    <div>Hello {session?.user?.name}</div>
    <button onClick={() => signOut()}>Sign out</button>
    <Link href='/dashboard/enjeux'>Voir les enjeux</Link>
    <Footer />
    </div>
  )
}