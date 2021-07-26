
const fromCountry = document.querySelector('#fromCountry');
const toCountry = document.querySelector('#toCountry');
const fromCurrency = document.querySelector('#fromCurrency');
const toCurrency = document.querySelector('#toCurrency');
const unitChanging = document.querySelector('#unitChangeInfo');
const fetchCountryURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
const fetchCurURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
let fromCountryCode = "";
let toCountryCode = "";
let exchangeRatio = 0;

(async () => {
  try{
    let res = await fetch(fetchCountryURL);
    let data = await res.json();
    for (let key in data) {
      let option = document.createElement('option');
      option.value = key;
      option.innerText = data[key];
      let clonedOption = option.cloneNode(true);
      fromCountry.appendChild(option);
      toCountry.appendChild(clonedOption);
    }
  }
  catch(error){
    document.querySelector('#msg-container').classList.add('error','justify-content-center','d-flex','mx-auto');
    unitChanging.innerHTML = '<p class="toCurInfo">Data not found ERROR:404</p>';
    console.log('error: Unable to fetch');
  }
  finally{
    document.querySelector('.loader-wrapper').style.display = 'none';
  }
})()

function onCountryChange(e) {
  let event = e.target;
  if (event.id == 'fromCountry') {
    fromCountryCode = event.value;
    if (toCountry.value != 'none') {
      fromCurrency.value = '1';
      conversion();
      fromCurrency.disabled = false;
      toCurrency.disabled = false;
    }
  }
  else if (event.id == 'toCountry') {
    toCountryCode = event.value;
    if (fromCountry.value != 'none') {
      fromCurrency.value = '1';
      conversion();
      fromCurrency.disabled = false;
      toCurrency.disabled = false;
    }
  }
};

function getConversionValue(e) {
  let event = e.target;
  if (event.id == 'fromCurrency' && toCurrency.value != '') {
    toCurrency.value = exchangeRatio * fromCurrency.value;
  }
  else if (event.id == 'toCurrency' && toCurrency.value != '') {
    fromCurrency.value = 1/exchangeRatio * toCurrency.value;
  }
  else {
    fromCurrency.value = '';
    toCurrency.value = '';
  }
};

async function conversion() {
  try{
    document.querySelector('.loader-wrapper').style.display = 'flex';
    let res = await fetch(fetchCurURL + fromCountryCode + "/" + toCountryCode + ".json");
    let data = await res.json();
    exchangeRatio = data[toCountryCode]
    toCurrency.value = data[toCountryCode];
    unitChanging.innerHTML = '<p class="fromCurInfo text-center">1 ' + fromCountry.selectedOptions[0].innerText + ' equals </p><p class="toCurInfo text-center">' + data[toCountryCode] + ' ' + toCountry.selectedOptions[0].innerText + '</p>';  
  }
    catch(error){
      document.querySelector('#msg-container').classList.add('error','justify-content-center','d-flex','mx-auto');
      unitChanging.innerHTML = '<p class="toCurInfo">Data not found ERROR:404</p>';
      toCurrency.disabled = true;
      console.log('error: Unable to fetch');
    }
    finally{
    document.querySelector('.loader-wrapper').style.display = 'none';
    }

}






