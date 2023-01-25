import request from "supertest";
import {app, sequelize} from "../../express";

describe("E2E test for client adm", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const response = await request(app).post("/clients")
            .send({
                id: "1",
                name: "Client 1",
                email: "xx@gmil.com",
                document: "0000",
                street: "My Street",
                number: "132",
                complement: "aaaaa",
                city: "New York",
                state: "Kingston",
                zipCode: "12401",

            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Client 1");
        expect(response.body.email).toBe("xx@gmil.com");
        expect(response.body.document).toEqual("0000");
        expect(response.body.street).toBe("My Street");
        expect(response.body.complement).toBe("aaaaa");
        expect(response.body.city).toBe("New York");
        expect(response.body.state).toBe("Kingston");
        expect(response.body.number).toBe("132");
        expect(response.body.zipCode).toBe("12401");
    });
});