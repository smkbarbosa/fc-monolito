import PaymentFacadeInterface, {PaymentFacadeInputDto, PaymentFacadeOutputDto} from "./facade.interface";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(private processPaymentUseCase: UseCaseInterface) {

    }

    async processPayment(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return await this.processPaymentUseCase.execute(input);
    }
}