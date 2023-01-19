import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import ProductRepository from "../../repository/product.repository";
import CheckStockUsecase from "./check-stock.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    purchasePrice: 10,
    stock: 10,
})

const MockRepository = () => ({
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
});

describe("CheckStock usecase unit test", () => {
    it("should check stock", async () => {
        const productRepository = MockRepository();
        const checkStockUseCase = new CheckStockUsecase(productRepository);
        const input = {
            productId: "1",
        }
        const result = await checkStockUseCase.execute(input);
        expect(productRepository.find).toHaveBeenCalled();
        expect(result.productId).toBe("1");
        expect(result.stock).toBe(10);
    });
});
