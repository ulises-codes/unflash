export const stopVideos = () => {
  (
    document.querySelectorAll(
      'video[autoplay=true]'
    ) as NodeListOf<HTMLVideoElement>
  ).forEach(vid => {
    vid.pause();
  });
};
