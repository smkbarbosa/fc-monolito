import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {GenerateInvoiceUseCaseOutputDto, GenerateUseCaseInputDto} from "./generate.usecase.dto";
import Invoice from "../../domain/invoice.entity";
import Address from "../../domain/address.vo";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
    constructor(private readonly invoiceGateway: InvoiceGateway) {
    }

    async execute(input: GenerateUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = await this.createInvoice(input);
        await this.invoiceGateway.create(invoice);

        return this.toOutputDTO(invoice);
    }

    private createInvoice(input: GenerateUseCaseInputDto): Invoice {
        return new Invoice({
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            }),
            items: input.items.map(
                (item) =>
                    new Product({
                        id: new Id(item.id),
                        name: item.name,
                        price: item.price,
                    })),
        });
    }

    private toOutputDTO(invoice: Invoice): GenerateInvoiceUseCaseOutputDto {
        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item: any) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total: invoice.total,
        };
    }
}