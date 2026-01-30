'use client'

import { useEffect } from 'react'
import * as CookieConsent from 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'

export default function CookieConsentBanner({ locale }: { locale: string }) {
  useEffect(() => {
    CookieConsent.run({
      autoShow: true,
      mode: 'opt-in',
      hideFromBots: true,

      cookie: {
        name: 'cc_cookie',
        path: '/',
        expiresAfterDays: 365,
        sameSite: 'Lax',
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          enabled: false,
          readOnly: false,
        },
        marketing: {
          enabled: false,
          readOnly: false,
        },
      },

      guiOptions: {
        consentModal: {
          layout: 'box',
          position: 'bottom right',
          equalWeightButtons: false,
          flipButtons: false,
        },
        preferencesModal: {
          layout: 'box',
          equalWeightButtons: false,
          flipButtons: false,
        },
      },

      language: {
        default: locale,
        translations: {
          it: {
            consentModal: {
              title: 'Utilizziamo i cookie',
              description: 'Utilizziamo i cookie per garantire le funzionalità di base del sito e per migliorare la tua esperienza online. Puoi scegliere per ogni categoria se accettare o rifiutare i cookie. Per maggiori dettagli leggi la nostra <a href="/it/privacy-policy">Privacy Policy</a> e la <a href="/it/cookie-policy">Cookie Policy</a>.',
              acceptAllBtn: 'Accetta tutto',
              acceptNecessaryBtn: 'Rifiuta tutto',
              showPreferencesBtn: 'Gestisci preferenze',
            },
            preferencesModal: {
              title: 'Preferenze Cookie',
              acceptAllBtn: 'Accetta tutto',
              acceptNecessaryBtn: 'Rifiuta tutto',
              savePreferencesBtn: 'Salva preferenze',
              closeIconLabel: 'Chiudi',
              sections: [
                {
                  title: 'Utilizzo dei Cookie',
                  description: 'Utilizziamo i cookie per garantire le funzionalità di base del sito e per migliorare la tua esperienza online. Puoi scegliere per ogni categoria se accettare o rifiutare i cookie quando vuoi. Per maggiori dettagli leggi la nostra <a href="/it/privacy-policy">Privacy Policy</a> e la <a href="/it/cookie-policy">Cookie Policy</a>.',
                },
                {
                  title: 'Cookie Strettamente Necessari',
                  description: 'Questi cookie sono essenziali per il corretto funzionamento del sito web. Senza questi cookie il sito non potrebbe funzionare correttamente.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Cookie Analitici',
                  description: 'Questi cookie ci permettono di capire come i visitatori interagiscono con il sito, raccogliendo informazioni in forma anonima. Ci aiutano a migliorare continuamente il sito.',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'Cookie di Marketing',
                  description: 'Questi cookie vengono utilizzati per mostrarti annunci pertinenti in base ai tuoi interessi. Vengono anche utilizzati per limitare il numero di volte che vedi un annuncio e per misurare l\'efficacia delle campagne pubblicitarie.',
                  linkedCategory: 'marketing',
                },
              ],
            },
          },
          en: {
            consentModal: {
              title: 'We use cookies',
              description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in or opt-out. For more details, read our <a href="/en/privacy-policy">Privacy Policy</a> and <a href="/en/cookie-policy">Cookie Policy</a>.',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              showPreferencesBtn: 'Manage preferences',
            },
            preferencesModal: {
              title: 'Cookie Preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Save preferences',
              closeIconLabel: 'Close',
              sections: [
                {
                  title: 'Cookie Usage',
                  description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in or opt-out whenever you want. For more details, read our <a href="/en/privacy-policy">Privacy Policy</a> and <a href="/en/cookie-policy">Cookie Policy</a>.',
                },
                {
                  title: 'Strictly Necessary Cookies',
                  description: 'These cookies are essential for the proper functioning of the website. Without these cookies, the website would not work properly.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Analytics Cookies',
                  description: 'These cookies allow us to understand how visitors interact with the website by collecting information anonymously. They help us continuously improve the site.',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'Marketing Cookies',
                  description: 'These cookies are used to show you relevant ads based on your interests. They are also used to limit the number of times you see an ad and to measure the effectiveness of advertising campaigns.',
                  linkedCategory: 'marketing',
                },
              ],
            },
          },
          es: {
            consentModal: {
              title: 'Utilizamos cookies',
              description: 'Utilizamos cookies para garantizar las funcionalidades básicas del sitio web y mejorar tu experiencia en línea. Puedes elegir para cada categoría si aceptar o rechazar las cookies. Para más detalles, lee nuestra <a href="/es/privacy-policy">Política de Privacidad</a> y la <a href="/es/cookie-policy">Política de Cookies</a>.',
              acceptAllBtn: 'Aceptar todo',
              acceptNecessaryBtn: 'Rechazar todo',
              showPreferencesBtn: 'Gestionar preferencias',
            },
            preferencesModal: {
              title: 'Preferencias de Cookies',
              acceptAllBtn: 'Aceptar todo',
              acceptNecessaryBtn: 'Rechazar todo',
              savePreferencesBtn: 'Guardar preferencias',
              closeIconLabel: 'Cerrar',
              sections: [
                {
                  title: 'Uso de Cookies',
                  description: 'Utilizamos cookies para garantizar las funcionalidades básicas del sitio web y mejorar tu experiencia en línea. Puedes elegir para cada categoría si aceptar o rechazar las cookies cuando quieras. Para más detalles, lee nuestra <a href="/es/privacy-policy">Política de Privacidad</a> y la <a href="/es/cookie-policy">Política de Cookies</a>.',
                },
                {
                  title: 'Cookies Estrictamente Necesarias',
                  description: 'Estas cookies son esenciales para el correcto funcionamiento del sitio web. Sin estas cookies, el sitio no podría funcionar correctamente.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Cookies Analíticas',
                  description: 'Estas cookies nos permiten comprender cómo los visitantes interactúan con el sitio web, recopilando información de forma anónima. Nos ayudan a mejorar continuamente el sitio.',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'Cookies de Marketing',
                  description: 'Estas cookies se utilizan para mostrarte anuncios relevantes según tus intereses. También se utilizan para limitar la cantidad de veces que ves un anuncio y para medir la efectividad de las campañas publicitarias.',
                  linkedCategory: 'marketing',
                },
              ],
            },
          },
          fr: {
            consentModal: {
              title: 'Nous utilisons des cookies',
              description: 'Nous utilisons des cookies pour assurer les fonctionnalités de base du site web et améliorer votre expérience en ligne. Vous pouvez choisir pour chaque catégorie d\'accepter ou de refuser les cookies. Pour plus de détails, lisez notre <a href="/fr/privacy-policy">Politique de Confidentialité</a> et notre <a href="/fr/cookie-policy">Politique de Cookies</a>.',
              acceptAllBtn: 'Tout accepter',
              acceptNecessaryBtn: 'Tout refuser',
              showPreferencesBtn: 'Gérer les préférences',
            },
            preferencesModal: {
              title: 'Préférences de Cookies',
              acceptAllBtn: 'Tout accepter',
              acceptNecessaryBtn: 'Tout refuser',
              savePreferencesBtn: 'Enregistrer les préférences',
              closeIconLabel: 'Fermer',
              sections: [
                {
                  title: 'Utilisation des Cookies',
                  description: 'Nous utilisons des cookies pour assurer les fonctionnalités de base du site web et améliorer votre expérience en ligne. Vous pouvez choisir pour chaque catégorie d\'accepter ou de refuser les cookies quand vous le souhaitez. Pour plus de détails, lisez notre <a href="/fr/privacy-policy">Politique de Confidentialité</a> et notre <a href="/fr/cookie-policy">Politique de Cookies</a>.',
                },
                {
                  title: 'Cookies Strictement Nécessaires',
                  description: 'Ces cookies sont essentiels au bon fonctionnement du site web. Sans ces cookies, le site ne pourrait pas fonctionner correctement.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Cookies Analytiques',
                  description: 'Ces cookies nous permettent de comprendre comment les visiteurs interagissent avec le site web en collectant des informations de manière anonyme. Ils nous aident à améliorer continuellement le site.',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'Cookies Marketing',
                  description: 'Ces cookies sont utilisés pour vous montrer des publicités pertinentes en fonction de vos intérêts. Ils sont également utilisés pour limiter le nombre de fois que vous voyez une publicité et pour mesurer l\'efficacité des campagnes publicitaires.',
                  linkedCategory: 'marketing',
                },
              ],
            },
          },
          de: {
            consentModal: {
              title: 'Wir verwenden Cookies',
              description: 'Wir verwenden Cookies, um die grundlegenden Funktionen der Website sicherzustellen und Ihr Online-Erlebnis zu verbessern. Sie können für jede Kategorie wählen, ob Sie Cookies akzeptieren oder ablehnen möchten. Weitere Details finden Sie in unserer <a href="/de/privacy-policy">Datenschutzerklärung</a> und <a href="/de/cookie-policy">Cookie-Richtlinie</a>.',
              acceptAllBtn: 'Alle akzeptieren',
              acceptNecessaryBtn: 'Alle ablehnen',
              showPreferencesBtn: 'Einstellungen verwalten',
            },
            preferencesModal: {
              title: 'Cookie-Einstellungen',
              acceptAllBtn: 'Alle akzeptieren',
              acceptNecessaryBtn: 'Alle ablehnen',
              savePreferencesBtn: 'Einstellungen speichern',
              closeIconLabel: 'Schließen',
              sections: [
                {
                  title: 'Cookie-Nutzung',
                  description: 'Wir verwenden Cookies, um die grundlegenden Funktionen der Website sicherzustellen und Ihr Online-Erlebnis zu verbessern. Sie können für jede Kategorie jederzeit wählen, ob Sie Cookies akzeptieren oder ablehnen möchten. Weitere Details finden Sie in unserer <a href="/de/privacy-policy">Datenschutzerklärung</a> und <a href="/de/cookie-policy">Cookie-Richtlinie</a>.',
                },
                {
                  title: 'Unbedingt Erforderliche Cookies',
                  description: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Ohne diese Cookies könnte die Website nicht richtig funktionieren.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Analytische Cookies',
                  description: 'Diese Cookies ermöglichen es uns zu verstehen, wie Besucher mit der Website interagieren, indem sie Informationen anonym sammeln. Sie helfen uns, die Website kontinuierlich zu verbessern.',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'Marketing-Cookies',
                  description: 'Diese Cookies werden verwendet, um Ihnen relevante Werbung basierend auf Ihren Interessen zu zeigen. Sie werden auch verwendet, um die Häufigkeit einer Anzeige zu begrenzen und die Wirksamkeit von Werbekampagnen zu messen.',
                  linkedCategory: 'marketing',
                },
              ],
            },
          },
        },
      },
    })
  }, [locale])

  useEffect(() => {
    CookieConsent.setLanguage(locale)
  }, [locale])

  return null
}
