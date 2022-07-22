import './global.css';

const stopAnim = async (img: HTMLImageElement) => {
  const coverImage = () => {
    const canvas = document.createElement('canvas');

    canvas.style.margin = img.style.margin;

    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d')?.drawImage(img, 0, 0, img.width, img.height);

    canvas.setAttribute('aria-hidden', 'true');
    canvas.setAttribute('role', 'presentation');

    img.replaceWith(canvas);
  };

  if (img.complete) {
    coverImage();
  } else {
    await img.decode();

    coverImage();
  }
};

const stopGifs = () => {
  (
    document.querySelectorAll(
      '[src*=".gif"], [src*="giphy.com"]'
    ) as NodeListOf<HTMLImageElement>
  ).forEach(image => stopAnim(image));
};

const stopBgGifs = () => {
  (document.querySelectorAll('*') as NodeListOf<HTMLElement>).forEach(
    async el => {
      let prop = window
        .getComputedStyle(el, null)
        .getPropertyValue('background-image');

      if (!prop.includes('.gif')) return;

      const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;

      const url = prop.match(srcChecker);

      if (!url || !url[1]) return;

      el.style.visibility = 'hidden !important';

      const img = new Image(el.offsetWidth, el.offsetHeight);
      img.height = el.offsetHeight;

      img.style.visibility = 'hidden';
      await img.decode();

      el.replaceWith(img);

      stopAnim(img);
    }
  );
};

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    stopGifs();

    stopBgGifs();

    const doc = document.querySelector('html');

    if (!!doc) {
      doc.style.setProperty('visibility', 'visible');
    }
  }
});

document.addEventListener('scroll', () => {
  stopGifs();
  stopBgGifs();
});
