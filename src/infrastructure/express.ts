import express, {Express} from "express";
import {Sequelize} from "sequelize-typescript";
import {clientRoute} from "./routes/clients/client.route";
import ClientModel from "../modules/client-adm/repository/client.model";
import {productRoute} from "./routes/products/product.route";
import {ProductModel} from "../modules/product-adm/repository/product.model";
import {ProductModel as StoreCatalog} from "../modules/store-catalog/repository/product.model";
import {checkoutRoute} from "./routes/checkout/checkout.route";

export const app: Express = express();
app.use(express.json());
app.use("/clients", clientRoute);
app.use("/products", productRoute)
app.use("/checkout", checkoutRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: {force: true},
    });

    await sequelize.addModels([ClientModel, ProductModel, StoreCatalog]);
    await sequelize.sync();

}

setupDb();