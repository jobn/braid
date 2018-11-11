// copied from https://github.com/yixizhang/seed-shuffle and only slightly changed

const random = seed => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const arrayShuffle = (origArray, origSeed) => {
  let seed = origSeed || 1;
  let array = origArray.slice();
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    seed++;
    randomIndex = Math.floor(random(seed) * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export default arrayShuffle;
