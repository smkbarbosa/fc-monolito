import {FindInvoiceUsCaseInputDto, FindInvoiceUsCaseOutputDto} from "./find.usecase.dto";
import InvoiceGateway from "../../gateway/invoice.gateway";

export default class FindInvoiceUseCase {
    constructor(private readonly _invoiceRepository: InvoiceGateway) {
    }

    async execute(input: FindInvoiceUsCaseInputDto): Promise<FindInvoiceUsCaseOutputDto> {
        const invoice = await this._invoiceRepository.find(input.id);

        return this.toDTO(invoice);
    }

    private toDTO(invoice: any): FindInvoiceUsCaseOutputDto {
        // @ts-ignore
        return {
            id: invoice.id,
            document: invoice.document,
            name: invoice.name,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
            })),
            total: invoice.total,
        };
    }
}