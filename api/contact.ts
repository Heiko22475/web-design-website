import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, package: packageName, message } = (req.body ?? {}) as {
      name?: string;
      email?: string;
      package?: string;
      message?: string;
    };

    const safeName = (name ?? '').toString().trim();
    const safeEmail = (email ?? '').toString().trim();
    const safePackage = (packageName ?? '').toString().trim();
    const safeMessage = (message ?? '').toString().trim();

    if (!safeName || !safeEmail || !safePackage || !safeMessage) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    if (safeName.length > 120 || safeEmail.length > 254 || safePackage.length > 60 || safeMessage.length > 5000) {
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

    const subject = `Neue Anfrage (${safePackage}) – ${safeName}`;

    const text = [
      'Neue Kontaktanfrage über die Website',
      '',
      `Name: ${safeName}`,
      `E-Mail: ${safeEmail}`,
      `Paket: ${safePackage}`,
      '',
      'Nachricht:',
      safeMessage,
      '',
      '—',
      'Hinweis: Antworte direkt an die E-Mail-Adresse des Absenders.',
    ].join('\n');

    await resend.emails.send({
      from,
      to,
      subject,
      text,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Failed to send message' });
  }
}
