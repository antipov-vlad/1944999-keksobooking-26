const minPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const formNotice = document.querySelector('.ad-form');
const typeHome = formNotice.querySelector('#type');
const priceNight = formNotice.querySelector('#price');
const slider = formNotice.querySelector('.ad-form__slider');

noUiSlider.create(slider, {
  start: [minPrices[typeHome.value]],
  connect: [true, false],
  range: {
    'min': 0,
    'max': 100000
  }
});

slider.noUiSlider.on('update', (values) => {
  priceNight.value = parseInt(values,10);
});

priceNight.value = '';

priceNight.addEventListener('input', () => {
  slider.noUiSlider.set(priceNight.value);
  if (priceNight.value === '0') {
    priceNight.value = '';
  }
});


typeHome.addEventListener('change', () => {
  priceNight.placeholder = minPrices[typeHome.value];
});

const validatePriceNight = (value) => {
  if (!value || Number(value) === 0) {
    return false;
  }

  if (value > 100000) {
    return false;
  }

  if (value < minPrices[typeHome.value]) {
    return false;
  }

  return true;
};

const getErrorMessagePriceNight = (value) => {
  if (!value || Number(value) === 0) {
    return 'Обязательное поле';
  }

  if (value > 100000) {
    return 'Максимальное значение - 100 000';
  }

  if (value < minPrices[typeHome.value]) {
    return `Минимальная цена за ночь ${minPrices[typeHome.value]}`;
  }
};

export {priceNight,validatePriceNight,getErrorMessagePriceNight,slider};
