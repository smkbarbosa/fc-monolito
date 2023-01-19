import ProductAdmFacadeInterface, {
    AddProductFacadeInputDto,
    CheckStockFacadeInputDto,
    CheckStockFacadeOutputDto
} from "./product-adm.facade.interface";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";

export interface UseCasesProps {
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUsecase: UseCaseInterface;
    private _checkStockUsecase: UseCaseInterface;

    constructor (usecasesProps: UseCasesProps) {
        this._addUsecase = usecasesProps.addUseCase;
        this._checkStockUsecase = usecasesProps.stockUseCase;
    }
    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        // caso o dto do caso de uso seja diferente do dto da facade, é necessário fazer a conversão
        return this._addUsecase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }
}
