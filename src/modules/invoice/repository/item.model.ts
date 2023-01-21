import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";


@Table({
    tableName: "invoice_items",
    timestamps: false,
})
export class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column
    declare  id: string;
    @Column({ allowNull: false })
    declare  name: string;
    @Column({ allowNull: false })
    declare  price: number;
    @BelongsTo(() => InvoiceModel,{ foreignKey: 'invoice_id'})
    Invoice: InvoiceModel[];
}