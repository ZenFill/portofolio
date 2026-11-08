import { animate, stagger } from 'motion';

export interface GalleryGridController {
  start: () => void;
}

/**
 * Smooth Animated Gallery Grid Background powered by Motion.dev.
 * - Infinite counter-scrolling columns (upward & downward seamless loops)
 * - Staggered entrance reveal when preloader curtains open
 * - Subtle pointer parallax on desktop screens
 */
export function createGalleryGridAnimation(): GalleryGridController {
  const tracks = Array.from(document.querySelectorAll<HTMLElement>('[data-gallery-track]'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-gallery-card]'));
  const parallaxWrap = document.querySelector<HTMLElement>('[data-gallery-parallax]');

  let loopsStarted = false;

  // Start infinite smooth column movement immediately so it's already gliding when curtains part
  const initInfiniteColumnLoops = (): void => {
    if (loopsStarted) return;
    loopsStarted = true;

    tracks.forEach((track, idx) => {
      const direction = track.dataset.direction || (idx % 2 === 0 ? 'up' : 'down');
      const duration = 36 + idx * 4;

      const keyframes =
        direction === 'up'
          ? ['translate3d(0, 0%, 0)', 'translate3d(0, -50%, 0)']
          : ['translate3d(0, -50%, 0)', 'translate3d(0, 0%, 0)'];

      animate(
        track,
        { transform: keyframes },
        {
          duration,
          ease: 'linear',
          repeat: Infinity,
        }
      );
    });
  };

  // Gentle pointer parallax for desktop
  const initPointerParallax = (): void => {
    if (!parallaxWrap || window.matchMedia('(pointer: coarse)').matches) return;

    window.addEventListener(
      'pointermove',
      (e: PointerEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * -18;
        const ny = (e.clientY / window.innerHeight - 0.5) * -14;

        animate(
          parallaxWrap,
          { transform: `translate3d(${nx.toFixed(1)}px, ${ny.toFixed(1)}px, 0)` },
          { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
        );
      },
      { passive: true }
    );
  };

  initInfiniteColumnLoops();
  initPointerParallax();

  const start = (): void => {
    if (cards.length === 0) return;

    animate(
      cards,
      {
        opacity: [0, 1],
        scale: [0.94, 1],
      },
      {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: stagger(0.025),
      }
    );
  };

  return { start };
}
