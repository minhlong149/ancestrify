
export const stringToColour = string => {
  const hue = string.split('').reduce((acc, char, i) => {
    acc = (acc << i) - acc + char.charCodeAt(0);
    return acc & acc;
  }, string.length);
  return `hsl(${hue % 360}, 100%, 90%)`;
};
