const stopAnim = (img: HTMLImageElement) => {
  const coverImage = () => {
    const canvas = document.createElement('canvas');

    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d')?.drawImage(img, 0, 0, img.width, img.height);

    canvas.setAttribute('aria-hidden', 'true');
    canvas.setAttribute('role', 'presentation');

    canvas.classList.add(...img.classList);

    img.replaceWith(canvas);

    canvas.style.setProperty('position', img.style.position);
    canvas.style.setProperty('margin', img.style.margin);
    canvas.style.setProperty('padding', img.style.padding);

    canvas.style.setProperty('visibility', 'visible');
  };

  try {
    if (img.complete) {
      coverImage();
    } else {
      img.addEventListener('load', coverImage, { once: true });
    }
  } catch (e) {
    console.error("Couldn't replace GIF: ", img);
  }
};

export const stopGifs = () => {
  (
    document.querySelectorAll(
      'img[src*=".gif"], img[src*="giphy.com"], img[src*=".svg"]'
    ) as NodeListOf<HTMLImageElement>
  ).forEach(image => stopAnim(image));
};

export const stopBgGifs = () => {
  (document.querySelectorAll('*') as NodeListOf<HTMLElement>).forEach(el => {
    let prop = window
      .getComputedStyle(el, null)
      .getPropertyValue('background-image');

    if (!prop.includes('.gif') && !prop.includes('.svg')) return;

    const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;

    const url = prop.match(srcChecker);

    if (!url || !url[1]) return;

    el.style.setProperty('visibility', 'hidden');

    const img = new Image(el.offsetWidth, el.offsetHeight);
    img.height = el.offsetHeight;

    img.style.setProperty('visibility', 'hidden');

    el.replaceWith(img);

    stopAnim(img);
  });
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
