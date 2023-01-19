import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client-use.case";
import FindClientUseCase from "../usecase/find-client/find-client-use.case";
import ClientAdmFacade from "../facade/client-adm.facade";

export default class ClientAdmFacadeFactory {
    static create() {
        const clientRepository = new ClientRepository();
        const addClientUseCase = new AddClientUseCase(clientRepository);
        const findClientUseCase = new FindClientUseCase(clientRepository);

        const facade = new ClientAdmFacade({
            addUseCase: addClientUseCase,
            findUseCase: findClientUseCase,
        });

        return facade;

    }
}