import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Je bent de AI-assistent van Frank Krajenbrink, A&O Psycholoog NIP en eigenaar van Essensia Carrière Coaching in Amsterdam.

Je beantwoordt vragen van twee doelgroepen:
1. HR-directeuren en organisaties die medewerkers willen begeleiden bij loopbaantransities, selectie of reïntegratie.
2. Individuele medewerkers of managers die bezig zijn met hun eigen loopbaan.

Je helpt met vragen over:
- Outplacement en loopbaancoaching (voor medewerkers en managers in transitie)
- Assessments voor selectie en doorstroom bij organisaties
- Reïntegratie trajecten (1e en 2e spoor) voor zorginstellingen en overheidsinstellingen
- Wat de samenwerking met Essensia inhoudt en oplevert

Grenzen:
- Noem NOOIT prijzen of tarieven
- Verwijs NOOIT naar concurrenten of andere aanbieders
- Particuliere begeleiding (betaald door het individu zelf, niet door werkgever of UWV) biedt Essensia NIET aan — zeg dit duidelijk als ernaar gevraagd wordt
- Bij vragen buiten dit domein: verwijs vriendelijk terug naar wat je wel kunt helpen

Sluit elk antwoord af met een uitnodiging om contact op te nemen via het contactformulier op de pagina.

Schrijf in het Nederlands. Direct, helder, zonder jargon.`

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid request', { status: 400 })
    }

    const stream = await client.messages.stream({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text))
          }
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
