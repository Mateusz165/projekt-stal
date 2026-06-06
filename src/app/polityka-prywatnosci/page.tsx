import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Polityka prywatności | Projekt-Stal",
  description: "Polityka prywatności i informacje o plikach cookies serwisu Projekt-Stal Mateusz Partyka.",
  robots: { index: false },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-zinc-800">{title}</h2>
    <div className="space-y-3 text-zinc-300 text-sm leading-relaxed">{children}</div>
  </section>
);

export default function PolitykaPrywatnosciPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <Link href="/" className="text-amber-400 hover:text-amber-300 text-sm transition-colors">
            ← Strona główna
          </Link>
          <h1
            className="text-4xl font-black text-white mt-4 mb-2"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Polityka prywatności
          </h1>
          <p className="text-zinc-500 text-sm">Ostatnia aktualizacja: czerwiec 2025</p>
        </div>

        <Section title="1. Administrator danych">
          <p>
            Administratorem danych osobowych jest <strong className="text-white">Projekt-Stal Mateusz Partyka</strong>,
            z siedzibą w Białymstoku. Kontakt: <a href="mailto:projekt.stalbialystok@gmail.com" className="text-amber-400 hover:underline">projekt.stalbialystok@gmail.com</a>,
            tel. <a href="tel:+48664757520" className="text-amber-400 hover:underline">664 757 520</a>.
          </p>
        </Section>

        <Section title="2. Jakie dane zbieramy i w jakim celu">
          <p><strong className="text-white">Formularz kontaktowy:</strong> imię i nazwisko, adres e-mail, numer telefonu, treść wiadomości. Cel: odpowiedź na zapytanie (art. 6 ust. 1 lit. b RODO — niezbędność do zawarcia umowy lub działań przedumownych).</p>
          <p><strong className="text-white">Kalkulator wyceny:</strong> dane kontaktowe i specyfikacja zamówienia. Cel: przygotowanie wyceny (art. 6 ust. 1 lit. b RODO).</p>
          <p><strong className="text-white">Sklep internetowy:</strong> dane do realizacji zamówienia (imię, adres, e-mail, telefon). Cel: realizacja umowy sprzedaży (art. 6 ust. 1 lit. b RODO). Płatności obsługuje Stripe, Inc. — zapoznaj się z ich polityką prywatności.</p>
          <p><strong className="text-white">Analityka:</strong> po wyrażeniu zgody — dane o ruchu na stronie za pomocą Google Analytics (anonimizowany adres IP). Cel: poprawa jakości serwisu (art. 6 ust. 1 lit. a RODO — zgoda).</p>
        </Section>

        <Section title="3. Pliki cookies">
          <p>Strona używa plików cookies (ciasteczek) — małych plików tekstowych zapisywanych na urządzeniu użytkownika.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-zinc-800 rounded-xl overflow-hidden mt-2">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="text-left text-zinc-300 font-semibold px-4 py-2.5">Kategoria</th>
                  <th className="text-left text-zinc-300 font-semibold px-4 py-2.5">Przykłady</th>
                  <th className="text-left text-zinc-300 font-semibold px-4 py-2.5">Podstawa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-4 py-3 text-white font-medium">Niezbędne</td>
                  <td className="px-4 py-3 text-zinc-400">Sesja admina, koszyk zakupowy</td>
                  <td className="px-4 py-3 text-zinc-400">Prawnie uzasadniony interes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-medium">Analityczne</td>
                  <td className="px-4 py-3 text-zinc-400">Google Analytics (_ga, _gid)</td>
                  <td className="px-4 py-3 text-zinc-400">Zgoda użytkownika</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">Możesz wycofać zgodę na cookies analityczne w dowolnym momencie, czyszcząc dane przeglądarki lub klikając „Tylko niezbędne" w bannerze cookies (pojawi się po usunięciu ciasteczek).</p>
        </Section>

        <Section title="4. Udostępnianie danych">
          <p>Dane są udostępniane wyłącznie podmiotom przetwarzającym dane na nasze zlecenie:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-400">
            <li>Vercel, Inc. — hosting strony (USA, standardowe klauzule umowne)</li>
            <li>Neon, Inc. — baza danych (USA, standardowe klauzule umowne)</li>
            <li>Stripe, Inc. — obsługa płatności (USA, Privacy Shield)</li>
            <li>Google LLC — Analytics (USA, standardowe klauzule umowne)</li>
          </ul>
          <p>Dane nie są sprzedawane ani udostępniane stronom trzecim w celach marketingowych.</p>
        </Section>

        <Section title="5. Okres przechowywania danych">
          <p>Dane z formularzy kontaktowych i wycen przechowujemy przez 3 lata od ostatniego kontaktu, chyba że przepisy wymagają dłuższego okresu. Dane zamówień — przez 5 lat (obowiązki podatkowe). Dane analityczne — zgodnie z ustawieniami Google Analytics (domyślnie 26 miesięcy).</p>
        </Section>

        <Section title="6. Twoje prawa (RODO)">
          <p>Przysługują Ci prawa do: dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, sprzeciwu wobec przetwarzania, cofnięcia zgody (bez wpływu na przetwarzanie przed cofnięciem), skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO, ul. Stawki 2, 00-193 Warszawa).</p>
          <p>Aby skorzystać z praw, skontaktuj się pod adresem <a href="mailto:projekt.stalbialystok@gmail.com" className="text-amber-400 hover:underline">projekt.stalbialystok@gmail.com</a>. Odpowiemy w ciągu 30 dni.</p>
        </Section>

        <Section title="7. Bezpieczeństwo">
          <p>Stosujemy środki techniczne i organizacyjne adekwatne do ryzyka: szyfrowanie HTTPS, kontrolę dostępu, regularne aktualizacje oprogramowania. Hasła przechowywane są w postaci zahashowanej (bcrypt).</p>
        </Section>

        <Section title="8. Zmiany polityki">
          <p>Możemy aktualizować niniejszą politykę. O istotnych zmianach poinformujemy przez banner na stronie lub e-mailem (jeśli posiadamy adres). Datę ostatniej aktualizacji znajdziesz na górze strony.</p>
        </Section>
      </div>
    </main>
  );
}
