import expect from "expect";
import { GenerateCRUDableDocument } from "./GenerateCRUDableDocument";

export async function TestCRUDDocument(
    props: Omit<Parameters<typeof GenerateCRUDableDocument>[0], `on${string}`>,
) {
    const { CreateDocument, ReadDocument, UpdateDocument, DeleteDocument } =
        await GenerateCRUDableDocument({
            ...props,
            onCreate: async (response, json) => (
                expect(response.status).toEqual(201),
                expect(json).toHaveProperty("_id")
            ),
            onRead: async (response, json) => (
                expect(response.status).toEqual(200),
                expect(json).toHaveProperty("_id")
            ),
            onUpdate: async (response, json) => (
                expect(response.status).toEqual(200),
                expect(json).toHaveProperty("_id")
            ),
            onDelete: async (response, _json) =>
                expect(response.status).toEqual(200),
        });

    const ID = await CreateDocument();
    await ReadDocument(ID);
    await UpdateDocument(ID);
    await DeleteDocument(ID);
}
