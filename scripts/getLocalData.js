export const getLocalData = () =>{
    let localData = localStorage.getItem('products')
    if(localData){
        localData = JSON.parse(localData)
        return localData
    }

    return []
}

export function setCartLen(){
    let cartLen = document.getElementById('cartLen')
    let localData = getLocalData()

    if(localData.length > 0){
        cartLen.innerHTML = `( ${localData.length} )`
    }else{
        cartLen.innerHTML = ``
    }

}

export function caluclateTotal(){

    let data = getLocalData()

    let amount = 0
  console.log('data is ',data)
    if(data.length>0){
        amount = data.reduce((acc,cur)=>{
   
             acc += (cur.q * cur.orignalPrice)
             return acc
   
       },0)

    }

     document.querySelector('.bill p:nth-child(1)>span:nth-child(2)').innerHTML = `Rs ${amount}`
     document.querySelector('.bill p:nth-child(2)>span:nth-child(2)').innerHTML = amount===0? `Rs 0`: `Rs 50`
     document.querySelector('.bill p:nth-child(3)>span:nth-child(2)').innerHTML = amount===0? `Rs 0`: `Rs ${amount + 50}`
}