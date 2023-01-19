import AddClientUseCase from "../usecase/add-client/add-client-use.case";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, {AddClientFacadeInputDto} from "./cliend-adm.facade.interface";
import {FindClientInputDto, FindClientOutputDto} from "../usecase/find-client/find-client.usecase.dto";

export interface UseCaseProps {
    findUseCase: UseCaseInterface;
    addUseCase: UseCaseInterface;
}
export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _addClientUseCase: UseCaseInterface;
    private _findClientUseCase: UseCaseInterface;

    constructor(useCaseProps: UseCaseProps) {
        this._addClientUseCase = useCaseProps.addUseCase;
        this._findClientUseCase = useCaseProps.findUseCase;
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addClientUseCase.execute(input);
    }

    async find(input: FindClientInputDto): Promise<FindClientOutputDto>  {
        return await this._findClientUseCase.execute(input);
    }


}