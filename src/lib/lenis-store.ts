import type Lenis from 'lenis'

/**
 * Module-level handle on the live Lenis instance.
 *
 * The mobile menu has to stop smooth scrolling while it is open, and it is not
 * a descendant of the provider's render tree in a way that makes context
 * convenient. A single mutable handle is simpler than threading a context
 * through the whole chrome, and there is only ever one instance.
 */
let instance: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  instance = l
}
export const getLenis = () => instance
