import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Address from "../../domain/address.vo";
import Product from "../../domain/product.entity";
import FindInvoiceUseCase from "./find.usecase";

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

const MockRepository = () => ({
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
});

describe("Find invoice use case", () => {
    it("should find an invoice", async () => {
        const mockInvoiceGateway = MockRepository();
        const usecase = new FindInvoiceUseCase(mockInvoiceGateway);

        const input = {
            id: "1",
        }

        const result = await usecase.execute(input);

        expect(result.id).toBeDefined();
        expect(mockInvoiceGateway.find).toHaveBeenCalled();
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items.length).toBe(invoice.items.length);
        expect(result.total).toBe(300);

    });
});