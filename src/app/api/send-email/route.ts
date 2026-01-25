import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Sanitize HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const safeName = escapeHtml(name)
    const safeCompany = escapeHtml(company || '')
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: 'Leader24 Contact <noreply@leader24.ai>',
      to: ['info@leader24.ai'],
      replyTo: email,
      subject: `Nuovo messaggio da ${safeName} - ${safeCompany || 'N/A'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3662E3;">Nuovo Messaggio dal Sito</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${safeName}</p>
            <p><strong>Azienda:</strong> ${safeCompany || 'Non specificata'}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
          </div>
          <div style="padding: 20px; background-color: #fff; border: 1px solid #e5e5e5; border-radius: 8px;">
            <h3 style="margin-top: 0;">Messaggio:</h3>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Questo messaggio è stato inviato dal form di contatto su leader24.ai
          </p>
        </div>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Send email error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
