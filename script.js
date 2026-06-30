function calculate() {
  const inputData = document.querySelectorAll(".inputs input");
  let count = 0;
  inputData.forEach((data) => {
    if (data.value) {
      count++;
    }
  });
  if (count === 4) {
    let capital = Number(inputData[0].value);
    let risk = Number(inputData[1].value);
    let entry = Number(inputData[2].value);
    let stoploss = Number(inputData[3].value);

    document.querySelector("#risk").innerHTML =
      `Risk: ${risk}% ~${(capital / 100) * risk}₹`;

    if (entry < stoploss) {
      document.querySelector("#lot-size").innerHTML =
        `Lot Size: ${Math.trunc(((capital / 100) * risk) / (stoploss - entry))}`;
    } else {
      document.querySelector("#lot-size").innerHTML =
        `Lot Size: ${Math.trunc(((capital / 100) * risk) / (entry - stoploss))}`;
    }

    if ((((capital / 100) * risk) / (entry - stoploss)) * entry > capital) {
      document.querySelector("#capital").style.color = "orange";
      document.querySelector("#capital").innerHTML =
        `Capital: ${(((capital / 100) * risk) / (entry - stoploss)) * entry}₹`;
    } else {
      document.querySelector("#capital").style.color = "black";
      if (entry < stoploss) {
        document.querySelector("#capital").innerHTML =
          `Capital: ${Math.trunc((((capital / 100) * risk) / (stoploss - entry)) * entry)}₹`;
      } else {
        document.querySelector("#capital").innerHTML =
          `Capital: ${Math.trunc((((capital / 100) * risk) / (entry - stoploss)) * entry)}₹`;
      }
    }
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
function createCards(data) {
  if (data && !isCreated) {
    for (let [key, value] of Object.entries(data)) {
      const coinDiv = document.createElement("div");

      let coinName = document.createElement("h4");
      coinName.id = "coin-name";
      coinName.innerText = key.toUpperCase();
      coinDiv.appendChild(coinName);

      let coinPrice = document.createElement("p");
      coinPrice.id = "coin-price";
      coinPrice.innerText = value.usd;
      coinDiv.appendChild(coinPrice);

      document.querySelector(".coin-card-container").appendChild(coinDiv);
      isCreated = true;
    }
  } else if (isCreated) {
    coinName.innerText = key.toUpperCase();
    coinPrice.innerText = value.usd;
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
},20000)

document.addEventListener("DOMContentLoaded", fetchPrices);
