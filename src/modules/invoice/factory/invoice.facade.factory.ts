import {InvoiceFacadeInterface} from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate/generate.usecase";
import FindInvoiceUseCase from "../usecase/find/find.usecase";
import InvoiceFacade from "../facade/invoice.facade";

export default class InvoiceFacadeFactory {
    static generate(): InvoiceFacadeInterface {
        const repository = new InvoiceRepository();
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
        const findInvoiceUseCase = new FindInvoiceUseCase(repository);

        return new InvoiceFacade(
            repository,
            generateInvoiceUseCase,
            findInvoiceUseCase,
        );
    }
}