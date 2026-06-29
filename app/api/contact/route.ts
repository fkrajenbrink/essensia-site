import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'f.krajenbrink@kpnplanet.nl'

export async function POST(request: Request) {
  try {
    const { naam, email, telefoon, bericht } = await request.json()

    if (!naam || !email || !bericht) {
      return Response.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Essensia Website <noreply@essensia.nl>',
      to: CONTACT_EMAIL,
      reply_to: email,
      subject: `Nieuw bericht van ${naam} via essensia.nl`,
      html: `
        <h2>Nieuw contactbericht</h2>
        <p><strong>Naam:</strong> ${naam}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        ${telefoon ? `<p><strong>Telefoon:</strong> ${telefoon}</p>` : ''}
        <p><strong>Bericht:</strong></p>
        <p style="white-space: pre-wrap;">${bericht}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return Response.json({ error: 'Er ging iets mis. Probeer het opnieuw.' }, { status: 500 })
  }
}
