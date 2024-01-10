const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".get");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".To select");
const msg = document.querySelector(".msg");

for(let select of dropdown) {
    for(let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        } else if(select.name === "To" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
}

const getExchanegeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }
    
    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
   const response = await fetch(URL);
   let data = await response.json();
   let rate = data[toCurrency.value.toLowerCase()];
   let final = amountVal * rate;
   msg.innerText =`${amountVal} ${fromCurrency.value} = ${final} ${toCurrency.value}`;

}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    getExchanegeRate();
});

window.addEventListener("load",() => {
    getExchanegeRate();
})

