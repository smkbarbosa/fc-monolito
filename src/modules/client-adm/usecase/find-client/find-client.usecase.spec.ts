import Id from "../../../@shared/domain/value-object/id.value-object";
import FindClientUsecase from "./find-client.usecase";

const client = ({
    id: new Id("1"),
    name: "Client 1",
    email: "x@x.com",
    address: "Address 1",
    createdAt: new Date,
    updatedAt: new Date,
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    };
};

describe("find client usecase test", () => {
    it("should find a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUsecase(repository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(input.id)
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
        expect(result.createdAt).toEqual(client.createdAt);

    });
});
