import { stopBgGifs, stopGifs } from './lib/stopGifs';
import { stopVideos } from './lib/stopVideos';
import './global.css';

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    stopGifs();
    stopBgGifs();
    stopVideos();

    const doc = document.querySelector('html');

    if (!!doc) {
      doc.style.setProperty('visibility', 'visible');
      doc.style.setProperty('opacity', '1');
    }
  }
});

document.addEventListener('scroll', () => {
  stopGifs();
  stopBgGifs();
});
