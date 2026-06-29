function calculate(){

    const inputData = document.querySelectorAll('.inputs input')
    let count = 0
    inputData.forEach((data)=>{
        if(data.value){
              count++
        }
    })
    if(count === 4){
        let capital = Number(inputData[0].value)
        let risk = Number(inputData[1].value)
        let entry = Number(inputData[2].value)
        let stoploss = Number(inputData[3].value)

        document.querySelector('#risk').innerHTML = `Risk: ${risk}% ~${(capital / 100) * risk}₹`

        if(entry < stoploss){
            document.querySelector('#lot-size').innerHTML = `Lot Size: ${Math.trunc(((capital / 100) * risk) / (stoploss - entry))}`
        }else{
            document.querySelector('#lot-size').innerHTML = `Lot Size: ${Math.trunc(((capital / 100) * risk) / (entry - stoploss))}`
        }

        if(((((capital / 100) * risk) / (entry - stoploss)) * entry) > capital){
            document.querySelector('#capital').style.color = "orange"
            document.querySelector('#capital').innerHTML = `Capital: ${(((capital / 100) * risk) / (entry - stoploss)) * entry}₹`
        }else{
            document.querySelector('#capital').style.color = "black"
            if(entry < stoploss){
                document.querySelector('#capital').innerHTML = `Capital: ${Math.trunc((((capital / 100) * risk) / (stoploss - entry)) * entry)}₹`
            }else{
                document.querySelector('#capital').innerHTML = `Capital: ${Math.trunc((((capital / 100) * risk) / (entry - stoploss)) * entry)}₹`
            }
        }
    }
}

document.getElementById('account-size-input').addEventListener('input', calculate)
document.getElementById('risk-input').addEventListener('input', calculate)
document.getElementById('entry-input').addEventListener('input', calculate)
document.getElementById('sl-input').addEventListener('input', calculate)

