import Image from 'next/image'
import ChatWidget from '@/components/ChatWidget'
import ContactForm from '@/components/ContactForm'

const begeleidingsvormen = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    titel: 'Loopbaancoaching & Outplacement',
    beschrijving:
      'Begeleiding van medewerkers en managers bij loopbaantransities — van oriëntatie tot concrete volgende stap. Resultaatgericht en zonder omhaal.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    titel: 'Assessments',
    beschrijving:
      'Selectie- en doorstroomtrajecten voor organisaties met 300+ medewerkers. Valide inzichten die HR-beslissingen onderbouwen.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    titel: 'Reïntegratie',
    beschrijving:
      '1e en 2e spoor trajecten voor zorginstellingen en overheidsinstellingen. Gericht op duurzame werkhervatting — voor medewerker én werkgever.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2" />
      </svg>
    ),
    titel: 'Netwerk van coaches',
    beschrijving:
      'Aansturen en ontwikkelen van een netwerk van 30 coaches en psychologen. Schaalbare begeleiding die past bij de omvang van uw organisatie.',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-body font-sans">

      {/* HERO */}
      <section
        className="relative text-white py-20 px-6"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(76,89,164,0.88) 0%, rgba(46,163,242,0.75) 100%), url("/header.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Tekst */}
            <div className="flex-1">
              <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">
                Essensia Carrière Coaching
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">Frank Krajenbrink</h1>
              <p className="text-white/80 text-lg mb-10">
                A&O Psycholoog NIP | Eigenaar Essensia Carrière Coaching
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <p className="text-secondary font-semibold text-xs uppercase tracking-wider mb-2">
                    Voor HR &amp; organisaties
                  </p>
                  <p className="text-white leading-relaxed">
                    Na een traject met Frank weet u precies hoe u uw mensen ontwikkelt in lijn met uw
                    organisatiedoelstellingen.
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <p className="text-secondary font-semibold text-xs uppercase tracking-wider mb-2">
                    Voor medewerkers &amp; managers
                  </p>
                  <p className="text-white leading-relaxed">
                    Na een traject met Frank weet u wat u te bieden heeft, welke richting bij u past —
                    en wat u tegenhoudt.
                  </p>
                </div>
              </div>

              <a
                href="#chat"
                className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
              >
                Stel een vraag aan Frank
              </a>
            </div>

            {/* Foto */}
            <div className="shrink-0 w-64 md:w-72">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20">
                <Image
                  src="/frank.jpg"
                  alt="Frank Krajenbrink — Essensia Carrière Coaching"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 256px, 288px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEGELEIDINGSVORMEN */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-dark mb-3">Begeleidingsvormen</h2>
          <p className="text-body/70 mb-10 max-w-2xl">
            Essensia werkt voor organisaties en individuen — altijd maatwerk, altijd resultaatgericht.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {begeleidingsvormen.map((vorm) => (
              <div
                key={vorm.titel}
                className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-primary mb-4">{vorm.icon}</div>
                <h3 className="font-bold text-dark text-lg mb-2">{vorm.titel}</h3>
                <p className="text-body/80 text-sm leading-relaxed">{vorm.beschrijving}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CHAT */}
      <section id="chat" className="bg-[#F3F3F3] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-dark mb-3">Stel een vraag aan Frank</h2>
            <p className="text-body/70 max-w-xl mx-auto">
              Ik beantwoord uw vragen over loopbaancoaching, assessment en reïntegratie.
            </p>
          </div>
          <ChatWidget />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-3">Contact</h2>
              <p className="text-body/70 mb-6 leading-relaxed">
                Wilt u meer weten over wat Essensia voor uw organisatie of voor u persoonlijk kan
                betekenen? Neem direct contact op.
              </p>
              <div className="space-y-3 text-sm">
                <p className="font-semibold text-dark">Essensia Carrière Coaching</p>
                <p className="text-body/80">Amsterdam</p>
                <a
                  href="tel:0203379430"
                  className="block text-primary font-medium hover:underline"
                >
                  020 33 79 430
                </a>
                <a
                  href="mailto:info@essensia.nl"
                  className="block text-primary font-medium hover:underline"
                >
                  info@essensia.nl
                </a>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
            <div>
              <p className="font-bold text-lg mb-1">Frank Krajenbrink</p>
              <p className="text-white/70 text-sm">Essensia Carrière Coaching</p>
              <a href="tel:0203379430" className="text-white/70 text-sm hover:text-white block mt-2">
                020 33 79 430
              </a>
              <a href="mailto:info@essensia.nl" className="text-white/70 text-sm hover:text-white block">
                info@essensia.nl
              </a>
            </div>
            <div className="flex flex-col gap-2 text-sm text-white/60 md:text-right">
              <a
                href="https://www.essensia.nl/algemene-voorwaarden"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Algemene voorwaarden
              </a>
              <a
                href="https://www.essensia.nl/privacyverklaring"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Privacyverklaring
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-white/40 text-xs">
            © {new Date().getFullYear()} Essensia Carrière Coaching
          </div>
        </div>
      </footer>

    </main>
  )
}
