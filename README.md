# Essensia Carrière Coaching — Personal Brand Site

Personal brand site voor Frank Krajenbrink, A&O Psycholoog NIP en eigenaar van Essensia Carrière Coaching.

**Stack:** Next.js 14 (App Router) · Tailwind CSS · Anthropic Claude API · Resend

---

## Lokaal opstarten

```bash
npm install
cp .env.example .env.local
# Vul ANTHROPIC_API_KEY en RESEND_API_KEY in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Benodigde accounts

| Service | Waarvoor | Gratis tier |
|---------|----------|-------------|
| [Anthropic](https://console.anthropic.com) | Claude API key voor de AI-chat | Ja (pay-per-use) |
| [Resend](https://resend.com) | Versturen contactformulier e-mails | Ja, tot 100 mails/dag |

---

## Deploy naar Vercel

1. Push deze map naar een GitHub-repository
2. Ga naar [vercel.com](https://vercel.com) → **Add New Project** → importeer de repo
3. Voeg environment variables toe in het Vercel dashboard:
   - `ANTHROPIC_API_KEY`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL` (standaard: f.krajenbrink@kpnplanet.nl)
4. Klik **Deploy** — klaar

---

## Structuur

```
app/
  layout.tsx          # Montserrat font, metadata
  page.tsx            # Volledige landingspagina
  globals.css
  api/
    chat/route.ts     # Streaming Claude API
    contact/route.ts  # Resend e-mail
components/
  ChatWidget.tsx      # AI-chat UI
  ContactForm.tsx     # Contactformulier
```

---

## Resend instellen

Bij Resend moet het `from`-adres (`noreply@essensia.nl`) komen van een geverifieerd domein. Verifieer `essensia.nl` in het Resend dashboard onder **Domains**, of gebruik tijdelijk `onboarding@resend.dev` als afzender (werkt alleen naar uw eigen e-mailadres bij de gratis tier).
