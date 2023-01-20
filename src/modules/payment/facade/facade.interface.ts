export interface PaymentFacadeInputDto {
    orderId: string;
    amount: number;
}

export interface PaymentFacadeOutputDto {
    transactionId: string;
    orderId: string;
    status: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}

export default interface PaymentFacadeInterface {
    processPayment(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>;
}
