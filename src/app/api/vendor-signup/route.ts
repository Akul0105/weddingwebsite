import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { ok: false, error: 'Email service is not configured.' },
      { status: 500 }
    );
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  const to = (process.env.TO_EMAIL || '').split(',').map((email) => email.trim()).filter(Boolean);
  const from = process.env.FROM_EMAIL;

  if (!to.length || !from) {
    return NextResponse.json(
      { ok: false, error: 'Destination or sender email not configured.' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const {
      firstName = '',
      lastName = '',
      businessName = '',
      email = '',
      phone = '',
      category = '',
      location = '',
      experience = '',
      about = '',
      website = '',
    } = body || {};

    const requiredFields = [firstName, lastName, businessName, email, phone, category, location, about];
    if (requiredFields.some((f) => !f)) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from,
      to,
      subject: 'New Vendor Application',
      replyTo: email,
      text: `
New vendor application:

Name: ${firstName} ${lastName}
Business: ${businessName}
Email: ${email}
Phone: ${phone}
Category: ${category}
Location: ${location}
Experience: ${experience || 'Not provided'}
Website: ${website || 'Not provided'}

About:
${about}
      `.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Vendor signup email error:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to send email.' },
      { status: 500 }
    );
  }
}

