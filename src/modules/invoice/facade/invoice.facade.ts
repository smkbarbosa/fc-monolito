import {
    FindInvoiceFacadeOutputDto,
    GenerateInvoiceFacadeInputDto,
    GenerateInvoiceFacadeOutputDto,
    InvoiceFacadeInterface
} from "./invoice.facade.interface";
import InvoiceGateway from "../gateway/invoice.gateway";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {
    constructor(
        private _invoiceRepository: InvoiceGateway,
        private _generateInvoiceUseCase: UseCaseInterface,
        private _findInvoiceUseCase: UseCaseInterface,
    ) {
    }

    async generate(invoice: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateInvoiceUseCase.execute(invoice);
    }

    async find(invoiceId: string): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findInvoiceUseCase.execute({id: invoiceId});
    }
}