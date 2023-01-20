import Transaction from "../../domain/transaction";
import Id from "../../../@shared/domain/value-object/id.value-object";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 99,
    orderId: "1",
    status: "approved",
});

const transaction2 = new Transaction({
    id: new Id("1"),
    amount: 50,
    orderId: "2",
    status: "declined",
});

const MockRepository = () => ({
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
});

const MockRepositoryDeclined = () => ({
    save: jest.fn().mockReturnValue(Promise.resolve(transaction2)),
});

describe("ProcessPaymentUseCase", () => {
    it("should approve a payment", async () => {
        const paymentRepository = MockRepository();
        const useCase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: "1",
            amount: 150,
        };
        const result = await useCase.execute(input);

        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(150);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toBe(transaction.createdAt);
        expect(result.updatedAt).toBe(transaction.updatedAt);
    });

    it("should decline a payment", async () => {
        const paymentRepository = MockRepositoryDeclined();
        const useCase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: "2",
            amount: 50,
        };
        const result = await useCase.execute(input);

        expect(result.transactionId).toBe(transaction2.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("declined");
        expect(result.amount).toBe(50);
        expect(result.orderId).toBe("2");
        expect(result.createdAt).toBe(transaction2.createdAt);
        expect(result.updatedAt).toBe(transaction2.updatedAt);
    });


});