import fs from 'fs'


export default class cartManager{
    constructor (carts=[]){
        this.carts=carts;
        this.path = './src/manager/carts.json'
        this.lId=1
    }


init = async ()=>{
    const carts =JSON.stringify (this.carts)
    await fs.promises.writeFile(this.path,cartsJson)};

createCart = async (newCart) => {
    try {
        if(!newCart.products){
            throw new error ("informacion del carrito incompleta")
        }

        newCart.id = this.lId 
        this.lId= this.lId +1
        this.carts.push(newCart)


        const dataJson = json.stringify(this.carts)
        const data = await fs.promises.writeFile(this.path, dataJson)

        return newCart
    } 
    catch (error){
        console.log(error)
    }

}    



getproductByCartId = async (cId)=>{
    try{
        const cart = this.carts.find (c=> c.id === cId)
        if (!cart) return console.log("no se encontro el carrito")
        return cart
    }
    catch(error){
        console.log(error)
    }
}

getCarts = async ()=>

addProductCart = async(cId, pId, quantity = 1) => {
    const item_index = this.carts.findIndex(c =>c.id ===cId)

    if(item_index<0){
        console.log('no existe carrito con el siguiente id ${cId}')
        return null
    }

    const selectedCart = this.carts [item_index]
    const pIndex = selectedCart.products.findIndex(p=>p.id===pId)


    if (productIndex >= 0){
        this.carts[item_index][pIndex].quantity += 1;

    } else {
        const cartProduct = {quantity, pId}
        selectedCart.products.push(cartProduct)
    }

    const  cartJson = JSON.stringify(this.carts)
    await fs.promises.writeFile(this.path, cartJson)


    }
}

