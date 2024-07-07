import { caluclateTotal, getLocalData, setCartLen } from "./getLocalData.js";

console.log('from cart ',getLocalData())

function addDataCarts(){

    let cartDatas = getLocalData()

    if(cartDatas.length >0){
        
        let cartItems = document.querySelector('.cartItems')
        cartDatas.forEach(data=>{
            let cartTemp = document.importNode(document.getElementById('cartTemp').content,true)
            cartTemp.querySelector('.cartPro .cartImg img').src = data.img
            cartTemp.querySelector('.cartPro .cartPrice span:nth-child(2)').innerHTML = data.orignalPrice
            cartTemp.querySelector('.cartPro  #btns p').innerHTML = data.q
            cartTemp.querySelector('.cartPro  #btns button:nth-child(1)').setAttribute("data-id",data.id)
            cartTemp.querySelector('.cartPro  #btns button:nth-child(3)').setAttribute("data-id",data.id)
            cartTemp.querySelector('.cartPro  #btns').addEventListener('click',(e)=>{
            
                if(e.target.className === "add"){

                    let currentAmount = Number(e.target.nextElementSibling.innerText.trim())

                    currentAmount += 1

                    let id = Number(e.target.dataset.id)
                    let cartData = getLocalData()

                    let cdata = cartData.find(data=>data.id === id)
                    cdata.q = currentAmount

                    e.target.nextElementSibling.innerHTML = currentAmount
                    localStorage.setItem('products',JSON.stringify(cartData))

                    caluclateTotal()
                    
                }else if(e.target.className === "rem"){
                    
                    let currentAmount = Number(e.target.previousElementSibling.innerText.trim())
                    if(currentAmount>1){
                        currentAmount -= 1
                    }else{
                        currentAmount = currentAmount
                    }

                        let id = Number(e.target.dataset.id)
                        let cartData = getLocalData()

                        let cdata = cartData.find(data=>data.id === id)
                        cdata.q = currentAmount

                        e.target.previousElementSibling.innerHTML = currentAmount
                        localStorage.setItem('products',JSON.stringify(cartData))

                        caluclateTotal()

                    
                }


            })

              let removeBtn = cartTemp.querySelector('.cartPro .remove button')
              removeBtn.setAttribute("data-id",data.id)
            removeBtn.addEventListener('click',(e)=>{
  
                let localCartData = getLocalData()
                let newCartData = localCartData.filter(data=>data.id !== Number(e.target.dataset.id))
                localStorage.setItem('products',JSON.stringify(newCartData))
                e.target.parentElement.parentElement.remove()
                setCartLen()
                caluclateTotal()
                addDefaultData()

            })


            cartItems.append(cartTemp)


        })

    }

}

function addDefaultData(){

    let data = getLocalData()
    if(data.length ===0){
        document.querySelector('.cartItems').innerHTML = `<h2 class="dtext">No Items In the Cart Yet...</h2>`
    }
}

addDefaultData()
addDataCarts()
setCartLen()
caluclateTotal()