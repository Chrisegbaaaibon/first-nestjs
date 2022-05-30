import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./product.services";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductService) {}
    @Post('create')
    addProduct(
        @Body('title') prodTitle: string, 
        @Body('price') prodPrice: number, 
        @Body('rating') prodRating: number, 
        @Body('desc') prodDesc: string, 
        @Body('categories') prodCategories: Array<string>
    ) { 
      const generatedId =  this.productService.createProduct(prodTitle, prodPrice, prodRating, prodDesc, prodCategories); 
      return {id: generatedId}
    }

    @Get()
    getAllProducts() {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productService.getProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string, 
        @Body('price') prodPrice: number, 
        @Body('rating') prodRating: number, 
        @Body('desc') prodDesc: string, 
        @Body('categories') prodCategories: Array<string>
    ) {
         this.productService.updateProduct(prodId, prodTitle, prodPrice, prodRating, prodDesc, prodCategories);
         return null
    }


    @Delete(':id')
    deleteProducts(@Param('id') prodId: string) {
        this.productService.deleteProduct(prodId);
        return null;
    }
    
}