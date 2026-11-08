import { animate, stagger } from 'motion';

export interface TextRollController {
  playEntrance: () => void;
  triggerWaveRoll: () => void;
  destroy: () => void;
}

/**
 * Zero-Blink Smooth Text Roll Animation powered by Motion.dev.
 *
 * Each `.roll-char__track` contains two identical stacked glyphs (total height = 200% of `.roll-char`).
 * Rolling from `y: '0%'` to `y: '-50%'` shifts the track by exactly one glyph height (100% of slot),
 * so the clone glyph lands on the exact same pixel and color as the primary glyph — 0% blink!
 */
export function createTextRollAnimation(): TextRollController {
  const titleEl = document.querySelector<HTMLElement>('[data-roll-title]');
  const tracks = Array.from(document.querySelectorAll<HTMLElement>('[data-roll-track]'));

  let intervalId: number | null = null;
  let isRolling = false;

  // Initial hidden state before preloader curtains open
  tracks.forEach((track) => {
    track.style.transform = 'translate3d(0, 55%, 0)';
    track.style.opacity = '0';
  });

  const triggerWaveRoll = (): void => {
    if (isRolling || tracks.length === 0) return;
    isRolling = true;

    // Reset silently to 0% before starting a new roll (0% and -50% are visually identical)
    tracks.forEach((track) => {
      track.style.transform = 'translate3d(0, 0%, 0)';
    });

    const controls = animate(
      tracks,
      { transform: ['translate3d(0, 0%, 0)', 'translate3d(0, -50%, 0)'] },
      {
        duration: 1.05,
        ease: [0.65, 0, 0.35, 1],
        delay: stagger(0.048),
      }
    );

    controls.then(() => {
      isRolling = false;
    });
  };

  const startGentleLoop = (): void => {
    if (intervalId !== null) window.clearInterval(intervalId);
    intervalId = window.setInterval(() => {
      triggerWaveRoll();
    }, 4500);
  };

  const playEntrance = (): void => {
    if (tracks.length === 0) return;
    isRolling = true;

    const controls = animate(
      tracks,
      {
        transform: ['translate3d(0, 55%, 0)', 'translate3d(0, 0%, 0)'],
        opacity: [0, 1],
      },
      {
        duration: 1.25,
        ease: [0.22, 1, 0.36, 1],
        delay: stagger(0.052),
      }
    );

    controls.then(() => {
      isRolling = false;
      startGentleLoop();
    });
  };

  const handleMouseEnter = (): void => {
    triggerWaveRoll();
  };

  if (titleEl) {
    titleEl.addEventListener('mouseenter', handleMouseEnter);
  }

  const destroy = (): void => {
    if (intervalId !== null) window.clearInterval(intervalId);
    if (titleEl) {
      titleEl.removeEventListener('mouseenter', handleMouseEnter);
    }
  };

  return {
    playEntrance,
    triggerWaveRoll,
    destroy,
  };
}
