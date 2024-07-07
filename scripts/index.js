import {cartData} from './cartData.js'
import { getLocalData, setCartLen } from './getLocalData.js'



function addCarts(){

 if(cartData.length > 0){

    let carts = document.querySelector('.carts')

    cartData.forEach(data=>{

        let cart = document.importNode(document.getElementById('cartsTemp').content,true)
        cart.querySelector('.cart img').src = data.img
        cart.querySelector('.cart .price div:nth-child(1) span:nth-child(2)').innerHTML = data.orignalPrice
        cart.querySelector('.cart .price div:nth-child(2)>span').innerHTML = data.disPrice

        let star = ""
        for(let i = 0;i<data.starts;i++){
              star += `<i class="fa-solid fa-star"></i>`
        }
        cart.querySelector('.cart .stars').innerHTML = star

        cart.querySelector('.cart .add button').setAttribute('data-id',data.id)
        let localIDs = getLocalData().map(data=>data.id)
        cart.querySelector('.cart .add button').innerHTML = localIDs.length>0 && localIDs.includes(data.id) ?"Added to Cart" : "Add To Cart"
        cart.querySelector('.cart .add button').style.backgroundColor = localIDs.length>0 && localIDs.includes(data.id) ?"crimson" : "green"
        // cart.querySelector('.cart .add button').disabled = localIDs.length>0 && localIDs.includes(data.id) ?true: false

        cart.querySelector('.cart .add button').addEventListener('click',(e)=>{
            //alert(e.target.dataset.id)
            if(e.target.innerText.trim() === "Added to Cart") return alert('item is already in Cart')
            let id = Number(e.target.dataset.id)
            let dataToStore  = cartData.find(data=>data.id === id)
            dataToStore = {...dataToStore,q:1}
              let localData = getLocalData()
              localData.push(dataToStore)
            localStorage.setItem('products',JSON.stringify(localData))
            e.target.innerHTML = "Added to Cart"
            e.target.style.backgroundColor = "crimson"
            // e.target.disabled = true
            setCartLen()

        })
    
        carts.append(cart)
        

    })

 }
}

addCarts()
setCartLen()

