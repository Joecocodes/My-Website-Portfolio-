'use client'

import { useState } from 'react'

/**
 * Copy-to-clipboard for the contact address.
 *
 * Progressive enhancement: the address itself is always a plain mailto link
 * beside this, so nothing here is load-bearing. The button only renders once we
 * know the Clipboard API exists.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard blocked (permissions, insecure context). The mailto link
      // beside this still works, so fail silently rather than alarm the user.
    }
  }

  return (
    <button type="button" onClick={copy} className="copy-email link-rule t-label t-label-ink">
      {copied ? 'Copied' : 'Copy address'}
      <span aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ''}
      </span>
    </button>
  )
}
