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

const showErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '12px 4px';
  alertContainer.style.fontSize = '24px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 10000);
};

export {getRandomNumber, getRandomElements, showErrorMessage};
