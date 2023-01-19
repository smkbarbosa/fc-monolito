import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import ProductAdmFacade from "./product-adm.facade";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe("ProductAdmFacade", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should add a product", async () => {
        // const productRepository = new ProductRepository();
        // const addProductUseCase = new AddProductUseCase(productRepository);
        // const productFacade = new ProductAdmFacade({
        //     addUseCase: addProductUseCase,
        //     stockUseCase: undefined,
        // });

        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10,
        };
        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({ where: { id: "1" } });

    });

    it("should check a product", async () => {

        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10,
        };
        await productFacade.addProduct(input);

        const result = await productFacade.checkStock({ productId: "1" });

        expect(result.productId).toBe(input.id);
        expect(result.stock).toBe(input.stock);

    });


});