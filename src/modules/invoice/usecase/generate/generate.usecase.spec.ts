import GenerateInvoiceUseCase from "./generate.usecase";

const MockRepository = () => ({
    create: jest.fn(),
    find: jest.fn(),
});

describe('GenerateInvoiceUseCase', () => {
    it('should generate invoice', async () => {
        const mockRepository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(mockRepository);

        const input = {
            name: 'John Doe',
            document: '12345678910',
            street: 'Street',
            number: '123',
            complement: 'Complement',
            city: 'City',
            state: 'State',
            zipCode: '12345678',
            items: [
                {
                    id: '1',
                    name: 'Item 1',
                    price: 30,
                },
                {
                    id: '2',
                    name: 'Item 2',
                    price: 20,
                },
            ],
        };

        const result = await usecase.execute(input);

        expect(result.id).toBeDefined();
        expect(mockRepository.create).toHaveBeenCalled();
        expect(result.name).toEqual(input.name);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);
        expect(result.items).toEqual(input.items);
        expect(result.total).toEqual(50);

    });

});