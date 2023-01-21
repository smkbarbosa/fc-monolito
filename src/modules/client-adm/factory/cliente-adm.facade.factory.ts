import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import FindClientUseCase from "../usecase/find-client/find-client-use.case";
import AddClientUseCase from "../usecase/add-client/add-client-use.case";


export default class ClientAdmFacadeFactory {
    static create() {
        const repository = new ClientRepository();
        const findClientUseCase = new FindClientUseCase(repository);
        const addClientUseCase = new AddClientUseCase(repository);

        return new ClientAdmFacade({
            findUseCase: findClientUseCase,
            addUseCase: addClientUseCase,
        });
    }
}
