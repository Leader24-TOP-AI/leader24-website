// DeepL Translation Service
// Uses Supabase Edge Function as proxy to avoid CORS issues

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const translateText = async (text: string, targetLang = 'EN'): Promise<string> => {
    if (!text || !text.trim()) {
        return ''
    }

    if (!SUPABASE_URL) {
        console.warn('Supabase URL not configured')
        return text
    }

    try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
                text: text,
                targetLang: targetLang,
                sourceLang: 'IT'
            }),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.error || `API error: ${response.status}`)
        }

        const data = await response.json()
        return data.translations?.[0]?.text || text
    } catch (error) {
        console.error('Translation error:', error)
        return text // Fallback: return original text instead of throwing
    }
}

export const translateMultipleFields = async (fields: Record<string, string>): Promise<Record<string, string>> => {
    // fields = { fieldName: italianText, ... }
    const translations: Record<string, string> = {}

    for (const [field, text] of Object.entries(fields)) {
        if (text && text.trim()) {
            translations[field] = await translateText(text)
        } else {
            translations[field] = ''
        }
    }

    return translations
}

export const translateJsonArray = async (array: string[]): Promise<string[]> => {
    // Translate an array of strings
    if (!Array.isArray(array) || array.length === 0) {
        return []
    }

    const translations = await Promise.all(
        array.map(item => translateText(item))
    )

    return translations
}

/**
 * Traduce solo i campi che sono stati modificati rispetto ai valori originali.
 * Risparmia chiamate API DeepL evitando traduzioni ridondanti.
 *
 * @param currentValues - Valori correnti del form
 * @param originalValues - Valori originali prima dell'edit
 * @param fieldsToCheck - Array di nomi campi italiani da controllare (es. ['title_it', 'description_it'])
 * @returns Oggetto con le traduzioni dei campi modificati (chiavi _en)
 *
 * @example
 * const translations = await translateChangedFields(
 *   editForm,
 *   originalValues,
 *   ['title_it', 'description_it']
 * );
 * // Returns: { title_en: 'translated', description_en: 'translated' } (solo se modificati)
 */
export const translateChangedFields = async (
    currentValues: Record<string, unknown>,
    originalValues: Record<string, unknown>,
    fieldsToCheck: string[]
): Promise<Record<string, string>> => {
    const translations: Record<string, string> = {}

    // Filtra solo i campi che sono cambiati
    const changedFields = fieldsToCheck.filter(field =>
        currentValues[field] !== originalValues[field]
    )

    if (changedFields.length === 0) {
        return translations
    }

    // Traduce in parallelo solo i campi modificati
    const translationPromises = changedFields.map(async (field) => {
        const enField = field.replace('_it', '_en')
        const translatedText = await translateText(currentValues[field] as string)
        return { field: enField, text: translatedText }
    })

    const results = await Promise.all(translationPromises)

    // Costruisce l'oggetto risultato
    results.forEach(({ field, text }) => {
        translations[field] = text
    })

    return translations
}

/**
 * Verifica se un array JSON è stato modificato (confronto profondo)
 *
 * @param current - Array corrente
 * @param original - Array originale
 * @returns true se l'array è stato modificato
 */
export const hasArrayChanged = (current: unknown[], original: unknown[]): boolean => {
    return JSON.stringify(current) !== JSON.stringify(original)
}
