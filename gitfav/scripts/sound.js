export function Sound() {
  const star = new Audio('https://github.com/lfoalves/sounds/blob/master/sounds-effects/stars/brights-stars.mp3?raw=true');
  const exclude = new Audio('https://github.com/lfoalves/sounds/blob/master/motion-pack-01/31%20-%20Interface.mp3?raw=true')
  const error = new Audio('https://github.com/lfoalves/sounds/blob/master/motion-pack-01/04%20-%20Pop.mp3?raw=true')
  return { star, exclude, error }
}