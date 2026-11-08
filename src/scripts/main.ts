import { createGalleryGridAnimation } from './animations/galleryGridAnimation';
import { createPreloaderAnimation } from './animations/preloaderAnimation';
import { createTextRollAnimation } from './animations/textRollAnimation';

function initApp(): void {
  const galleryGrid = createGalleryGridAnimation();
  const textRoll = createTextRollAnimation();

  const preloader = createPreloaderAnimation({
    onRevealStart: () => {
      galleryGrid.start();
      textRoll.playEntrance();
    },
  });

  preloader.play();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
