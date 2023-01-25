import {app, sequelize} from "../../express";
import request from "supertest";
import ProductCatalogModel from "../../../modules/store-catalog/repository/productCatalogModel";

const mockDate = new Date(2000,1,1);
describe("E2E test for checkout", () => {
    beforeAll(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(mockDate)
    })
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
        jest.useRealTimers();
    });

    it("should checkout", async () => {

        const client = await request(app)
            .post("/clients")
            .send({
                name: "Client 1",
                email: "xx@gmil.com",
                document: "0000",
                street: "My Street",
                number: "132",
                complement: "aaaaa",
                city: "New York",
                state: "Kingston",
                zipCode: "12401",

            });

        const productA = await request(app)
            .post("/products")
            .send({
                    id: "1",
                    name: "Product 1",
                    description: "Product",
                    purchasePrice: 100,
                    stock: 10,
                },
            );

        const productB = await request(app)
            .post("/products")
            .send({
                    id: "2",
                    name: "Product 2",
                    description: "Product",
                    purchasePrice: 200,
                    stock: 4,
                },
            );

        await ProductCatalogModel.create({
            id: "1",
            name: "Product 1",
            description: "Product",
            salesPrice: 100,
        })

        await ProductCatalogModel.create({
            id: "2",
            name: "Product 2",
            description: "Product",
            salesPrice: 200,
        })

        const order = await request(app)
            .post("/checkout")
            .send({
                    clientId: client.body.id,
                    products: [
                        {
                            productId: productA.body.id,
                        },
                        {
                            productId: productB.body.id,
                        },
                    ],
                },
            );

        expect(order.body.total).toBe(300);
        expect(order.body.products).toStrictEqual([{productId: "1"}, {productId: "2"}]);
    });
});

// import request from "supertest";
// import {app, sequelize} from "../../express";
// import ClientModel from "../../../modules/client-adm/repository/client.model";
// import ProductCatalogModel from "../../../modules/store-catalog/repository/productCatalogModel";
//
//
// describe("E2E test for checkout", () => {
//     beforeEach(async () => {
//         await sequelize.sync({force: true});
//     });
//
//     afterAll(async () => {
//         await sequelize.close();
//     });
//
//     it("should create a checkout", async () => {
//
//         await ClientModel.create({
//             id: "1",
//             name: "Jonh Doe",
//             email: "x@x.com",
//             document: "0000",
//             street: "My Street",
//             number: "132",
//             complement: "aaaaa",
//             city: "New York",
//             state: "Kingston",
//             zipCode: "12401",
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         });
//
//         await ProductCatalogModel.create({
//             id: "1",
//             name: "Product 1",
//             description: "Description 1",
//             salesPrice: 150,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         });
//
//         await ProductCatalogModel.create({
//             id: "2",
//             name: "Product 2",
//             description: "Description 2",
//             salesPrice: 100,
//         });
//
//         const response = await request(app)
//             .post("/checkout")
//             .send({
//                 clientId: "1",
//                 products: [{
//                     productId: "1",
//                 },
//                     {
//                         productId: "2",
//                     }]
//             })
//
//         expect(response.status).toBe(200);
//         expect(response.body.clientId).toBe("1");
//         expect(response.body.invoiceId).toBeDefined();
//         expect(response.body.total).toEqual(250);
//         expect(response.body.status).toEqual("approved");
//
//     });
// });