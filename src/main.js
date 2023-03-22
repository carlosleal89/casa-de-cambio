import './style.css';
import Swal from 'sweetalert2';

const baseUrl = 'https://api.exchangerate.host/latest?base=';
const inputCoinEl = document.querySelector('#input-coin');
const searchBtnEl = document.querySelector('#search-btn');
const coinsListEl = document.querySelector('#list-coins');
const referenceTextEl = document.querySelector('#reference-text');

function displayCoinsCurrency(coinArray) {
  coinsListEl.innerHTML = '';
  coinArray.forEach((element) => {
    const [coin, value] = element;
    const coinListItem = document.createElement('li');
    coinListItem.innerHTML = `${coin}: ${value.toFixed(2)}`;
    coinListItem.className = 'coin-list-item';
    coinsListEl.appendChild(coinListItem);
  });
}

function mainCoinsHandler(coinArray) {
  const mainCoins = [
    'BRL', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CHF', 'CAD', 'CNY', 'ARS', 'UYU'];
  const selectedCoins = coinArray.filter((coin) => mainCoins.includes(coin[0]));
  console.log(coinArray);
  console.log(selectedCoins);
  displayCoinsCurrency(selectedCoins);
}

function handlerError(value, data) {
  if (value === '') {
    throw new Error('Digite uma moeda');
  }
  if (value.toUpperCase() !== data) {
    throw new Error('Moeda inválida');
  }
}

function handlerExchangeCurrency() {
  const inputCoinValue = inputCoinEl.value;
  fetch(`${baseUrl}${inputCoinValue}`)
    .then((response) => response.json())
    .then((data) => {
      handlerError(inputCoinValue, data.base);
      const coinCurrency = Object.entries(data.rates);
      referenceTextEl.innerHTML = `Valores referentes a 1 
      ${data.base} no dia ${data.date}`;
      mainCoinsHandler(coinCurrency);
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    });
}

searchBtnEl.addEventListener('click', handlerExchangeCurrency);
