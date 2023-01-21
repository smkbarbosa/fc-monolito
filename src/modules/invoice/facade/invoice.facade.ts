import InvoiceFacadeInterface, {
    FindInvoiceFacadeOutputDto,
    GenerateInvoiceFacadeInputDto
} from "./invoice.facade.interface";
import InvoiceGateway from "../gateway/invoice.gateway";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {GenerateInvoiceUseCaseOutputDto} from "../usecase/generate/generate.usecase.dto";

export default class InvoiceFacade implements InvoiceFacadeInterface {
    constructor(
        private _invoiceRepository: InvoiceGateway,
        private _generateInvoiceUseCase: UseCaseInterface,
        private _findInvoiceUseCase: UseCaseInterface,
    ){}

    async generate(invoice: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        return this._generateInvoiceUseCase.execute(invoice);
    }

    async find(invoiceId: string): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findInvoiceUseCase.execute({ id: invoiceId });
    }
}