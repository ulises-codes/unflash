const stopAnim = (img: HTMLImageElement) => {
  const coverImage = () => {
    const width = img.width;
    const height = img.height;
    const canvas = document.createElement('canvas');

    canvas.style.margin = img.style.margin;

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);

    canvas.setAttribute('aria-hidden', 'true');
    canvas.setAttribute('role', 'presentation');

    const parent = img.parentElement;

    if (!!parent) {
      parent.style.position = 'relative';
      parent.style.display = 'block';
      parent.insertBefore(canvas, img);
    }

    img.remove();
  };

  if (img.complete) {
    coverImage();
  } else {
    img.addEventListener('load', coverImage, true);
  }
};

const stopGifs = () => {
  const images = document.querySelectorAll(
    '[src*=".gif"]'
  ) as NodeListOf<HTMLImageElement>;

  const giphys = document.querySelectorAll(
    '[src*="giphy.com"]'
  ) as NodeListOf<HTMLImageElement>;

  if (images.length === 0 && giphys.length === 0) return;

  Array.from(images)
    .concat(Array.from(giphys))
    .forEach(image => stopAnim(image));
};

const getBgImgs = () => {
  // const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;

  (document.querySelectorAll('*') as NodeListOf<HTMLElement>).forEach(el => {
    let prop = window
      .getComputedStyle(el, null)
      .getPropertyValue('background-image');

    if (prop.includes('.gif')) {
      el.style.background = '';
    }
  });
};

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    stopGifs();

    getBgImgs();
  }
});

document.addEventListener('scroll', e => stopGifs());
