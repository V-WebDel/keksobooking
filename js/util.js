function getRandomNumber(min, max, digits = 1) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  const randomNumber = Math.random() * (upper - lower) + lower;

  return +randomNumber.toFixed(digits);
}


function getRandomElements(arr) {

  const randomElements = [];
  const cloneArray = arr.slice();

  for (let i = 0; i < getRandomNumber(0, arr.length, 0); i++) {
    const randomIndex = Math.floor(Math.random() * cloneArray.length);
    randomElements.push(cloneArray.splice(randomIndex, 1)[0]);
  }

  return randomElements;
}

export {getRandomNumber, getRandomElements};
