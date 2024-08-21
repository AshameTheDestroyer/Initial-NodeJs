import expect from "expect";

export async function TestCRUDDocument(props: {
    route: string;
    createBody: Record<string, any>;
    updateBody: Record<string, any>;
    Fetch: (props: {
        route: string;
        method: RequestMethod;
        body?: Record<string, any>;
    }) => Promise<Response>;
}) {
    async function TestCreateDocument() {
        const response = await props.Fetch({
            method: "POST",
            body: props.createBody,
            route: `${props.route}`,
        });
        expect(response.status).toEqual(200);

        const json = await response.json();
        expect(json).toHaveProperty("_id");
        return json["_id"] as string;
    }

    async function TestReadDocument(ID: string) {
        const response = await props.Fetch({
            method: "GET",
            route: `${props.route}/${ID}`,
        });
        expect(response.status).toEqual(200);

        const json = await response.json();
        expect(json).toHaveProperty("_id");
    }

    async function TestUpdateDocument(ID: string) {
        const response = await props.Fetch({
            method: "PATCH",
            body: props.updateBody,
            route: `${props.route}/${ID}`,
        });
        expect(response.status).toEqual(200);

        const json = await response.json();
        expect(json).toHaveProperty("_id");
    }

    async function TestDeleteDocument(ID: string) {
        const response = await props.Fetch({
            method: "DELETE",
            route: `${props.route}/${ID}`,
        });
        expect(response.status).toEqual(200);
    }

    const ID = await TestCreateDocument();
    await TestReadDocument(ID);
    await TestUpdateDocument(ID);
    await TestDeleteDocument(ID);
}
