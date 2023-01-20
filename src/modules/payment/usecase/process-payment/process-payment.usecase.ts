import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import PaymentGateway from "../../gateway/payment.gateway";
import {ProcessPaymentInputDto, ProcessPaymentOutputDto} from "./process-payment.dto";
import Transaction from "../../domain/transaction";

export default class ProcessPaymentUseCase implements UseCaseInterface {
    constructor( private transactionRepository: PaymentGateway) {}

    async execute(
        input: ProcessPaymentInputDto
    ): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId
        });

        transaction.process(); //momento de processar na gateway de pagamento

        const persistTransaction = await this.transactionRepository.save(transaction);

        return {
            transactionId: persistTransaction.id.id,
            orderId: persistTransaction.orderId,
            status: persistTransaction.status,
            amount: persistTransaction.amount,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt
        };

    }
}