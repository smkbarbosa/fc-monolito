import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product-use.case";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 10,
})

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    }
}

describe("FindProduct usecase unit test", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const useCase = new FindProductUseCase(productRepository);

        const input = {
            id: "1",
        }

        const result = await useCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.id).toBe("1");
        expect(result.name).toBe("Product 1");
        expect(result.description).toBe("Product 1 description");
        expect(result.salesPrice).toBe(10);
    });

});