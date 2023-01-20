import Id from "../../@shared/domain/value-object/id.value-object";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";

type TransactionProps ={
    // id?: TransactionId;
    id?: Id;
    amount: number;
    orderId:string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

// export class TransactionId extends Id { //cria um tipo de id específioco para a transação
//     constructor(id: string) {
//         super(id);
//     }
// }

export default class Transaction extends BaseEntity implements AggregateRoot{
    private _amount: number;
    private _orderId: string;
    private _status: string;

    constructor(props: TransactionProps) {
        super(props.id);
        this._amount = props.amount;
        this._orderId = props.orderId;
        this._status = props.status || "pending";
        this.validate();
    }

    validate(): void {
        if (this._amount <= 0) {
            throw new Error("Transaction amount must be greater than 0");
        }
    }

    approve(): void {
        this._status = "approved";
    }

    decline(): void {
        this._status = "declined";
    }

    process(): void {
        if(this._amount >= 100) {
            this.approve();
        } else {
            this.decline();
        }
    }

    get amount(): number {
        return this._amount;
    }

    get orderId(): string {
        return this._orderId;
    }

    get status(): string {
        return this._status;
    }

}