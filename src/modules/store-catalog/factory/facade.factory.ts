import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product-use.case";
import StoreCatalogFacade from "../facade/store-catalog.facade";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacade {
        const productRepository = new ProductRepository();
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
        const findProductUseCase = new FindProductUseCase(productRepository);

        const facade = new StoreCatalogFacade({
            findAllUseCase: findAllProductsUseCase,
            findUseCase: findProductUseCase,
        });
        return facade;
    }
}