import {Column, HasMany, Model, PrimaryKey, Table,} from "sequelize-typescript";
import {InvoiceItemModel} from "./item.model";

@Table({
    tableName: "invoices",
    timestamps: false,
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;
    @Column({allowNull: false})
    declare name: string;
    @Column({allowNull: false})
    declare document: string;
    @Column({allowNull: false})
    declare street: string;
    @Column({allowNull: false})
    declare number: string;
    @Column({allowNull: false})
    declare complement: string;
    @Column({allowNull: false})
    declare city: string;
    @Column({allowNull: false})
    declare state: string;
    @Column({allowNull: false})
    declare zipCode: string;
    @HasMany(() => InvoiceItemModel, {foreignKey: 'invoice_id'})
    declare items: InvoiceItemModel[];

    @Column({ allowNull: false })
    total: number;

    @Column({ allowNull: false })
    createdAt: Date;
}
