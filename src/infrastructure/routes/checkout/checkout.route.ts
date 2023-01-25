import express, {Request, Response} from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/cliente-adm.facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const clientFacade = ClientAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const productFacade =  ProductAdmFacadeFactory.create()
    const mockCheckoutRepository = {
        addOrder: jest.fn(),
        findOrder: jest.fn(),
    };
    const invoiceFacade = InvoiceFacadeFactory.generate();
    const paymentFacade = PaymentFacadeFactory.create();

    const orderUseCase = new PlaceOrderUseCase(
        clientFacade,
        productFacade,
        catalogFacade,
        mockCheckoutRepository,
        invoiceFacade,
        paymentFacade);

    try {
        const orderDto = {
            clientId: req.body.clientId,
            products: req.body.products,
        };
        const output = await orderUseCase.execute(orderDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});


// import express, {Request, Response} from "express";
// import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
// import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/cliente-adm.facade.factory";
// import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
// import Order from "../../../modules/checkout/domain/order.entity";
// import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
// import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
// import {PlaceOrderInputDto, PlaceOrderOutputDto} from "../../../modules/checkout/usecase/place-order/place-order.dto";
//
// export const checkoutRoute = express.Router();
//
// checkoutRoute.post("/", async (req: Request, res:Response) => {
//     const clientFacade = ClientAdmFacadeFactory.create();
//     const productFacade = ProductAdmFacadeFactory.create();
//     const catalogFacade = StoreCatalogFacadeFactory.create();
//     const paymentFacade = PaymentFacadeFactory.create();
//     const invoiceFacade = PaymentFacadeFactory.create();
//     const mockCheckoutRepository = {
//         addOrder: jest.fn(),
//         findOrder: jest.fn(),
//     }
//
//     const usecase = new PlaceOrderUseCase(
//         clientFacade,
//         productFacade,
//         catalogFacade,
//         mockCheckoutRepository,
//         paymentFacade,
//         invoiceFacade
//     )
//     try {
//         const { clientId, products } = req.body;
//         const orderDto: PlaceOrderInputDto = {
//             clientId,
//             products,
//         };
//
//        const output: PlaceOrderOutputDto = await
//            usecase.execute(orderDto);
//        res.send(output);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });