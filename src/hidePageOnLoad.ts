document.addEventListener('readystatechange', () => {
  if (document.readyState != 'complete') {
    const doc = document.querySelector('html');

    if (!!doc) {
      doc.style.setProperty('visibility', 'hidden');
    }
  }
});
