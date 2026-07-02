let myPieChart = null;
function calculate() {
  const inputData = document.querySelectorAll(".inputs input");
  let count = 0;
  inputData.forEach((data) => {
    if (data.value) {
      count++;
    }
  });
  if (count === 4) {
    const capital = Number(inputData[0].value);
    const risk = Number(inputData[1].value);
    const entry = Number(inputData[2].value);
    const stoploss = Number(inputData[3].value);

    const riskAmount = (capital / 100) * risk;
    const priceDiff = entry < stoploss ? stoploss - entry : entry - stoploss;
    const lotSize = Math.trunc(riskAmount / priceDiff);
    const capitalRequired = lotSize * entry;

    document.querySelector("#risk").innerHTML =
      `Risk: ${risk}% ~${riskAmount}₹`;
    document.querySelector("#lot-size").innerHTML = `Lot Size: ${lotSize}`;

    const capitalElement = document.querySelector("#capital");
    if (capitalRequired > capital) {
      capitalElement.style.color = "orange";
      capitalElement.innerHTML = `Capital: ${capitalRequired}₹`;
    } else {
      capitalElement.style.color = "black";
      capitalElement.innerHTML = `Capital: ${Math.trunc(capitalRequired)}₹`;
    }

    if (myPieChart) {
      myPieChart.destroy();
    }

    const ctx = document.querySelector(".pie-chart");
    myPieChart = new Chart(ctx, {
      // Assign to myPieChart variable
      type: "pie",
      data: {
        labels: ["Risk", "Capital", "Postion size"],
        datasets: [
          {
            data: [riskAmount, capitalRequired, lotSize],
            backgroundColor: ["#ff6384", "#36eb4e", "#56f9ff"],
            borderWidth: 1,
          },
        ],
      },
    });
  }
}

document
  .getElementById("account-size-input")
  .addEventListener("input", calculate);
document.getElementById("risk-input").addEventListener("input", calculate);
document.getElementById("entry-input").addEventListener("input", calculate);
document.getElementById("sl-input").addEventListener("input", calculate);

// createCards
let isCreated = false;
let coinDiv;
let coinName;
let coinPrice;
function createCards(data) {
  if (isCreated) {
    const allDiv = document.querySelectorAll(".coin-card-container div");
    allDiv.forEach((card) => {
      card.remove();
    });
    isCreated = false;
  }
  if (!isCreated) {
    for (let [key, value] of Object.entries(data)) {
      coinDiv = document.createElement("div");

      coinName = document.createElement("h4");
      coinName.id = "coin-name";
      coinName.innerText = key.toUpperCase();
      coinDiv.appendChild(coinName);

      coinPrice = document.createElement("p");
      coinPrice.id = "coin-price";
      coinPrice.innerText = `$ ${value.usd}`;
      coinDiv.appendChild(coinPrice);

      document.querySelector(".coin-card-container").appendChild(coinDiv);
      isCreated = true;
    }
  }
}

// live prices
async function fetchPrices() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin,solana,ripple,usd-coin,dogecoin,cardano,tron,chainlink,polkadot,stellar,toncoin,sui,shiba-inu,uniswap,litecoin,bitcoin-cash,near,aptos,cosmos,hedera,pepe,vechain,filecoin,arbitrum&vs_currencies=usd",
    );
    const data = await response.json();
    createCards(data);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

setInterval(()=>{
    fetchPrices()
},10000)

document.addEventListener("DOMContentLoaded", fetchPrices);
