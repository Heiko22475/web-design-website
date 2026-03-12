import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { name, email } = (req.body ?? {}) as {
      name?: string;
      email?: string;
    };

    const safeName = (name ?? '').toString().trim();
    const safeEmail = (email ?? '').toString().trim();

    if (!safeName || !safeEmail) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    if (safeName.length > 120 || safeEmail.length > 254) {
      return res.status(400).json({ ok: false, error: 'Invalid input length' });
    }

    if (!/^\S+@\S+\.\S+$/.test(safeEmail)) {
      return res.status(400).json({ ok: false, error: 'Invalid email address' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM;

    if (!apiKey || !to || !from) {
      return res.status(500).json({
        ok: false,
        error: 'Server email is not configured (missing RESEND_API_KEY / CONTACT_TO / CONTACT_FROM)',
      });
    }

    const resend = new Resend(apiKey);

    // 1. Notification email to the site owner
    const ownerSubject = `Neue Guide-Anforderung – ${safeName}`;
    const ownerText = [
      'Neue Guide-Anforderung über die Website',
      '',
      `Name: ${safeName}`,
      `E-Mail: ${safeEmail}`,
      '',
      '—',
      'Diese Person hat den kostenlosen Guide angefordert.',
    ].join('\n');

    await resend.emails.send({
      from,
      to,
      subject: ownerSubject,
      text: ownerText,
    });

    // 2. Confirmation email to the customer
    const customerSubject = 'Ihr kostenloser Guide – Mein Auftritt Online';
    const customerText = [
      `Sehr geehrte/r ${safeName},`,
      '',
      'vielen Dank für Ihr Interesse an unserem Guide!',
      '',
      'Wir freuen uns sehr, dass Sie sich die Zeit nehmen, unsere Ressourcen zu nutzen. ',
      'Der Guide wird Ihnen helfen, Ihre Online-Präsenz gezielt zu verbessern und mehr aus Ihrem Webauftritt herauszuholen.',
      '',
      'Hier können Sie den Guide direkt herunterladen:',
      'https://meinauftrittonline.de/Website-Blueprint.pdf',
      '',
      'Bei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung – antworten Sie einfach auf diese E-Mail oder kontaktieren Sie uns unter kontakt@meinauftrittonline.de.',
      '',
      'Mit freundlichen Grüßen,',
      'Ihr Team von Mein Auftritt Online',
    ].join('\n');

    await resend.emails.send({
      from,
      to: safeEmail,
      subject: customerSubject,
      text: customerText,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Failed to send message' });
  }
}
