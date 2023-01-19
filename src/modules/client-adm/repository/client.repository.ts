import ClientGateway from "../gateway/client.gateway";
import {ClientModel} from "./client.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";

export default class ClientRepository implements ClientGateway {
    async find(id: string): Promise<Client> {
        const client = await ClientModel.findOne({where: {id}});

        if (!client) {
            throw new Error("Client not found");
        }

        return new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        })
    }

    add(client: Client): Promise<void> {
        return Promise.resolve(undefined);
    }
}