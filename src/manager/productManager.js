import fs from 'fs'



export default class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./products.json";
        this.last_id = 1;
    }

    
    init = async () => {
        const productsJson = JSON.stringify(this.products)
        await fs.promises.writeFile(this.path, productsJson)
    };


    addProduct = async (newProduct) => {
        try {            
            if (!newProduct.title ||
                !newProduct.description ||
                !newProduct.price ||
                !newProduct.category||
                !newProduct.thumbnail ||
                !newProduct.code ||
                !newProduct.stock
            ) {
                throw new Error('informacion de producto incompleta')
            }


            
            const exists = this.products.find(p => p.code === newProduct.code)

            if (exists) {
                return null
            }

           
            newProduct.id = this.last_id
           
            this.last_id = this.last_id + 1
            this.products.push(newProduct)

            const dataJson = JSON.stringify(this.products)
            const data = await fs.promises.writeFile(this.path, dataJson)

            return data
        } catch (error) {
            console.log(error)
        }
    }


    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const cart = JSON.parse(data);
            return cart;
        }
        return this.products;
    }


    getProductById = async (_id) => {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const cart = JSON.parse(data)
        const product = cart.find(p => p.id === _id)
        if (product) {
            return product
        } else {
            
            return null
        }
    }

    updateProduct = async (_id, atribute, value) => {
        const item_index = this.products.findIndex(p => p.id === _id)

        if (item_index < 0) {
            console.info(`no existye el producto con este id: ${_id}`)
            return null
        }

        

        const selectedItem = this.products[item_index];
        selectedItem[atribute] = value;
        this.products[item_index] = selectedItem;

        const cartJson = JSON.stringify(this.products)
        await fs.promises.writeFile(this.path, cartJson);
    }

    deleteProduct = async (_id) => {
        const res = this.products.filter(p => p.id !== _id);

        const cartJson = JSON.stringify(res)
        await fs.promises.writeFile(this.path, cartJson);

        this.products = res
        return;
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock = 10) {
        
        if (!title ||
            !description ||
            !price ||
            !category||
            !thumbnail ||
            !code ||
            !stock
            
        ) {
            throw new Error('informacion de producto incompleta')
        }

        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status= status;
    }
}

