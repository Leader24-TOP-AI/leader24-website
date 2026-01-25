'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ComponentProps } from 'react'

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const locale = useLocale()

  // If href is external, don't modify
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return <Link href={href} {...props} />
  }

  // Add locale prefix
  const localizedHref = href === '/' ? `/${locale}` : `/${locale}${href}`

  return <Link href={localizedHref} {...props} />
}
