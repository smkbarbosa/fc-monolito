import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "./invoice.entity";
import Address from "./address.vo";
import Product from "./product.entity";

describe("Invoice test", () => {
    it("should calculate the total amount", () => {
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
                zipCode: "123456",
            }),
            items: [
                new Product({
                    id: new Id("1"),
                    name: "Product 1",
                    price: 100
                }),
                new Product({
                    id: new Id("2"),
                    name: "Product 2",
                    price: 200
                }),
            ],
        });

        expect(invoice.total).toBe(300);
    });
});