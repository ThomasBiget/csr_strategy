import Header from '../../components/header'
import Footer from '../../components/footer'
import Link  from 'next/link'

export default function Dashboard() {
  return (
    <div>
    <Header />
    <div>Hello world</div>
    <Link href='/dashboard/enjeux'>Voir les enjeux</Link>
    <Footer />
    </div>
  )
}