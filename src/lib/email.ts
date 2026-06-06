import nodemailer from "nodemailer";

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const FROM = `"Projekt-Stal" <${process.env.SMTP_USER ?? "noreply@projekt-stal.pl"}>`;
const ADMIN = process.env.ADMIN_EMAIL ?? "projekt.stalbialystok@gmail.com";

function isConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendContactNotification(data: {
  name: string; email: string; phone?: string | null; subject: string; message: string;
}) {
  if (!isConfigured()) return;
  const transport = createTransport();

  await transport.sendMail({
    from: FROM,
    to: ADMIN,
    replyTo: data.email,
    subject: `[Kontakt] ${data.subject} — ${data.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#18181b;color:#e4e4e7;border-radius:12px;overflow:hidden">
        <div style="background:#f59e0b;padding:24px 32px">
          <h1 style="margin:0;color:#09090b;font-size:20px;font-weight:900">Nowa wiadomość z formularza kontaktowego</h1>
        </div>
        <div style="padding:32px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#a1a1aa;width:140px">Imię i nazwisko</td><td style="padding:8px 0;color:#fff;font-weight:600">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#a1a1aa">E-mail</td><td style="padding:8px 0"><a href="mailto:${data.email}" style="color:#f59e0b">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding:8px 0;color:#a1a1aa">Telefon</td><td style="padding:8px 0"><a href="tel:${data.phone}" style="color:#f59e0b">${data.phone}</a></td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#a1a1aa">Temat</td><td style="padding:8px 0;color:#fff">${data.subject}</td></tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:#27272a;border-radius:8px;border-left:4px solid #f59e0b">
            <p style="margin:0;color:#e4e4e7;line-height:1.6">${data.message.replace(/\n/g, "<br>")}</p>
          </div>
          <div style="margin-top:24px">
            <a href="http://localhost:3000/admin/wiadomosci" style="display:inline-block;background:#f59e0b;color:#09090b;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none">Otwórz w panelu admina →</a>
          </div>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #3f3f46;color:#71717a;font-size:12px">Projekt-Stal Mateusz Partyka · Białystok · 664 757 520</div>
      </div>
    `,
  });

  await transport.sendMail({
    from: FROM,
    to: data.email,
    subject: "Potwierdzenie wiadomości — Projekt-Stal",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#18181b;color:#e4e4e7;border-radius:12px;overflow:hidden">
        <div style="background:#f59e0b;padding:24px 32px">
          <h1 style="margin:0;color:#09090b;font-size:20px;font-weight:900">Dziękujemy za wiadomość!</h1>
        </div>
        <div style="padding:32px">
          <p style="color:#e4e4e7;line-height:1.6">Cześć <strong>${data.name}</strong>,</p>
          <p style="color:#e4e4e7;line-height:1.6">Twoja wiadomość dotycząca <strong>"${data.subject}"</strong> została przez nas odebrana. Odpowiemy w ciągu 24 godzin roboczych.</p>
          <div style="margin:24px 0;padding:20px;background:#27272a;border-radius:8px;border-left:4px solid #f59e0b">
            <p style="margin:0;color:#a1a1aa;font-size:13px">${data.message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="color:#a1a1aa;font-size:14px">W pilnych sprawach zadzwoń: <a href="tel:664757520" style="color:#f59e0b">664 757 520</a></p>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #3f3f46;color:#71717a;font-size:12px">Projekt-Stal Mateusz Partyka · projekt.stalbialystok@gmail.com</div>
      </div>
    `,
  });
}

export async function sendQuoteNotification(data: {
  name: string; email: string; phone: string;
  type: string; width: string; height: string; length?: string | null;
  location: string; description?: string | null;
}) {
  if (!isConfigured()) return;
  const transport = createTransport();

  const typeLabels: Record<string, string> = {
    schody: "Schody stalowe / loftowe", balustrady: "Balustrady",
    ogrodzenie: "Ogrodzenie", brama: "Brama garażowa / wjazdowa",
    taras: "Taras stalowy", zadaszenie: "Zadaszenie",
    garaz: "Garaż stalowy", inne: "Inne / Konstrukcja na wymiar",
  };

  const typeLabel = typeLabels[data.type] ?? data.type;

  await transport.sendMail({
    from: FROM,
    to: ADMIN,
    replyTo: data.email,
    subject: `[Wycena] ${typeLabel} — ${data.name} (${data.location})`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#18181b;color:#e4e4e7;border-radius:12px;overflow:hidden">
        <div style="background:#f59e0b;padding:24px 32px">
          <h1 style="margin:0;color:#09090b;font-size:20px;font-weight:900">Nowe zapytanie o wycenę</h1>
        </div>
        <div style="padding:32px">
          <h2 style="color:#f59e0b;font-size:16px;margin:0 0 16px">${typeLabel}</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#a1a1aa;width:140px">Klient</td><td style="padding:8px 0;color:#fff;font-weight:600">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#a1a1aa">Telefon</td><td style="padding:8px 0"><a href="tel:${data.phone}" style="color:#f59e0b">${data.phone}</a></td></tr>
            <tr><td style="padding:8px 0;color:#a1a1aa">E-mail</td><td style="padding:8px 0"><a href="mailto:${data.email}" style="color:#f59e0b">${data.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#a1a1aa">Lokalizacja</td><td style="padding:8px 0;color:#fff">${data.location}</td></tr>
            <tr><td style="padding:8px 0;color:#a1a1aa">Wymiary</td><td style="padding:8px 0;color:#fff">szer. ${data.width} × wys. ${data.height}${data.length ? ` × dł. ${data.length}` : ""} cm</td></tr>
          </table>
          ${data.description ? `
          <div style="margin-top:24px;padding:20px;background:#27272a;border-radius:8px;border-left:4px solid #f59e0b">
            <p style="margin:0 0 8px;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:.05em">Opis</p>
            <p style="margin:0;color:#e4e4e7;line-height:1.6">${data.description.replace(/\n/g, "<br>")}</p>
          </div>` : ""}
          <div style="margin-top:24px">
            <a href="http://localhost:3000/admin/wyceny" style="display:inline-block;background:#f59e0b;color:#09090b;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none">Otwórz w panelu admina →</a>
          </div>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #3f3f46;color:#71717a;font-size:12px">Projekt-Stal Mateusz Partyka · Białystok · 664 757 520</div>
      </div>
    `,
  });

  await transport.sendMail({
    from: FROM,
    to: data.email,
    subject: "Potwierdzenie zapytania o wycenę — Projekt-Stal",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#18181b;color:#e4e4e7;border-radius:12px;overflow:hidden">
        <div style="background:#f59e0b;padding:24px 32px">
          <h1 style="margin:0;color:#09090b;font-size:20px;font-weight:900">Zapytanie o wycenę przyjęte!</h1>
        </div>
        <div style="padding:32px">
          <p style="color:#e4e4e7;line-height:1.6">Cześć <strong>${data.name}</strong>,</p>
          <p style="color:#e4e4e7;line-height:1.6">Twoje zapytanie o wycenę na <strong>${typeLabel}</strong> w lokalizacji <strong>${data.location}</strong> zostało przez nas odebrane.</p>
          <p style="color:#e4e4e7;line-height:1.6">Przygotujemy wycenę i skontaktujemy się z Tobą w ciągu <strong style="color:#f59e0b">24 godzin roboczych</strong>.</p>
          <div style="margin:24px 0;padding:20px;background:#27272a;border-radius:8px">
            <p style="margin:0 0 12px;color:#f59e0b;font-weight:700;font-size:14px">Szczegóły zapytania</p>
            <p style="margin:4px 0;color:#a1a1aa;font-size:13px">Rodzaj: ${typeLabel}</p>
            <p style="margin:4px 0;color:#a1a1aa;font-size:13px">Wymiary: ${data.width} × ${data.height}${data.length ? ` × ${data.length}` : ""} cm</p>
            <p style="margin:4px 0;color:#a1a1aa;font-size:13px">Lokalizacja: ${data.location}</p>
          </div>
          <p style="color:#a1a1aa;font-size:14px">W pilnych sprawach zadzwoń: <a href="tel:664757520" style="color:#f59e0b">664 757 520</a></p>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #3f3f46;color:#71717a;font-size:12px">Projekt-Stal Mateusz Partyka · projekt.stalbialystok@gmail.com</div>
      </div>
    `,
  });
}
