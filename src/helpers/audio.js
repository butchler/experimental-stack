export function playUrl(url) {
  const audio = new Audio(url);
  audio.play();
}
