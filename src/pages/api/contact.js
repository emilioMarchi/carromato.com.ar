import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { name, email, message } = req.body;

  try {
    // 📩 Mail para vos (receptor)
    const adminMail = await resend.emails.send({
      from: 'Carromato Web <onboarding@resend.dev>',
      to: 'emiliomarchi.dev@gmail.com',
      subject: '📥 Nueva consulta desde la web',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#111;color:#fff;border-radius:10px">
          <h2 style="color:#facc15">📩 Nueva consulta desde carromato.com.ar</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background:#222;padding:10px;border-radius:5px">${message}</p>
          <hr style="margin:20px 0;border:none;border-top:1px solid #333">
          <p style="font-size:12px;color:#777">Este mensaje se generó automáticamente desde tu web.</p>
        </div>
      `,
    });

    // 📬 Mail para el emisor (cliente)
    const userMail = await resend.emails.send({
      from: 'Carromato Web <onboarding@resend.dev>',
      to: email,
      subject: '✅ Recibimos tu consulta',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#111;color:#fff;border-radius:10px">
          <h2 style="color:#facc15">¡Gracias por tu consulta, ${name}!</h2>
          <p>Recibimos tu mensaje y te vamos a responder muy pronto.</p>
          <p><strong>Esto es lo que nos enviaste:</strong></p>
          <p style="background:#222;padding:10px;border-radius:5px">${message}</p>
          <hr style="margin:20px 0;border:none;border-top:1px solid #333">
          <p style="font-size:13px;color:#999">Si no realizaste esta consulta, podés ignorar este mensaje.</p>
          <p style="font-size:13px;color:#666">Carromato Producciones</p>
        </div>
      `,
    });

    res.status(200).json({ success: true, data: { adminMail, userMail } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
}
