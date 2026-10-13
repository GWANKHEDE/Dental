import { About } from './components/About'
import { Appointment } from './components/Appointment'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Reviews } from './components/Reviews'
import { Treatments } from './components/Treatments'
import { WhyChooseUs } from './components/WhyChooseUs'

export default function App() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-teal-600 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white focus:shadow-xl"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Treatments />
        <About />
        <WhyChooseUs />
        <Reviews />
        <Appointment />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
