import gsap from 'gsap';
import { animate } from 'motion';

export interface PreloaderOptions {
  onRevealStart?: () => void;
  onComplete?: () => void;
}

export interface PreloaderController {
  play: () => void;
}

/**
 * Calm, Smooth Preloader Controller:
 * - Slow floating & softly blinking background dev stack logos
 * - Long connector line between "WELCOME TO" and "MY WEBSITE" (joined -> far apart -> joined)
 * - Bottom-center percentage counter (100% -> 0% -> 100%) synchronized 1:1 with the line
 * - Top & Bottom Curtain Split revealing the Coming Soon screen
 */
export function createPreloaderAnimation(options: PreloaderOptions = {}): PreloaderController {
  const preloaderEl = document.querySelector<HTMLElement>('[data-preloader]');
  const stageEl = document.querySelector<HTMLElement>('[data-preloader-stage]');
  const curtainTop = document.querySelector<HTMLElement>('[data-curtain-top]');
  const curtainBottom = document.querySelector<HTMLElement>('[data-curtain-bottom]');

  const connectorBridge = document.querySelector<HTMLElement>('[data-connector-bridge]');
  const counterEl = document.querySelector<HTMLElement>('[data-preloader-counter]');
  const lockupEl = document.querySelector<HTMLElement>('[data-preloader-lockup]');
  const counterWrapEl = document.querySelector<HTMLElement>('[data-preloader-ui]');

  const logoItems = gsap.utils.toArray<HTMLElement>('[data-dev-logo]');
  let backgroundTweens: gsap.core.Tween[] = [];

  /**
   * Computes a long, balanced connector line width so the two small phrases stretch far apart
   */
  const getTargetLineLength = (): number => {
    const vw = window.innerWidth;
    if (vw < 640) return Math.min(vw * 0.34, 150);
    if (vw < 1024) return Math.min(vw * 0.44, 360);
    return Math.min(vw * 0.44, 540);
  };

  /**
   * Gentle, slow floating movement and soft blinking for background dev logos
   */
  const startBackgroundLogos = (): void => {
    stopBackgroundLogos();

    logoItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { autoAlpha: 0, scale: 0.85 },
        {
          autoAlpha: gsap.utils.random(0.18, 0.45),
          scale: 1,
          duration: 1.4,
          delay: index * 0.05,
          ease: 'sine.out',
        }
      );

      // Slow, calm spatial floating
      const floatTween = gsap.to(item, {
        x: () => gsap.utils.random(-55, 55),
        y: () => gsap.utils.random(-45, 45),
        duration: gsap.utils.random(5.5, 8.5),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: (index % 6) * 0.25,
      });

      // Soft, eye-friendly blinking / breathing opacity
      const blinkTween = gsap.to(item, {
        opacity: () => gsap.utils.random(0.1, 0.52),
        duration: gsap.utils.random(1.8, 3.4),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: gsap.utils.random(0, 1.8),
      });

      backgroundTweens.push(floatTween, blinkTween);
    });
  };

  const stopBackgroundLogos = (): void => {
    backgroundTweens.forEach((t) => t.kill());
    backgroundTweens = [];
  };

  const updateCounterValue = (value: number): void => {
    const rounded = Math.round(value);
    if (counterEl) {
      counterEl.textContent = String(rounded);
    }
    if (preloaderEl) {
      preloaderEl.setAttribute('aria-valuenow', String(rounded));
    }
  };

  const play = (): void => {
    if (!preloaderEl || !connectorBridge || !curtainTop || !curtainBottom || !stageEl) return;

    const state = { percent: 100 };
    updateCounterValue(100);
    gsap.set(connectorBridge, { width: 0, opacity: 0.35 });

    startBackgroundLogos();

    const maxLineLength = getTargetLineLength();
    const tl = gsap.timeline();

    // Gentle fade-in of center text & bottom-center counter
    tl.fromTo(
      [lockupEl, counterWrapEl],
      { autoAlpha: 0, y: 12 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
      },
      0
    )

      // Phase 1: Joined (100%) -> Moving Far Apart (0%)
      .to(
        connectorBridge,
        {
          width: maxLineLength,
          opacity: 1,
          duration: 2.7,
          ease: 'sine.inOut',
        },
        '+=0.45'
      )
      .to(
        state,
        {
          percent: 0,
          duration: 2.7,
          ease: 'sine.inOut',
          onUpdate: () => updateCounterValue(state.percent),
        },
        '<'
      )

      // Phase 2: Moving Back Together (0% -> 100%)
      .to(
        connectorBridge,
        {
          width: 0,
          opacity: 0.35,
          duration: 2.6,
          ease: 'power2.inOut',
        },
        '+=0.55'
      )
      .to(
        state,
        {
          percent: 100,
          duration: 2.6,
          ease: 'power2.inOut',
          onUpdate: () => updateCounterValue(state.percent),
        },
        '<'
      )

      // Fade out preloader stage before curtain opens
      .to(
        stageEl,
        {
          autoAlpha: 0,
          duration: 0.55,
          ease: 'sine.inOut',
        },
        '+=0.35'
      )

      // Phase 3: Smooth Top & Bottom Curtain Split via Motion.dev
      .add(() => {
        stopBackgroundLogos();
        options.onRevealStart?.();

        animate(
          curtainTop,
          { y: ['0%', '-100%'] },
          { duration: 1.4, ease: [0.76, 0, 0.24, 1] }
        );

        const bottomAnim = animate(
          curtainBottom,
          { y: ['0%', '100%'] },
          { duration: 1.4, ease: [0.76, 0, 0.24, 1] }
        );

        bottomAnim.then(() => {
          preloaderEl.style.display = 'none';
          options.onComplete?.();
        });
      });
  };

  return { play };
}
