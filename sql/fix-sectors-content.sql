-- =============================================
-- CORREZIONI SETTORI - Leader24 Website
-- =============================================
-- Dashboard: https://supabase.com/dashboard/project/dtxieqrlqzpygzlleble/sql/new
-- Data: 2026-01-24
-- Problema: Statistiche inventate, testimonial falsi, features inesistenti
-- =============================================

-- 1. E-COMMERCE (CRITICO - Rimuove features false: carrelli, upselling)
UPDATE sectors SET
  hero_subtitle_it = 'Rispondi alle domande dei clienti 24/7 su prodotti, spedizioni e disponibilità con il tuo assistente AI su WhatsApp.',
  hero_subtitle_en = 'Answer customer questions 24/7 about products, shipping, and availability with your WhatsApp AI assistant.',
  usecases_it = '[
    {"icon": "MessageSquare", "title": "Supporto Clienti 24/7", "description": "Rispondi istantaneamente a domande su prodotti, taglie, disponibilità, spedizioni e resi a qualsiasi ora."},
    {"icon": "ShoppingBag", "title": "Informazioni Prodotti", "description": "L''agente AI accede al tuo catalogo WooCommerce e fornisce dettagli precisi su prezzi, varianti e disponibilità."},
    {"icon": "UserCheck", "title": "Qualificazione Clienti", "description": "Raccogli informazioni sui clienti interessati e genera lead qualificati pronti per il follow-up."}
  ]'::jsonb,
  usecases_en = '[
    {"icon": "MessageSquare", "title": "24/7 Customer Support", "description": "Instantly answer questions about products, sizes, availability, shipping, and returns at any time."},
    {"icon": "ShoppingBag", "title": "Product Information", "description": "The AI agent accesses your WooCommerce catalog and provides accurate details on prices, variants, and availability."},
    {"icon": "UserCheck", "title": "Customer Qualification", "description": "Collect information from interested customers and generate qualified leads ready for follow-up."}
  ]'::jsonb,
  social_proof_stat_value = '24/7',
  social_proof_stat_suffix = '',
  social_proof_stat_label_it = 'Disponibilità supporto',
  social_proof_stat_label_en = 'Support availability',
  testimonial_quote_it = 'I clienti ricevono risposte immediate su prodotti e spedizioni. L''integrazione con WooCommerce ci permette di fornire informazioni sempre aggiornate.',
  testimonial_quote_en = 'Customers receive immediate answers about products and shipping. WooCommerce integration allows us to provide always up-to-date information.',
  testimonial_author = 'Responsabile E-commerce',
  testimonial_company = 'Negozio Online',
  testimonial_image_url = NULL
WHERE slug = 'ecommerce';

-- 2. IMMOBILIARE
UPDATE sectors SET
  social_proof_stat_value = '24/7',
  social_proof_stat_suffix = '',
  social_proof_stat_label_it = 'Risposte disponibili',
  social_proof_stat_label_en = 'Responses available',
  testimonial_quote_it = 'L''agente AI pre-qualifica i potenziali acquirenti raccogliendo budget, preferenze e tempistiche. Possiamo concentrarci sui contatti più interessanti.',
  testimonial_quote_en = 'The AI agent pre-qualifies potential buyers by collecting budget, preferences, and timelines. We can focus on the most promising contacts.',
  testimonial_author = 'Titolare Agenzia',
  testimonial_company = 'Agenzia Immobiliare',
  testimonial_image_url = NULL
WHERE slug = 'immobiliare';

