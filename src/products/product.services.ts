import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductService{
    products: Product[] = []

    createProduct(title: string, price: number, rating: number, desc: string, categories: Array<string>){
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, price, rating, desc, categories)
        this.products.push(newProduct)
        return prodId
    }

    getProducts(){
        return [...this.products]
    }

    getProduct(productId: string){
        const product = this.findProduct(productId)
        return {...product}
    }

    updateProduct(productId: string, title: string, price: number, rating: number, desc: string, categories: Array<string>){
        const [product, index] = this.findProduct(productId)
        const updatedProduct = {...product};
        if(title)
            updatedProduct.title = title
        if(desc)
            updatedProduct.desc = desc
        if(price)
            updatedProduct.price = price
        if(rating)
            updatedProduct.rating = rating
        if(categories)
            updatedProduct.categories = categories

        this.products[index] = updatedProduct;
        
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod=> prod.id === id)
        const product = this.products[productIndex]
        if(!product) {
            throw new NotFoundException('Could not find product')
        }
        return [product, productIndex];
    }

    deleteProduct(productId: string){
        const index = this.findProduct(productId)[1]
        this.products.splice(index, 1)
    }
    }
