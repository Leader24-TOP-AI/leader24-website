'use client'

import { useLocale } from 'next-intl'

const CookiePolicyPage = () => {
  const locale = useLocale()
  const isItalian = locale === 'it'

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Cookie Policy
      </h1>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        {/* Introduction */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <p className="mb-4">
            {isItalian
              ? 'In Leader24 crediamo nella trasparenza riguardo ai dati che raccogliamo su di te e su come li utilizziamo. Questa policy fornisce informazioni sui cookie e su come puoi controllarli.'
              : 'At Leader24 we believe in being transparent about the data we collect about you and how it is used. This policy provides information about cookies and how you can control them.'}
          </p>
          <p>
            {isItalian
              ? 'I cookie sono piccoli file di testo memorizzati sul tuo computer o dispositivo mobile quando visiti il nostro sito. Ci permettono di far funzionare il sito, renderlo più sicuro, offrirti una migliore esperienza e capire come viene utilizzato.'
              : 'Cookies are small text files stored on your computer or mobile device when you visit our site. They allow us to make the site work, make it more secure, provide you with a better experience, and understand how it is used.'}
          </p>
        </section>

        {/* How We Use Cookies */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? 'Come Utilizziamo i Cookie' : 'How We Use Cookies'}
          </h2>

          <p className="mb-6">
            {isItalian
              ? 'Utilizziamo i cookie per diversi scopi:'
              : 'We use cookies for several purposes:'}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {isItalian ? 'Autenticazione' : 'Authentication'}
              </h3>
              <p>
                {isItalian
                  ? 'Utilizziamo cookie per verificare la tua identità quando accedi alla dashboard di Leader24. Questo ci permette di mostrarti le informazioni corrette e di mantenere la tua sessione attiva in modo sicuro.'
                  : 'We use cookies to verify your identity when you log into the Leader24 dashboard. This allows us to show you the correct information and keep your session active securely.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {isItalian ? 'Sicurezza' : 'Security'}
              </h3>
              <p>
                {isItalian
                  ? 'I cookie ci aiutano a proteggere il tuo account e i tuoi dati, rilevando attività sospette o accessi non autorizzati.'
                  : 'Cookies help us protect your account and data by detecting suspicious activity or unauthorized access.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {isItalian ? 'Preferenze' : 'Preferences'}
              </h3>
              <p>
                {isItalian
                  ? 'I cookie ci permettono di ricordare le tue preferenze, come la lingua selezionata e le impostazioni di visualizzazione, per offrirti un\'esperienza personalizzata.'
                  : 'Cookies allow us to remember your preferences, such as your selected language and display settings, to provide you with a personalized experience.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {isItalian ? 'Analytics e Performance' : 'Analytics and Performance'}
              </h3>
              <p>
                {isItalian
                  ? 'Utilizziamo cookie analitici per capire come i visitatori interagiscono con il nostro sito. Questo ci aiuta a migliorare continuamente Leader24 e a risolvere eventuali problemi.'
                  : 'We use analytics cookies to understand how visitors interact with our site. This helps us continuously improve Leader24 and fix any issues.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {isItalian ? 'Marketing' : 'Marketing'}
              </h3>
              <p>
                {isItalian
                  ? 'Utilizziamo cookie di marketing per misurare l\'efficacia delle nostre campagne pubblicitarie e mostrarti contenuti pertinenti basati sui tuoi interessi.'
                  : 'We use marketing cookies to measure the effectiveness of our advertising campaigns and show you relevant content based on your interests.'}
              </p>
            </div>
          </div>
        </section>

        {/* Your Choices */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? 'Le Tue Scelte' : 'Your Choices'}
          </h2>

          <p className="mb-4">
            {isItalian
              ? 'Hai il controllo sui cookie. Puoi gestire le tue preferenze in diversi modi:'
              : 'You have control over cookies. You can manage your preferences in several ways:'}
          </p>

          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li>
              <strong>{isItalian ? 'Banner dei Cookie:' : 'Cookie Banner:'}</strong>{' '}
              {isItalian
                ? 'Quando visiti il nostro sito, puoi scegliere quali categorie di cookie accettare tramite il banner.'
                : 'When you visit our site, you can choose which categories of cookies to accept through the banner.'}
            </li>
            <li>
              <strong>{isItalian ? 'Impostazioni del Browser:' : 'Browser Settings:'}</strong>{' '}
              {isItalian
                ? 'La maggior parte dei browser ti permette di bloccare o eliminare i cookie. Consulta le impostazioni del tuo browser per maggiori dettagli.'
                : 'Most browsers allow you to block or delete cookies. Check your browser settings for more details.'}
            </li>
          </ul>

          <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              {isItalian
                ? 'Nota: Disabilitare i cookie necessari potrebbe compromettere il funzionamento del sito e impedirti di accedere alla dashboard.'
                : 'Note: Disabling necessary cookies may compromise website functionality and prevent you from accessing the dashboard.'}
            </p>
          </div>
        </section>

        {/* Do Not Track */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? 'Segnali Do Not Track' : 'Do Not Track Signals'}
          </h2>
          <p>
            {isItalian
              ? 'Alcuni browser offrono un\'opzione "Do Not Track" che invia un segnale ai siti web. Attualmente non rispondiamo a questi segnali, ma rispettiamo le tue scelte sui cookie effettuate tramite il nostro banner.'
              : 'Some browsers offer a "Do Not Track" option that sends a signal to websites. We do not currently respond to these signals, but we respect your cookie choices made through our banner.'}
          </p>
        </section>

        {/* Third Party Services */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? 'Servizi di Terze Parti' : 'Third-Party Services'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Alcuni cookie sono impostati da servizi di terze parti che utilizziamo. Per maggiori informazioni su come questi servizi gestiscono i tuoi dati, consulta le loro privacy policy:'
              : 'Some cookies are set by third-party services we use. For more information about how these services handle your data, see their privacy policies:'}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                Google Privacy Policy
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                Meta Privacy Policy
              </a>
            </li>
            <li>
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                Supabase Privacy Policy
              </a>
            </li>
          </ul>
        </section>

        {/* Updates */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? 'Aggiornamenti' : 'Updates'}
          </h2>
          <p>
            {isItalian
              ? 'Potremmo aggiornare questa Cookie Policy periodicamente. Ti invitiamo a consultare regolarmente questa pagina per rimanere informato sul nostro utilizzo dei cookie.'
              : 'We may update this Cookie Policy periodically. We encourage you to review this page regularly to stay informed about our use of cookies.'}
          </p>
        </section>

        {/* Contact */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? 'Contatti' : 'Contact Us'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Per qualsiasi domanda sulla nostra Cookie Policy, contattaci:'
              : 'For any questions about our Cookie Policy, contact us:'}
          </p>
          <p>
            Email:{' '}
            <a href="mailto:info@leader24.ai" className="text-blue-400 hover:text-blue-300 transition-colors">
              info@leader24.ai
            </a>
          </p>
        </section>

        {/* Appendix - Cookie Tables */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {isItalian ? 'Elenco dei Cookie' : 'Cookie List'}
          </h2>

          {/* Strictly Necessary Cookies */}
          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-3">
            {isItalian ? 'Cookie Strettamente Necessari' : 'Strictly Necessary Cookies'}
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800/50">
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    Cookie
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {isItalian ? 'Tipo' : 'Type'}
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {isItalian ? 'Scopo' : 'Purpose'}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    sb-*-auth-token
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Prima parte' : 'First party'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Autenticazione utente' : 'User authentication'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    sb-*-auth-token-code-verifier
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Prima parte' : 'First party'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Verifica sicurezza PKCE' : 'PKCE security verification'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    __stripe_mid
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Terza parte' : 'Third party'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Prevenzione frodi pagamenti' : 'Payment fraud prevention'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    __stripe_sid
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Terza parte' : 'Third party'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Sessione pagamenti' : 'Payment session'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Performance Cookies */}
          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-3">
            {isItalian ? 'Cookie di Performance' : 'Performance Cookies'}
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800/50">
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    Cookie
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {isItalian ? 'Tipo' : 'Type'}
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {isItalian ? 'Scopo' : 'Purpose'}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    _ga
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Terza parte' : 'Third party'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Distinguere utenti unici' : 'Distinguish unique users'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    _ga_*
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Terza parte' : 'Third party'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Stato sessione Google Analytics' : 'Google Analytics session state'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Marketing Cookies */}
          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-3">
            {isItalian ? 'Cookie di Marketing' : 'Marketing Cookies'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800/50">
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    Cookie
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {isItalian ? 'Tipo' : 'Type'}
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {isItalian ? 'Scopo' : 'Purpose'}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    _fbp
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Terza parte' : 'Third party'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Tracciamento pubblicitario Facebook' : 'Facebook advertising tracking'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                    _gcl_au
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Terza parte' : 'Third party'}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                    {isItalian ? 'Conversioni Google Ads' : 'Google Ads conversions'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

export default CookiePolicyPage