-- 3. AUTOMOTIVE (Rimuove follow-up WhatsApp automatico che non esiste)
UPDATE sectors SET
  usecases_it = '[
    {"icon": "Car", "title": "Info Veicoli 24/7", "description": "Rispondi istantaneamente a domande su specifiche, prezzi, disponibilità e finanziamenti di ogni veicolo in stock."},
    {"icon": "Calendar", "title": "Prenotazione Test Drive", "description": "Permetti ai clienti di prenotare test drive direttamente su WhatsApp, con integrazione Google Calendar."},
    {"icon": "UserCheck", "title": "Qualificazione Lead", "description": "Raccogli informazioni su budget, preferenze e tempistiche per identificare i clienti più interessati."}
  ]'::jsonb,
  usecases_en = '[
    {"icon": "Car", "title": "24/7 Vehicle Info", "description": "Instantly answer questions about specs, prices, availability, and financing for every vehicle in stock."},
    {"icon": "Calendar", "title": "Test Drive Booking", "description": "Let customers book test drives directly on WhatsApp, with Google Calendar integration."},
    {"icon": "UserCheck", "title": "Lead Qualification", "description": "Collect information about budget, preferences, and timeline to identify the most interested customers."}
  ]'::jsonb,
  social_proof_stat_value = '24/7',
  social_proof_stat_suffix = '',
  social_proof_stat_label_it = 'Disponibilità informazioni',
  social_proof_stat_label_en = 'Information availability',
  testimonial_quote_it = 'I clienti possono chiedere informazioni sui veicoli e prenotare test drive a qualsiasi ora. Riceviamo richieste anche di notte e nei weekend.',
  testimonial_quote_en = 'Customers can ask about vehicles and book test drives at any time. We receive inquiries even at night and on weekends.',
  testimonial_author = 'Responsabile Vendite',
  testimonial_company = 'Concessionaria Auto',
  testimonial_image_url = NULL
WHERE slug = 'automotive';

-- 4. TURISMO
UPDATE sectors SET
  social_proof_stat_value = '24/7',
  social_proof_stat_suffix = '',
  social_proof_stat_label_it = 'Assistenza ospiti',
  social_proof_stat_label_en = 'Guest assistance',
  testimonial_quote_it = 'Gli ospiti apprezzano poter chiedere informazioni su WhatsApp in qualsiasi momento. Ricevono risposte immediate su orari, servizi e consigli locali.',
  testimonial_quote_en = 'Guests appreciate being able to ask questions on WhatsApp at any time. They receive immediate answers about hours, services, and local tips.',
  testimonial_author = 'Responsabile Struttura',
  testimonial_company = 'Struttura Ricettiva',
  testimonial_image_url = NULL
WHERE slug = 'turismo';

-- 5. FINANZA
UPDATE sectors SET
  social_proof_stat_value = '24/7',
  social_proof_stat_suffix = '',
  social_proof_stat_label_it = 'Pre-qualificazione lead',
  social_proof_stat_label_en = 'Lead pre-qualification',
  testimonial_quote_it = 'L''agente AI raccoglie informazioni sui potenziali clienti prima che li contatti. Posso dedicare il mio tempo a chi è realmente interessato.',
  testimonial_quote_en = 'The AI agent collects information about potential clients before I contact them. I can dedicate my time to those who are truly interested.',
  testimonial_author = 'Consulente Finanziario',
  testimonial_company = 'Studio di Consulenza',
  testimonial_image_url = NULL
WHERE slug = 'finanza';

-- 6. PROFESSIONISTI
UPDATE sectors SET
  social_proof_stat_value = '24/7',
  social_proof_stat_suffix = '',
  social_proof_stat_label_it = 'Risposte automatiche',
  social_proof_stat_label_en = 'Automatic responses',
  testimonial_quote_it = 'I clienti possono chiedere informazioni su servizi e disponibilità a qualsiasi ora. L''agente risponde alle domande frequenti e raccoglie richieste.',
  testimonial_quote_en = 'Clients can ask about services and availability at any time. The agent answers FAQs and collects requests.',
  testimonial_author = 'Titolare Studio',
  testimonial_company = 'Studio Professionale',
  testimonial_image_url = NULL
WHERE slug = 'professionisti';

-- =============================================
-- VERIFICA RISULTATI
-- =============================================
SELECT
  slug,
  social_proof_stat_value as stat,
  testimonial_author as author,
  testimonial_company as company
FROM sectors
WHERE is_active = true
ORDER BY display_order;
