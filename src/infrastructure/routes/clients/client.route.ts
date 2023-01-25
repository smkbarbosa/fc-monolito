import express, {Request, Response} from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/cliente-adm.facade.factory";
import {AddClientFacadeInputDto} from "../../../modules/client-adm/facade/cliend-adm.facade.interface";
export const clientRoute = express.Router();

clientRoute.post("/",
    async (req: Request, res: Response) => {
        const clientFacade = ClientAdmFacadeFactory.create();

        try {
            const {id, name, email, document, street, number, complement, city, state, zipCode} = req.body;
            const clientDto: AddClientFacadeInputDto = {
                id,
                name,
                email,
                document,
                street,
                number,
                complement,
                city,
                state,
                zipCode

            };
            await clientFacade.add(clientDto);

            const output = await clientFacade.find({id: clientDto.id});
            res.send(output);
            console.log(output);
        } catch (err) {
            res.status(500).send(err);
        }
    });

clientRoute.get("/:id", async (req: Request, res: Response) => {
    const clientadmFace = ClientAdmFacadeFactory.create();
    const output = await clientadmFace.find({id: req.params.id});

    res.format({
        json: async () => res.send(output)
    });
});
