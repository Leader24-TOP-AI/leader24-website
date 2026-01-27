'use client'

import { useLocale } from 'next-intl'

const TermsOfServicePage = () => {
  const locale = useLocale()
  const isItalian = locale === 'it'

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        {isItalian ? 'Termini di Servizio' : 'Terms of Service'}
      </h1>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        {/* Section 1 - Introduction */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '1. Introduzione' : '1. Introduction'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Benvenuto su Leader24.ai ("Servizio"), una piattaforma SaaS fornita da Sevedo Co. Ltd. ("Società", "noi", "nostro"). Questi Termini di Servizio ("Termini") regolano l\'accesso e l\'utilizzo della nostra piattaforma per la creazione di agenti AI per il servizio clienti.'
              : 'Welcome to Leader24.ai ("Service"), a SaaS platform provided by Sevedo Co. Ltd. ("Company", "we", "our"). These Terms of Service ("Terms") govern your access to and use of our platform for creating AI customer service agents.'}
          </p>
          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4">
            <p className="font-semibold text-gray-900 dark:text-white">Sevedo Co. Ltd.</p>
            <p>9/291 Vichitsongkram Road, Kathu, Phuket, Thailand</p>
            <p>Email: info@leader24.ai</p>
          </div>
        </section>

        {/* Section 2 - Acceptance */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '2. Accettazione dei Termini' : '2. Acceptance of Terms'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Accedendo o utilizzando il Servizio, accetti di essere vincolato da questi Termini. Se non accetti questi Termini, non puoi accedere o utilizzare il Servizio.'
              : 'By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.'}
          </p>
          <p className="mb-4">
            {isItalian
              ? 'Se utilizzi il Servizio per conto di un\'organizzazione, accetti questi Termini a nome di tale organizzazione e dichiari di avere l\'autorità per vincolare l\'organizzazione a questi Termini.'
              : 'If you are using the Service on behalf of an organization, you are agreeing to these Terms on behalf of that organization and represent that you have the authority to bind the organization to these Terms.'}
          </p>
          <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium">
              {isItalian
                ? '⚠️ Utilizzando il Servizio, confermi di aver letto, compreso e accettato questi Termini e la nostra Privacy Policy.'
                : '⚠️ By using the Service, you confirm that you have read, understood, and accepted these Terms and our Privacy Policy.'}
            </p>
          </div>
        </section>

        {/* Section 3 - Service Description */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '3. Descrizione del Servizio' : '3. Service Description'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Leader24.ai è una piattaforma che consente agli utenti di:'
              : 'Leader24.ai is a platform that allows users to:'}
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>{isItalian ? 'Creare e configurare agenti AI per il servizio clienti' : 'Create and configure AI agents for customer service'}</li>
            <li>{isItalian ? 'Integrare gli agenti AI con WhatsApp Business' : 'Integrate AI agents with WhatsApp Business'}</li>
            <li>{isItalian ? 'Incorporare widget di chat sui propri siti web' : 'Embed chat widgets on their websites'}</li>
            <li>{isItalian ? 'Caricare documenti per creare una base di conoscenza' : 'Upload documents to create a knowledge base'}</li>
            <li>{isItalian ? 'Gestire conversazioni e raccogliere lead' : 'Manage conversations and collect leads'}</li>
            <li>{isItalian ? 'Analizzare le performance degli agenti AI' : 'Analyze AI agent performance'}</li>
          </ul>
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            {isItalian
              ? 'Il Servizio è in continua evoluzione. Ci riserviamo il diritto di modificare, sospendere o interrompere qualsiasi funzionalità in qualsiasi momento.'
              : 'The Service is continuously evolving. We reserve the right to modify, suspend, or discontinue any feature at any time.'}
          </p>
        </section>

        {/* Section 4 - User Accounts */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '4. Account Utente' : '4. User Accounts'}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Requisiti di Registrazione' : 'Registration Requirements'}
          </h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>{isItalian ? 'Devi avere almeno 18 anni per utilizzare il Servizio' : 'You must be at least 18 years old to use the Service'}</li>
            <li>{isItalian ? 'Devi fornire informazioni accurate e complete durante la registrazione' : 'You must provide accurate and complete information during registration'}</li>
            <li>{isItalian ? 'Devi mantenere aggiornate le informazioni del tuo account' : 'You must keep your account information up to date'}</li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Sicurezza dell\'Account' : 'Account Security'}
          </h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>{isItalian ? 'Sei responsabile della sicurezza delle credenziali del tuo account' : 'You are responsible for the security of your account credentials'}</li>
            <li>{isItalian ? 'Devi notificarci immediatamente di qualsiasi accesso non autorizzato' : 'You must notify us immediately of any unauthorized access'}</li>
            <li>{isItalian ? 'Sei responsabile di tutte le attività che avvengono sotto il tuo account' : 'You are responsible for all activities that occur under your account'}</li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Organizzazioni e Team' : 'Organizations and Teams'}
          </h3>
          <p>
            {isItalian
              ? 'Ogni account è associato a un\'organizzazione. Il proprietario dell\'organizzazione può invitare altri membri e gestire i permessi di accesso agli agenti AI.'
              : 'Each account is associated with an organization. The organization owner can invite other members and manage access permissions to AI agents.'}
          </p>
        </section>

        {/* Section 5 - Pricing and Payments */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '5. Piani e Pagamenti' : '5. Pricing and Payments'}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Sistema di Crediti' : 'Credit System'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Il Servizio utilizza un sistema basato su crediti. Ogni messaggio elaborato dall\'agente AI consuma crediti secondo il piano sottoscritto.'
              : 'The Service uses a credit-based system. Each message processed by the AI agent consumes credits according to your subscribed plan.'}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Abbonamenti' : 'Subscriptions'}
          </h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>{isItalian ? 'Gli abbonamenti sono fatturati mensilmente o annualmente' : 'Subscriptions are billed monthly or annually'}</li>
            <li>{isItalian ? 'I crediti non utilizzati non vengono trasferiti al mese successivo' : 'Unused credits do not roll over to the next month'}</li>
            <li>{isItalian ? 'I pagamenti sono processati tramite Stripe in modo sicuro' : 'Payments are processed securely through Stripe'}</li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Modifiche ai Prezzi' : 'Price Changes'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Ci riserviamo il diritto di modificare i prezzi. Ti notificheremo almeno 30 giorni prima dell\'entrata in vigore di eventuali aumenti di prezzo.'
              : 'We reserve the right to change prices. We will notify you at least 30 days before any price increases take effect.'}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Rimborsi' : 'Refunds'}
          </h3>
          <p>
            {isItalian
              ? 'I pagamenti non sono rimborsabili, salvo quanto richiesto dalla legge applicabile. Puoi cancellare il tuo abbonamento in qualsiasi momento, ma non riceverai un rimborso per il periodo rimanente.'
              : 'Payments are non-refundable, except as required by applicable law. You may cancel your subscription at any time, but you will not receive a refund for the remaining period.'}
          </p>
        </section>

        {/* Section 6 - Acceptable Use */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '6. Uso Accettabile' : '6. Acceptable Use'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Utilizzando il Servizio, accetti di NON:'
              : 'By using the Service, you agree NOT to:'}
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>{isItalian ? 'Inviare spam, messaggi non richiesti o comunicazioni di massa tramite WhatsApp' : 'Send spam, unsolicited messages, or mass communications through WhatsApp'}</li>
            <li>{isItalian ? 'Violare le policy di WhatsApp Business o di Meta' : 'Violate WhatsApp Business or Meta policies'}</li>
            <li>{isItalian ? 'Utilizzare il Servizio per scopi illegali o fraudolenti' : 'Use the Service for illegal or fraudulent purposes'}</li>
            <li>{isItalian ? 'Caricare contenuti che violano diritti di proprietà intellettuale' : 'Upload content that infringes intellectual property rights'}</li>
            <li>{isItalian ? 'Tentare di accedere a sistemi o dati non autorizzati' : 'Attempt to access unauthorized systems or data'}</li>
            <li>{isItalian ? 'Interferire con il funzionamento del Servizio' : 'Interfere with the operation of the Service'}</li>
            <li>{isItalian ? 'Rivendere o sublicenziare il Servizio senza autorizzazione' : 'Resell or sublicense the Service without authorization'}</li>
            <li>{isItalian ? 'Utilizzare il Servizio per molestare, minacciare o diffamare altri' : 'Use the Service to harass, threaten, or defame others'}</li>
          </ul>
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200 font-medium">
              {isItalian
                ? '⚠️ La violazione di queste regole può comportare la sospensione o la terminazione immediata dell\'account senza rimborso.'
                : '⚠️ Violation of these rules may result in immediate suspension or termination of your account without refund.'}
            </p>
          </div>
        </section>

        {/* Section 7 - Third-Party Services */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '7. Servizi di Terze Parti' : '7. Third-Party Services'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Il Servizio si integra con prodotti, servizi o applicazioni di terze parti che non sono di proprietà o controllati da Leader24 ("Servizi di Terze Parti"). Questi includono:'
              : 'The Service integrates with third-party products, services, or applications that are not owned or controlled by Leader24 ("Third-Party Services"). These include:'}
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li><strong>Stripe, Inc.</strong> - {isItalian ? 'Elaborazione pagamenti' : 'Payment processing'}</li>
            <li><strong>Google Analytics (Google LLC)</strong> - {isItalian ? 'Analisi del traffico web' : 'Web traffic analytics'}</li>
            <li><strong>Meta Platforms, Inc.</strong> - {isItalian ? 'Remarketing pubblicitario (Facebook Pixel)' : 'Advertising remarketing (Facebook Pixel)'}</li>
            <li><strong>Supabase, Inc.</strong> - {isItalian ? 'Database e autenticazione' : 'Database and authentication'}</li>
            <li><strong>WhatsApp Business API (Meta Platforms, Inc.)</strong> - {isItalian ? 'Integrazione messaggistica' : 'Messaging integration'}</li>
          </ul>
          <p className="mb-4">
            {isItalian
              ? 'Quando utilizzi funzionalità che coinvolgono Servizi di Terze Parti, potresti dover accettare i loro termini separati. Dichiari di avere l\'autorità per utilizzare tali servizi.'
              : 'When using features involving Third-Party Services, you may need to accept their separate terms. You represent that you have the authority to use such services.'}
          </p>
          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {isItalian
                ? 'Leader24 non approva né garantisce i Servizi di Terze Parti e declina ogni responsabilità riguardo ad essi. L\'utilizzo dei Servizi di Terze Parti avviene a tuo rischio. Per qualsiasi problema relativo a tali servizi, devi rivolgerti direttamente ai rispettivi fornitori.'
                : 'Leader24 does not endorse or warrant Third-Party Services and disclaims all liability regarding them. Use of Third-Party Services is at your own risk. For any issues related to such services, you must contact the respective providers directly.'}
            </p>
          </div>
        </section>

        {/* Section 8 - Technical Restrictions */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '8. Restrizioni Tecniche' : '8. Technical Restrictions'}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Restrizioni d\'Uso' : 'Use Restrictions'}
          </h3>
          <p className="mb-2">
            {isItalian ? 'Non è consentito:' : 'You may not:'}
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>{isItalian ? 'Modificare, tradurre, copiare o creare opere derivate dal Servizio' : 'Modify, translate, copy, or create derivative works from the Service'}</li>
            <li>{isItalian ? 'Decompilare, disassemblare o tentare di estrarre il codice sorgente' : 'Decompile, disassemble, or attempt to extract source code'}</li>
            <li>{isItalian ? 'Sublicenziare o sfruttare commercialmente il Servizio senza autorizzazione' : 'Sublicense or commercially exploit the Service without authorization'}</li>
            <li>{isItalian ? 'Rimuovere avvisi di proprietà o copyright' : 'Remove proprietary or copyright notices'}</li>
            <li>{isItalian ? 'Testare vulnerabilità senza autorizzazione scritta' : 'Test for vulnerabilities without written authorization'}</li>
            <li>{isItalian ? 'Utilizzare il Servizio per sviluppare prodotti concorrenti' : 'Use the Service to develop competing products'}</li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Limiti API e Widget' : 'API and Widget Limits'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Leader24 può fornire accesso ad API e widget come parte del Servizio. Ci riserviamo il diritto di:'
              : 'Leader24 may provide access to APIs and widgets as part of the Service. We reserve the right to:'}
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>{isItalian ? 'Impostare e applicare limiti di utilizzo (rate limiting)' : 'Set and enforce usage limits (rate limiting)'}</li>
            <li>{isItalian ? 'Richiedere la configurazione di domini autorizzati per il widget (CORS)' : 'Require configuration of authorized domains for the widget (CORS)'}</li>
            <li>{isItalian ? 'Sospendere o terminare l\'accesso API in qualsiasi momento' : 'Suspend or terminate API access at any time'}</li>
            <li>{isItalian ? 'Modificare le specifiche tecniche con preavviso ragionevole' : 'Modify technical specifications with reasonable notice'}</li>
          </ul>
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            {isItalian
              ? 'Un utilizzo significativamente dannoso può comportare la sospensione dell\'accesso dopo ragionevole preavviso.'
              : 'Significantly harmful use may result in access suspension after reasonable notice.'}
          </p>
        </section>

        {/* Section 9 - Confidentiality */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '9. Riservatezza' : '9. Confidentiality'}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Informazioni Riservate' : 'Confidential Information'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Ciascuna parte può condividere informazioni commerciali, tecniche o finanziarie considerate riservate. Per Leader24, questo include dettagli non pubblici sul Servizio. Per te, include i documenti caricati, le configurazioni degli agenti e i dati delle conversazioni.'
              : 'Each party may share business, technical, or financial information considered confidential. For Leader24, this includes non-public service details. For you, this includes uploaded documents, agent configurations, and conversation data.'}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Protezione e Utilizzo' : 'Protection and Use'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Ci impegniamo a proteggere le tue informazioni riservate con lo stesso grado di cura che utilizziamo per le nostre informazioni simili, e comunque con un livello ragionevole di protezione. L\'accesso è limitato al personale autorizzato vincolato da obblighi di riservatezza.'
              : 'We commit to protecting your confidential information with the same degree of care we use for our own similar information, and in any case with a reasonable level of protection. Access is limited to authorized personnel bound by confidentiality obligations.'}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Divulgazione Obbligatoria' : 'Compelled Disclosure'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Quando richiesto dalla legge, potremmo dover divulgare informazioni riservate. In tal caso, ti forniremo preavviso (quando legalmente consentito) e ragionevole assistenza per contestare la divulgazione.'
              : 'When required by law, we may need to disclose confidential information. In such cases, we will provide you with advance notice (when legally permitted) and reasonable assistance to contest the disclosure.'}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Feedback' : 'Feedback'}
          </h3>
          <p>
            {isItalian
              ? 'Ci concedi una licenza royalty-free, mondiale, perpetua e irrevocabile per utilizzare, modificare e sfruttare qualsiasi feedback, suggerimento o idea che ci fornisci riguardo al Servizio, senza obbligo di identificarti come fonte.'
              : 'You grant us a royalty-free, worldwide, perpetual, and irrevocable license to use, modify, and exploit any feedback, suggestions, or ideas you provide regarding the Service, without obligation to identify you as the source.'}
          </p>
        </section>

        {/* Section 10 - Data */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '10. Dati e Conservazione' : '10. Data and Retention'}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Informazioni Utente' : 'User Information'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Raccogliamo informazioni come nome, email, indirizzo IP, browser e sistema operativo. Ci autorizzi a memorizzare, elaborare e recuperare queste informazioni come parte dell\'utilizzo del Servizio.'
              : 'We collect information such as name, email, IP address, browser, and operating system. You authorize us to store, process, and retrieve this information as part of using the Service.'}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Contenuti Caricati' : 'User Submissions'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Ci concedi una licenza non esclusiva, mondiale, royalty-free per utilizzare, elaborare e visualizzare i contenuti caricati esclusivamente per fornire il Servizio. Mantieni tutti i diritti oltre a quelli concessi.'
              : 'You grant us a non-exclusive, worldwide, royalty-free license to use, process, and display your uploaded content solely to provide the Service. You retain all rights beyond those granted.'}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Dati del Servizio' : 'Service Data'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Raccogliamo dati di performance e operativi. Quando aggregati e anonimizzati senza rivelare informazioni personali, possiamo utilizzare questi dati liberamente per migliorare il Servizio. Non identificheremo te o i tuoi utenti come fonte.'
              : 'We collect performance and operational data. When aggregated and anonymized without revealing personal information, we may use this data freely to improve the Service. We will not identify you or your users as the source.'}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Conservazione Dati' : 'Data Retention'}
          </h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>{isItalian ? 'Conversazioni: conservate fino alla cancellazione manuale o chiusura account' : 'Conversations: retained until manual deletion or account closure'}</li>
            <li>{isItalian ? 'Documenti e base di conoscenza: conservati fino alla cancellazione manuale' : 'Documents and Knowledge Base: retained until manual deletion'}</li>
            <li>{isItalian ? 'Lead estratti: conservati fino alla cancellazione manuale' : 'Extracted leads: retained until manual deletion'}</li>
            <li>{isItalian ? 'Log di utilizzo crediti: conservati permanentemente per audit' : 'Credit usage logs: retained permanently for audit'}</li>
            <li>{isItalian ? 'Dati post-cancellazione account: eliminati entro 30 giorni' : 'Post-account deletion data: deleted within 30 days'}</li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Protezione Dati' : 'Data Protection'}
          </h3>
          <p>
            {isItalian
              ? 'Manteniamo pratiche di sicurezza ragionevoli per proteggere i tuoi dati. Tuttavia, sei responsabile della sicurezza dei tuoi sistemi e dati. Per maggiori dettagli, consulta la nostra Privacy Policy.'
              : 'We maintain reasonable security practices to protect your data. However, you are responsible for securing your own systems and data. For more details, see our Privacy Policy.'}
          </p>
        </section>

        {/* Section 11 - Intellectual Property */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '11. Proprietà Intellettuale' : '11. Intellectual Property'}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Nostra Proprietà' : 'Our Property'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Il Servizio, inclusi software, design, loghi, testi e tutti i contenuti creati da noi, sono di proprietà esclusiva di Sevedo Co. Ltd. e sono protetti dalle leggi sulla proprietà intellettuale.'
              : 'The Service, including software, design, logos, text, and all content created by us, are the exclusive property of Sevedo Co. Ltd. and are protected by intellectual property laws.'}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Tua Proprietà' : 'Your Property'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Mantieni tutti i diritti sui contenuti che carichi sul Servizio, inclusi documenti, configurazioni degli agenti e dati delle conversazioni.'
              : 'You retain all rights to the content you upload to the Service, including documents, agent configurations, and conversation data.'}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Licenza d\'Uso' : 'License to Use'}
          </h3>
          <p>
            {isItalian
              ? 'Ti concediamo una licenza limitata, non esclusiva, non trasferibile e revocabile per utilizzare il Servizio in conformità con questi Termini.'
              : 'We grant you a limited, non-exclusive, non-transferable, and revocable license to use the Service in accordance with these Terms.'}
          </p>
        </section>

        {/* Section 12 - AI Disclaimer */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '12. Disclaimer sull\'Intelligenza Artificiale' : '12. Artificial Intelligence Disclaimer'}
          </h2>
          <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg p-4 mb-4">
            <p className="text-blue-800 dark:text-blue-200">
              {isItalian
                ? 'Il Servizio utilizza tecnologie di intelligenza artificiale generativa per creare risposte automatiche. È importante comprendere le seguenti limitazioni:'
                : 'The Service uses generative artificial intelligence technologies to create automated responses. It is important to understand the following limitations:'}
            </p>
          </div>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              {isItalian
                ? 'Le risposte generate dall\'AI potrebbero contenere errori, imprecisioni o informazioni obsolete'
                : 'AI-generated responses may contain errors, inaccuracies, or outdated information'}
            </li>
            <li>
              {isItalian
                ? 'L\'AI non può sostituire il giudizio professionale in ambiti legali, medici o finanziari'
                : 'AI cannot replace professional judgment in legal, medical, or financial matters'}
            </li>
            <li>
              {isItalian
                ? 'Sei responsabile della revisione e approvazione delle configurazioni del tuo agente AI'
                : 'You are responsible for reviewing and approving your AI agent configurations'}
            </li>
            <li>
              {isItalian
                ? 'Leader24 non è responsabile per decisioni prese dai tuoi clienti basandosi sulle risposte dell\'AI'
                : 'Leader24 is not responsible for decisions made by your customers based on AI responses'}
            </li>
          </ul>
          <p className="font-medium text-gray-900 dark:text-white">
            {isItalian
              ? 'Ti consigliamo di monitorare regolarmente le conversazioni e di configurare l\'agente AI in modo appropriato per il tuo settore.'
              : 'We recommend regularly monitoring conversations and configuring your AI agent appropriately for your industry.'}
          </p>
        </section>

        {/* Section 13 - Limitation of Liability */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '13. Limitazione di Responsabilità' : '13. Limitation of Liability'}
          </h2>
          <p className="mb-4 uppercase font-medium text-sm">
            {isItalian
              ? 'NELLA MISURA MASSIMA CONSENTITA DALLA LEGGE APPLICABILE:'
              : 'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:'}
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              {isItalian
                ? 'Il Servizio è fornito "COSÌ COM\'È" e "COME DISPONIBILE" senza garanzie di alcun tipo'
                : 'The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind'}
            </li>
            <li>
              {isItalian
                ? 'Non garantiamo che il Servizio sarà ininterrotto, sicuro o privo di errori'
                : 'We do not guarantee that the Service will be uninterrupted, secure, or error-free'}
            </li>
            <li>
              {isItalian
                ? 'Non siamo responsabili per danni indiretti, incidentali, speciali o consequenziali'
                : 'We are not liable for indirect, incidental, special, or consequential damages'}
            </li>
            <li>
              {isItalian
                ? 'La nostra responsabilità totale è limitata all\'importo pagato per il Servizio negli ultimi 12 mesi'
                : 'Our total liability is limited to the amount paid for the Service in the last 12 months'}
            </li>
          </ul>
        </section>

        {/* Section 14 - Termination */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '14. Terminazione' : '14. Termination'}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Terminazione da Parte Tua' : 'Termination by You'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Puoi cancellare il tuo account in qualsiasi momento dalle impostazioni della dashboard. La cancellazione sarà effettiva alla fine del periodo di fatturazione corrente.'
              : 'You may cancel your account at any time from the dashboard settings. Cancellation will be effective at the end of the current billing period.'}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Terminazione da Parte Nostra' : 'Termination by Us'}
          </h3>
          <p className="mb-4">
            {isItalian
              ? 'Possiamo sospendere o terminare il tuo account immediatamente se:'
              : 'We may suspend or terminate your account immediately if:'}
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>{isItalian ? 'Violi questi Termini o le policy di uso accettabile' : 'You violate these Terms or acceptable use policies'}</li>
            <li>{isItalian ? 'Il tuo utilizzo causa danni al Servizio o ad altri utenti' : 'Your use causes harm to the Service or other users'}</li>
            <li>{isItalian ? 'Siamo obbligati a farlo per legge' : 'We are required to do so by law'}</li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {isItalian ? 'Effetti della Terminazione' : 'Effects of Termination'}
          </h3>
          <p>
            {isItalian
              ? 'Alla terminazione, i tuoi dati saranno conservati per 30 giorni, durante i quali potrai richiederne l\'esportazione. Successivamente, i dati saranno eliminati permanentemente.'
              : 'Upon termination, your data will be retained for 30 days, during which you may request an export. After that, data will be permanently deleted.'}
          </p>
        </section>

        {/* Section 15 - Changes to Terms */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '15. Modifiche ai Termini' : '15. Changes to Terms'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con la data di aggiornamento.'
              : 'We reserve the right to modify these Terms at any time. Changes will be posted on this page with the updated date.'}
          </p>
          <p className="mb-4">
            {isItalian
              ? 'Per modifiche sostanziali, ti notificheremo via email almeno 30 giorni prima dell\'entrata in vigore. Continuando a utilizzare il Servizio dopo tale data, accetti i nuovi Termini.'
              : 'For substantial changes, we will notify you via email at least 30 days before they take effect. By continuing to use the Service after that date, you accept the new Terms.'}
          </p>
        </section>

        {/* Section 16 - Governing Law */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '16. Legge Applicabile e Giurisdizione' : '16. Governing Law and Jurisdiction'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Questi Termini sono regolati dalle leggi del Regno di Thailandia, senza riguardo ai principi di conflitto di leggi.'
              : 'These Terms are governed by the laws of the Kingdom of Thailand, without regard to conflict of law principles.'}
          </p>
          <p className="mb-4">
            {isItalian
              ? 'Qualsiasi controversia derivante da o relativa a questi Termini sarà sottoposta alla giurisdizione esclusiva dei tribunali di Phuket, Thailandia.'
              : 'Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of Phuket, Thailand.'}
          </p>
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            {isItalian
              ? 'Per gli utenti dell\'Unione Europea: questo non pregiudica i tuoi diritti come consumatore ai sensi delle leggi del tuo paese di residenza.'
              : 'For European Union users: this does not affect your rights as a consumer under the laws of your country of residence.'}
          </p>
        </section>

        {/* Section 17 - Dispute Resolution */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '17. Risoluzione delle Controversie' : '17. Dispute Resolution'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Prima di intraprendere qualsiasi azione legale, ti invitiamo a contattarci per cercare di risolvere la controversia in modo amichevole.'
              : 'Before taking any legal action, we encourage you to contact us to try to resolve the dispute amicably.'}
          </p>
          <p>
            {isItalian
              ? 'Puoi contattarci all\'indirizzo info@leader24.ai. Ci impegniamo a rispondere entro 15 giorni lavorativi.'
              : 'You can contact us at info@leader24.ai. We commit to responding within 15 business days.'}
          </p>
        </section>

        {/* Section 18 - Miscellaneous */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '18. Disposizioni Generali' : '18. Miscellaneous'}
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>{isItalian ? 'Intero Accordo:' : 'Entire Agreement:'}</strong>{' '}
              {isItalian
                ? 'Questi Termini costituiscono l\'intero accordo tra te e noi riguardo al Servizio.'
                : 'These Terms constitute the entire agreement between you and us regarding the Service.'}
            </li>
            <li>
              <strong>{isItalian ? 'Separabilità:' : 'Severability:'}</strong>{' '}
              {isItalian
                ? 'Se una disposizione risulta non valida, le altre disposizioni rimarranno in vigore.'
                : 'If any provision is found invalid, the other provisions will remain in effect.'}
            </li>
            <li>
              <strong>{isItalian ? 'Rinuncia:' : 'Waiver:'}</strong>{' '}
              {isItalian
                ? 'Il mancato esercizio di un diritto non costituisce rinuncia a tale diritto.'
                : 'Failure to exercise a right does not constitute a waiver of that right.'}
            </li>
            <li>
              <strong>{isItalian ? 'Cessione:' : 'Assignment:'}</strong>{' '}
              {isItalian
                ? 'Non puoi cedere i tuoi diritti senza il nostro consenso scritto. Noi possiamo cedere i nostri diritti a un successore.'
                : 'You may not assign your rights without our written consent. We may assign our rights to a successor.'}
            </li>
            <li>
              <strong>{isItalian ? 'Forza Maggiore:' : 'Force Majeure:'}</strong>{' '}
              {isItalian
                ? 'Non saremo responsabili per ritardi o mancate prestazioni dovuti a cause al di fuori del nostro ragionevole controllo.'
                : 'We will not be liable for delays or failures due to causes beyond our reasonable control.'}
            </li>
          </ul>
        </section>

        {/* Section 19 - Contact */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {isItalian ? '19. Contatti' : '19. Contact Us'}
          </h2>
          <p className="mb-4">
            {isItalian
              ? 'Per qualsiasi domanda sui presenti Termini di Servizio, puoi contattarci:'
              : 'For any questions about these Terms of Service, you can contact us:'}
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

export default TermsOfServicePage
