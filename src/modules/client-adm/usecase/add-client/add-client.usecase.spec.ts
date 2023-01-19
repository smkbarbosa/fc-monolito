import AddClientUseCase from "./add-client-use.case";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};

describe("add client usecase test", () => {
    it("should add a client", async () => {
        const repository = MockRepository();
        const usecase = new AddClientUseCase(repository);

        const input = {
            name: "Client 1",
            email: "x@x.com",
            address: "Rua 1",
        };

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined()
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);
    });
});