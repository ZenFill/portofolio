export interface GalleryCardItem {
  id: string;
  code: string;
  title: string;
  tag: string;
  aspect: 'tall' | 'square' | 'wide';
  tone: 'ice' | 'sky' | 'cobalt' | 'slate';
  pattern: 'grid' | 'waves' | 'circles' | 'layout';
}

export const GALLERY_COLUMNS: GalleryCardItem[][] = [
  [
    {
      id: 'g-01',
      code: '01',
      title: 'Design System',
      tag: 'UI / UX',
      aspect: 'tall',
      tone: 'ice',
      pattern: 'layout',
    },
    {
      id: 'g-02',
      code: '02',
      title: 'Web Architecture',
      tag: 'Frontend',
      aspect: 'square',
      tone: 'sky',
      pattern: 'grid',
    },
    {
      id: 'g-03',
      code: '03',
      title: 'Interactive Motion',
      tag: 'Animation',
      aspect: 'tall',
      tone: 'slate',
      pattern: 'waves',
    },
    {
      id: 'g-04',
      code: '04',
      title: 'Visual Identity',
      tag: 'Branding',
      aspect: 'square',
      tone: 'cobalt',
      pattern: 'circles',
    },
  ],
  [
    {
      id: 'g-05',
      code: '05',
      title: 'Creative Coding',
      tag: 'WebGL / 2D',
      aspect: 'square',
      tone: 'sky',
      pattern: 'circles',
    },
    {
      id: 'g-06',
      code: '06',
      title: 'Digital Product',
      tag: 'Platform',
      aspect: 'tall',
      tone: 'ice',
      pattern: 'grid',
    },
    {
      id: 'g-07',
      code: '07',
      title: 'Micro Interactions',
      tag: 'Motion.dev',
      aspect: 'square',
      tone: 'cobalt',
      pattern: 'waves',
    },
    {
      id: 'g-08',
      code: '08',
      title: 'Editorial Layout',
      tag: 'Typography',
      aspect: 'tall',
      tone: 'slate',
      pattern: 'layout',
    },
  ],
  [
    {
      id: 'g-09',
      code: '09',
      title: 'Spatial Interface',
      tag: 'Experience',
      aspect: 'tall',
      tone: 'slate',
      pattern: 'waves',
    },
    {
      id: 'g-10',
      code: '10',
      title: 'Component Library',
      tag: 'System',
      aspect: 'square',
      tone: 'ice',
      pattern: 'layout',
    },
    {
      id: 'g-11',
      code: '11',
      title: 'Performance Core',
      tag: 'Astro / TS',
      aspect: 'tall',
      tone: 'sky',
      pattern: 'circles',
    },
    {
      id: 'g-12',
      code: '12',
      title: 'Modern Aesthetics',
      tag: 'Minimal',
      aspect: 'square',
      tone: 'cobalt',
      pattern: 'grid',
    },
  ],
  [
    {
      id: 'g-13',
      code: '13',
      title: 'Fluid Transitions',
      tag: 'Navigation',
      aspect: 'square',
      tone: 'cobalt',
      pattern: 'grid',
    },
    {
      id: 'g-14',
      code: '14',
      title: 'Clean Structure',
      tag: 'Engineering',
      aspect: 'tall',
      tone: 'sky',
      pattern: 'layout',
    },
    {
      id: 'g-15',
      code: '15',
      title: 'Responsive Grid',
      tag: 'Adaptive',
      aspect: 'square',
      tone: 'slate',
      pattern: 'circles',
    },
    {
      id: 'g-16',
      code: '16',
      title: 'Portfolio Showcase',
      tag: 'Archive',
      aspect: 'tall',
      tone: 'ice',
      pattern: 'waves',
    },
  ],
];
