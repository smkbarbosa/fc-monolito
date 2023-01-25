import {app, sequelize} from "../../express";
import request from "supertest";
import {ProductModel} from "../../../modules/store-catalog/repository/product.model";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import ClientModel from "../../../modules/client-adm/repository/client.model";
// import {ProductModel} from "../../../modules/product-adm/repository/product.model";

const mockDate = new Date(2023, 1, 1);
describe("E2E test for checkout", () => {
    beforeAll(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(mockDate)
    })
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
        jest.useRealTimers();
    });

    it("should checkout", async () => {

        const client = await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            document: "0000",
            street: "My Street",
            number: "132",
            complement: "aaaaa",
            city: "New York",
            state: "Kingston",
            zipCode: "12401",
            createdAt: new Date(),
            updatedAt: new Date(),

        })

        await request(app)
            .post("/products")
            .send({
                    id: "1",
                    name: "Product 1",
                    description: "Product",
                    purchasePrice: 100,
                    stock: 10,
                },
            );

        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product description",
            salesPrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await ProductModel.create({
            id: "2",
            name: "My Product 2",
            description: "Product description",
            salesPrice: 250,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const order = await request(app)
            .post("/checkout")
            .send({
                    clientId: "1",
                    products: [
                        {
                            productId: "1",
                        },
                        {
                            productId: "2",
                        },
                    ],
                },
            );
        console.log(order.body);
        expect(order.body.clientId).toBe(client.id);
        expect(order.body.total).toBe(350);
        expect(order.body.products).toStrictEqual([{productId: "1"}, {productId: "2"}]);

    });
});