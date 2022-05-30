import { Module } from "@nestjs/common";
import { ProductService } from "./product.services";
import { ProductsController } from "./products.controller";

@Module({
    controllers: [ProductsController],
    providers: [ProductService],
})

export class ProductModle {}