import {Sequelize} from "sequelize-typescript";
import ProductCatalogModel from "./productCatalogModel";
import ProductRepository from "./product.repository";

describe("ProductRepository unit test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([ProductCatalogModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find all products", async () => {
        await ProductCatalogModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        await ProductCatalogModel.create({
            id: "2",
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 200,
        });

        const productRepository = new ProductRepository();
        const products = await productRepository.findAll();

        expect(products.length).toBe(2);
        expect(products[0].id.id).toBe("1");
        expect(products[0].name).toBe("Product 1");
        expect(products[0].description).toBe("Product 1 description");
        expect(products[0].salesPrice).toBe(100);
        expect(products[1].id.id).toBe("2");
        expect(products[1].name).toBe("Product 2");
        expect(products[1].description).toBe("Product 2 description");
        expect(products[1].salesPrice).toBe(200);
    });

    it("should find one products", async () => {
        await ProductCatalogModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        const productRepository = new ProductRepository();
        const products = await productRepository.find("1");

        expect(products.id.id).toBe("1");
        expect(products.name).toBe("Product 1");
        expect(products.description).toBe("Product 1 description");
        expect(products.salesPrice).toBe(100);
    });
});