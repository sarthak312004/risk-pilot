
document.querySelector('.inputs input').addEventListener('keydown', calculate())

function calculate(){

    return function(){
        
    const inputData = document.querySelectorAll('.inputs input')
    let count = 0
    inputData.forEach((data)=>{
        if(!data.value){
            console.log("fill required inputs !");
        }else{
           count++
        }
    })
    if(count === 4){
        let capital = Number(inputData[0].value)
        let risk = Number(inputData[1].value)
        let entry = Number(inputData[2].value)
        let stoploss = Number(inputData[3].value)

        let totalRisk = (capital / 100) * risk
        let diff = entry - stoploss
        let capitalNeed = (totalRisk / diff) * entry
        document.querySelector('#risk').innerHTML = `Risk: ${risk}% ~${totalRisk}₹`

        document.querySelector('#lot-size').innerHTML = `Lot Size: ${totalRisk / diff}`

        if(capitalNeed > capital){
            document.querySelector('#capital').style.color = "orange"
            document.querySelector('#capital').innerHTML = `Capital: ${capitalNeed}₹`
        }else{
            document.querySelector('#capital').innerHTML = `Capital: ${capitalNeed}₹`
        }
        // console.log(capital, risk, entry, stoploss);
    }
    }
}
