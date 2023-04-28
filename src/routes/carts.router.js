import { Router } from "express";
import cartManager from'../manager/cartManager.js'
import productsManager from '../manager/productManager.js'

const router = Router()

const cartsManager = new cartManager()
const productManager = new productsManager()


const ca= cartsManager.getproductByCartId()
const product = productManager.getProducts()


router.get ('/:cId', async(req, res)=>{
    try{
        const cId = req.params.cId
        const carts = await ca
        const selected = carts.find((c)=>c.id==cId)
        res.send (selected)
    }catch(error){
        console.log(error)
        return res.status(404).send({error:"not found"})
    }
})

router.post ('/', async(req, res)=>{
    try{
        cartManager.createCart()
        res.send("cart created")
    }catch(error){
        return res.status(404).send({error:"cart not created"})
    }
})

router.post(`/:cId'/product/:pId`, async(req, res)=>{
    const carts = await carts
    const cartId = req.params.cId
    const cart = allCarts.find((c)=>c.id==cartId)
    if(!cart){
        return res.status(404).send ({error:"carts not found"})
    }
    const pId= req.params.pId
    let quantity = req.body.quantity
    quantity ? (quantity = quantity) : (quantity = 1)
    const productos = await product
    const selectedProduct = productos.find ((p)=>p.id==pId)
    selectedProduct ? res.send("cart found"):res.send("product not found")
    const selectedId = selectedProduct.id
    const cSend = {
        product: selectedId,
        quantity: quantity
    }
    cartManager.addProductCart(cId, cSend)
})




export default router