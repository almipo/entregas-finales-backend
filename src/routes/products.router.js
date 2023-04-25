import { Router } from "express";
import productManager from '../manager/productManager.js'
import ProductManager from "../manager/productManager.js";

const router = Router();


const productManager = new ProductManager()

const products = productManager.getProducts()

router.get ('/', async(req, res)=>{

    const product = await products
    const cantProducts = req.query.limit;
    if(cantProducts){
        const reduced = product.slice(0, cantProducts)
        res.send(reduced)
    }else{
        res.send(product)
    }
})


router.get('/:pId', async(req, res)=>
{
    try {
        const newContent = req.body
        productManager.addProduct(newContent)
        res.send ({status:"true", message: "product get"})
    }
    catch (error){
        res.status(404).send ({ error: "not found"})
    }
})


router.post ('/', async(req, res)=>{
    try{
        const newContent=req.body
        productManager.addProduct(newContent)
        res.send ({status:"true", message:"product post"})
    }catch(error){
        res.status(404).send({ error:"not found"})
    }
})

router.put ('/:pId', async(req, res)=>{
    const product=await products
    const id = req.params.pId
    const newContent = req.body
    const pIndex = product.findIndex((p)=>p.id==id)
    if (pIndex===-1){
        return res.status(404). send({ error: "not found"})
    }
    product[pIndex] = newContent
    productManager.updateProduct(id, newContent)
    res.send({ message:"poduct update"})
})

router.delete ('/:pId',async(req, res)=>{

    const product = await products
    const id = req.params.pId
    const pIndex = product.findIndex((p)=>p.id==id)
    if (pIndex===-1){
        return res.status(404).send({error:"not found"})
    }
    product.splice(pIndex, 1 )
    productManager.deleteProduct(product)
    res.send({message:"product delete"})
})


export default router