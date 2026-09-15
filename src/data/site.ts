/**
 * Single source of truth for identity, contact and navigation.
 *
 * NOTE ON THE ROLE AND STATUS LINES: these are deliberately written to be true
 * for a student rather than borrowed from a studio site. The project data in
 * `projects.ts` is fictional demo content; these fields are not, so they stay
 * defensible. Edit them here and they update everywhere.
 */

export const site = {
  name: 'Joeco Tabernilla',
  /** Used for the compact wordmark in the header. */
  wordmark: 'Joeco Tabernilla',
  /** Short role descriptor under the hero. Keep to three segments. */
  role: ['Designer', 'Creative Developer', 'Florida Atlantic University'],
  /** Availability line. Honest for where you actually are. */
  status: 'Open to internships and selected collaborations',
  statement:
    'I build digital identities and interfaces for people and ideas with something to say.',
  email: 'solvuestudios@gmail.com',
  location: 'Boca Raton, Florida',
  timezone: 'ET (UTC−5)',
  socials: [
    { label: 'GitHub', href: 'https://github.com/joecocodes' },
    { label: 'Email', href: 'mailto:solvuestudios@gmail.com' },
  ],
  nav: [
    { label: 'Work', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Archive', href: '/archive' },
    { label: 'Contact', href: '/contact' },
  ],
  capabilities: [
    'Art Direction',
    'Digital Design',
    'Brand Systems',
    'Creative Development',
    'Product Experience',
  ],
  /** Fictional, consistent with the demo project set. */
  collaborators: [
    'Carrière Quarterly',
    'Atelier Sonde',
    'Kōtō Pavilion',
    'North Signal',
    'Museum of Quiet',
    'Low Frequencies',
    'Objet Supply',
    'Hotel Lacuna',
    'Tenth Street Works',
  ],
} as const
