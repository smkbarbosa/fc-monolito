import {Sequelize} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import {InvoiceItemModel} from "./item.model";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.vo";
import Product from "../domain/product.entity";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([InvoiceItemModel, InvoiceModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create invoice", async () => {

        const address = new Address({
            street: "Street",
            number: "123",
            complement: "Complement",
            city: "City",
            state: "State",
            zipCode: "12345678",
        });

        const product1 = new Product({
            id: new Id("1"),
            name: "Product 1",
            price: 100,
        });

        const product2 = new Product({
            id: new Id("2"),
            name: "Product 2",
            price: 200,
        });

        const invoice = new Invoice({
            id: new Id("1"),
            name: "John Doe",
            document: "123456789",
            address: address,
            items: [product1, product2]
        });

        const repository = new InvoiceRepository();
        await repository.create(invoice);

        const result = await InvoiceModel.findOne({
            where: {id: "1"},
            include: [InvoiceItemModel],
        });

        expect(result).toBeDefined();
        expect(result.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.street).toBe(invoice.address.street);
        expect(result.number).toBe(invoice.address.number);
        expect(result.complement).toBe(invoice.address.complement);
        expect(result.city).toBe(invoice.address.city);
        expect(result.state).toBe(invoice.address.state);
        expect(result.zipCode).toBe(invoice.address.zipCode);
        expect(result.items).toHaveLength(2);
        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.total).toBe(300);
    });

    it("should find invoice", async () => {
        const repository = new InvoiceRepository();
        const invoice = new Invoice({
            id: new Id("1"),
            name: "John Doe",
            document: "123456789",
            address: new Address({
                street: "Street",
                number: "123",
                complement: "Complement",
                city: "City",
                state: "State",
                zipCode: "12345678",
            }),
            items: [
                new Product({
                    id: new Id("1"),
                    name: "Product 1",
                    price: 100,
                }),
                new Product({
                    id: new Id("2"),
                    name: "Product 2",
                    price: 200,
                }),
                ],
            });
            await repository.create(invoice);

            const result = await repository.find(invoice.id.id);

            expect(result).toBeDefined();
            expect(result.id.id).toBe(invoice.id.id);
            expect(result.name).toBe(invoice.name);
            expect(result.document).toBe(invoice.document);
            expect(result.address.street).toBe(invoice.address.street);
            expect(result.address.number).toBe(invoice.address.number);
            expect(result.address.complement).toBe(invoice.address.complement);
            expect(result.address.city).toBe(invoice.address.city);
            expect(result.address.state).toBe(invoice.address.state);
            expect(result.address.zipCode).toBe(invoice.address.zipCode);
            expect(result.items).toHaveLength(2);
            expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
            expect(result.items[0].name).toBe(invoice.items[0].name);
            expect(result.items[0].price).toBe(invoice.items[0].price);
            expect(result.items[1].id.id).toBe(invoice.items[1].id.id);
            expect(result.items[1].name).toBe(invoice.items[1].name);
            expect(result.items[1].price).toBe(invoice.items[1].price);
            expect(result.total).toBe(300);
    });
});