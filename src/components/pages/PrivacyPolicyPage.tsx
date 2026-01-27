'use client'

import { useLocale } from 'next-intl'

const PrivacyPolicyPage = () => {
  const locale = useLocale()
  const isItalian = locale === 'it'

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        {/* Section 1 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '1. Titolare del Trattamento' : '1. Data Controller'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Il Titolare del trattamento dei dati personali è:'
              : 'The Data Controller for your personal data is:'}
          </p>
          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-900 dark:text-white">Sevedo Co. Ltd.</p>
            <p>9/291 Vichitsongkram Road, Kathu, Phuket, Thailand</p>
            <p>Email: info@leader24.ai</p>
          </div>
          <p>
            <strong>{isItalian ? 'Responsabile della Protezione dei Dati (DPO):' : 'Data Protection Officer (DPO):'}</strong> Marco Perdonò
          </p>
          <p>
            {isItalian ? 'Contatto:' : 'Contact:'} info@leader24.ai
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '2. Dati Personali Raccolti' : '2. Personal Data Collected'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Raccogliamo le seguenti categorie di dati personali:'
              : 'We collect the following categories of personal data:'}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Dati forniti direttamente dall\'utente:' : 'Data provided directly by the user:'}
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>{isItalian ? 'Nome e cognome' : 'Full name'}</li>
            <li>{isItalian ? 'Indirizzo email' : 'Email address'}</li>
            <li>{isItalian ? 'Numero di telefono' : 'Phone number'}</li>
            <li>{isItalian ? 'Informazioni di fatturazione (gestite tramite Stripe)' : 'Billing information (processed through Stripe)'}</li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Dati raccolti automaticamente:' : 'Data collected automatically:'}
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>{isItalian ? 'Dati di navigazione e utilizzo del servizio' : 'Browsing and service usage data'}</li>
            <li>{isItalian ? 'Indirizzo IP' : 'IP address'}</li>
            <li>{isItalian ? 'Tipo di browser e dispositivo' : 'Browser type and device'}</li>
            <li>{isItalian ? 'Dati di interazione con la piattaforma' : 'Platform interaction data'}</li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Dati relativi all\'utilizzo del servizio:' : 'Data related to service usage:'}
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>{isItalian ? 'Conversazioni WhatsApp gestite tramite la piattaforma' : 'WhatsApp conversations managed through the platform'}</li>
            <li>{isItalian ? 'Configurazioni degli agenti AI creati dall\'utente' : 'AI agent configurations created by the user'}</li>
            <li>{isItalian ? 'Log di sistema e dati di performance' : 'System logs and performance data'}</li>
          </ul>

          <p className="mt-4 italic text-sm text-gray-500 dark:text-gray-400">
            {isItalian
              ? 'Non raccogliamo dati vocali, biometrici o categorie particolari di dati personali (dati sensibili).'
              : 'We do not collect voice data, biometric data, or special categories of personal data (sensitive data).'}
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '3. Finalità e Base Giuridica del Trattamento' : '3. Purposes and Legal Basis for Processing'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'I dati personali sono trattati per le seguenti finalità:'
              : 'Personal data is processed for the following purposes:'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800/50">
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {isItalian ? 'Finalità' : 'Purpose'}
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {isItalian ? 'Base Giuridica' : 'Legal Basis'}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Erogazione del servizio e gestione dell\'account' : 'Service provision and account management'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Esecuzione del contratto' : 'Contract performance'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Elaborazione dei pagamenti' : 'Payment processing'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Esecuzione del contratto' : 'Contract performance'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Assistenza clienti' : 'Customer support'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Esecuzione del contratto' : 'Contract performance'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Invio di comunicazioni di servizio' : 'Service communications'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Esecuzione del contratto' : 'Contract performance'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Analisi statistiche e miglioramento del servizio' : 'Statistical analysis and service improvement'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Legittimo interesse' : 'Legitimate interest'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Marketing e remarketing' : 'Marketing and remarketing'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Consenso' : 'Consent'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Adempimenti legali e fiscali' : 'Legal and tax compliance'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Obbligo di legge' : 'Legal obligation'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '4. Servizi di Terze Parti' : '4. Third-Party Services'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Per l\'erogazione del servizio, ci avvaliamo dei seguenti fornitori terzi che potrebbero trattare i tuoi dati personali:'
              : 'To provide our service, we use the following third-party providers who may process your personal data:'}
          </p>

          <ul className="space-y-2">
            <li><strong>Stripe, Inc.</strong> - {isItalian ? 'Gestione pagamenti e transazioni' : 'Payment processing'}</li>
            <li><strong>Google Analytics (Google LLC)</strong> - {isItalian ? 'Analisi statistiche del traffico web' : 'Web traffic analysis'}</li>
            <li><strong>Meta Platforms, Inc. (Facebook Pixel)</strong> - {isItalian ? 'Analisi e remarketing pubblicitario' : 'Analytics and advertising remarketing'}</li>
            <li><strong>Supabase, Inc.</strong> - {isItalian ? 'Database e infrastruttura' : 'Database and infrastructure'}</li>
            <li><strong>WhatsApp Business API (Meta Platforms, Inc.)</strong> - {isItalian ? 'Integrazione messaggistica' : 'Messaging integration'}</li>
          </ul>

          <p className="mt-4 text-sm">
            {isItalian
              ? 'Questi fornitori agiscono come Responsabili del trattamento e trattano i dati esclusivamente secondo le nostre istruzioni e nel rispetto delle normative applicabili.'
              : 'These providers act as Data Processors and process data exclusively according to our instructions and in compliance with applicable regulations.'}
          </p>
        </section>

        {/* Section 5 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '5. Cookie e Tecnologie di Tracciamento' : '5. Cookies and Tracking Technologies'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Il nostro sito utilizza cookie e tecnologie simili per:'
              : 'Our website uses cookies and similar technologies for:'}
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>{isItalian ? 'Cookie tecnici:' : 'Technical cookies:'}</strong>{' '}
              {isItalian
                ? 'necessari per il funzionamento del sito e del servizio'
                : 'necessary for website and service operation'}
            </li>
            <li>
              <strong>{isItalian ? 'Cookie analitici:' : 'Analytics cookies:'}</strong>{' '}
              {isItalian
                ? 'per comprendere come gli utenti interagiscono con il servizio (Google Analytics)'
                : 'to understand how users interact with the service (Google Analytics)'}
            </li>
            <li>
              <strong>{isItalian ? 'Cookie di marketing:' : 'Marketing cookies:'}</strong>{' '}
              {isItalian
                ? 'per attività di remarketing e pubblicità personalizzata (Facebook Pixel)'
                : 'for remarketing and personalized advertising (Facebook Pixel)'}
            </li>
          </ul>

          <p className="mt-4 text-sm">
            {isItalian
              ? 'Puoi gestire le tue preferenze sui cookie attraverso il banner presente sul sito o le impostazioni del tuo browser.'
              : 'You can manage your cookie preferences through the banner on our website or your browser settings.'}
          </p>
        </section>

        {/* Section 6 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '6. Conservazione dei Dati' : '6. Data Retention'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'I dati personali sono conservati per il tempo necessario al perseguimento delle finalità per cui sono stati raccolti:'
              : 'Personal data is retained for the time necessary to fulfill the purposes for which it was collected:'}
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>{isItalian ? 'Dati dell\'account:' : 'Account data:'}</strong>{' '}
              {isItalian
                ? 'conservati per tutta la durata del rapporto contrattuale e cancellati su richiesta dell\'utente'
                : 'retained for the duration of the contractual relationship and deleted upon user request'}
            </li>
            <li>
              <strong>{isItalian ? 'Conversazioni WhatsApp:' : 'WhatsApp conversations:'}</strong>{' '}
              {isItalian
                ? 'conservate fino alla richiesta di eliminazione da parte dell\'utente'
                : 'retained until the user requests deletion'}
            </li>
            <li>
              <strong>{isItalian ? 'Dati di fatturazione:' : 'Billing data:'}</strong>{' '}
              {isItalian
                ? 'conservati per 10 anni come richiesto dalla normativa fiscale'
                : 'retained for 10 years as required by tax regulations'}
            </li>
            <li>
              <strong>{isItalian ? 'Dati di navigazione e analytics:' : 'Browsing and analytics data:'}</strong>{' '}
              {isItalian
                ? 'conservati per un massimo di 26 mesi'
                : 'retained for a maximum of 26 months'}
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '7. Trasferimento dei Dati' : '7. Data Transfers'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'I tuoi dati personali potrebbero essere trasferiti verso paesi al di fuori dello Spazio Economico Europeo (SEE). In tal caso, adottiamo le seguenti garanzie:'
              : 'Your personal data may be transferred to countries outside the European Economic Area (EEA). In such cases, we implement the following safeguards:'}
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>{isItalian
              ? 'Clausole Contrattuali Standard approvate dalla Commissione Europea'
              : 'Standard Contractual Clauses approved by the European Commission'}</li>
            <li>{isItalian
              ? 'Verifica che i fornitori aderiscano a framework riconosciuti (es. EU-US Data Privacy Framework)'
              : 'Verification that providers adhere to recognized frameworks (e.g., EU-US Data Privacy Framework)'}</li>
            <li>{isItalian
              ? 'Misure tecniche e organizzative adeguate a garantire la sicurezza dei dati'
              : 'Appropriate technical and organizational measures to ensure data security'}</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '8. Diritti dell\'Interessato' : '8. Data Subject Rights'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'In conformità al Regolamento UE 2016/679 (GDPR) e alle normative applicabili, hai diritto di:'
              : 'In accordance with EU Regulation 2016/679 (GDPR) and applicable regulations, you have the right to:'}
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>{isItalian ? 'Accesso:' : 'Access:'}</strong>{' '}
              {isItalian
                ? 'ottenere conferma del trattamento e copia dei tuoi dati'
                : 'obtain confirmation of processing and a copy of your data'}
            </li>
            <li>
              <strong>{isItalian ? 'Rettifica:' : 'Rectification:'}</strong>{' '}
              {isItalian
                ? 'correggere dati inesatti o incompleti'
                : 'correct inaccurate or incomplete data'}
            </li>
            <li>
              <strong>{isItalian ? 'Cancellazione:' : 'Erasure:'}</strong>{' '}
              {isItalian
                ? 'richiedere la cancellazione dei tuoi dati ("diritto all\'oblio")'
                : 'request deletion of your data ("right to be forgotten")'}
            </li>
            <li>
              <strong>{isItalian ? 'Limitazione:' : 'Restriction:'}</strong>{' '}
              {isItalian
                ? 'limitare il trattamento in determinate circostanze'
                : 'restrict processing in certain circumstances'}
            </li>
            <li>
              <strong>{isItalian ? 'Portabilità:' : 'Portability:'}</strong>{' '}
              {isItalian
                ? 'ricevere i tuoi dati in formato strutturato e leggibile'
                : 'receive your data in a structured, readable format'}
            </li>
            <li>
              <strong>{isItalian ? 'Opposizione:' : 'Objection:'}</strong>{' '}
              {isItalian
                ? 'opporti al trattamento basato sul legittimo interesse'
                : 'object to processing based on legitimate interest'}
            </li>
            <li>
              <strong>{isItalian ? 'Revoca del consenso:' : 'Withdraw consent:'}</strong>{' '}
              {isItalian
                ? 'revocare in qualsiasi momento il consenso prestato'
                : 'withdraw consent at any time'}
            </li>
          </ul>

          <p className="mt-4">
            {isItalian
              ? 'Per esercitare i tuoi diritti, contattaci all\'indirizzo:'
              : 'To exercise your rights, contact us at:'}{' '}
            <a href="mailto:info@leader24.ai" className="text-blue-400 hover:text-blue-300 transition-colors">info@leader24.ai</a>
          </p>
          <p className="mt-2 text-sm">
            {isItalian
              ? 'Hai inoltre il diritto di proporre reclamo all\'Autorità Garante per la protezione dei dati personali del tuo paese di residenza.'
              : 'You also have the right to lodge a complaint with the Data Protection Authority in your country of residence.'}
          </p>
        </section>

        {/* Section 9 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '9. Sicurezza dei Dati' : '9. Data Security'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Adottiamo misure tecniche e organizzative appropriate per proteggere i dati personali, tra cui:'
              : 'We implement appropriate technical and organizational measures to protect personal data, including:'}
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>{isItalian ? 'Crittografia dei dati in transito (HTTPS/TLS)' : 'Data encryption in transit (HTTPS/TLS)'}</li>
            <li>{isItalian ? 'Crittografia dei dati a riposo' : 'Data encryption at rest'}</li>
            <li>{isItalian ? 'Controlli di accesso basati su ruoli' : 'Role-based access controls'}</li>
            <li>{isItalian ? 'Monitoraggio continuo della sicurezza' : 'Continuous security monitoring'}</li>
            <li>{isItalian ? 'Backup regolari' : 'Regular backups'}</li>
            <li>{isItalian ? 'Formazione del personale' : 'Staff training'}</li>
          </ul>
        </section>

        {/* Section 10 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '10. Requisiti di Età' : '10. Age Requirements'}
          </h2>
          <p>
            {isItalian
              ? 'Il servizio Leader24.ai è destinato esclusivamente a utenti maggiorenni (18 anni o più). Non raccogliamo consapevolmente dati personali di minori. Se ritieni che abbiamo raccolto dati di un minore, contattaci immediatamente.'
              : 'The Leader24.ai service is intended exclusively for users aged 18 years or older. We do not knowingly collect personal data from minors. If you believe we have collected data from a minor, please contact us immediately.'}
          </p>
        </section>

        {/* Section 11 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '11. Modifiche alla Privacy Policy' : '11. Changes to the Privacy Policy'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con l\'indicazione della data di ultimo aggiornamento. Ti invitiamo a consultare periodicamente questa pagina.'
              : 'We reserve the right to modify this Privacy Policy at any time. Changes will be posted on this page with the updated date indicated. We encourage you to review this page periodically.'}
          </p>
          <p className="text-sm">
            {isItalian
              ? 'Per modifiche sostanziali, ti informeremo tramite email o notifica sulla piattaforma.'
              : 'For substantial changes, we will notify you via email or platform notification.'}
          </p>
        </section>

        {/* Section 12 - Contatti */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '12. Contatti' : '12. Contact Us'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Per qualsiasi domanda o richiesta relativa a questa Privacy Policy o al trattamento dei tuoi dati personali, puoi contattarci:'
              : 'For any questions or requests regarding this Privacy Policy or the processing of your personal data, you can contact us:'}
          </p>

          <ul className="list-none space-y-2">
            <li><strong>Sevedo Co. Ltd.</strong></li>
            <li>
              {isItalian ? 'Indirizzo' : 'Address'}: 9/291 Vichitsongkram Road, Kathu, Phuket, Thailand
            </li>
            <li>
              Email:{' '}
              <a href="mailto:info@leader24.ai" className="text-blue-400 hover:text-blue-300 transition-colors">
                info@leader24.ai
              </a>
            </li>
          </ul>
        </section>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {isItalian
            ? 'Ultimo aggiornamento: Gennaio 2026'
            : 'Last updated: January 2026'}
        </p>
      </div>
    </main>
  )
}

export default PrivacyPolicyPage
