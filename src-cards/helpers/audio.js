/* global Audio */
export default function playUrl(url) {
  const audio = new Audio(url);
  audio.play();
}
