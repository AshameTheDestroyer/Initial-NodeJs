export async function GenerateCRUDableDocument(props: {
    route: string;
    createBody: Record<string, any>;
    updateBody?: Record<string, any>;
    Fetch: (props: {
        route: string;
        method: RequestMethod;
        body?: Record<string, any>;
    }) => Promise<Response>;
    onRead?: (response: Response, json: Record<string, any>) => void;
    onCreate?: (response: Response, json: Record<string, any>) => void;
    onUpdate?: (response: Response, json: Record<string, any>) => void;
    onDelete?: (response: Response, json: Record<string, any>) => void;
}) {
    async function CreateDocument() {
        const response = await props.Fetch({
            method: "POST",
            body: props.createBody,
            route: `${props.route}`,
        });

        const json = await response.json();
        props.onCreate?.(response, json);

        return json["_id"] as string;
    }

    async function ReadDocument(ID: string) {
        const response = await props.Fetch({
            method: "GET",
            route: `${props.route}/${ID}`,
        });

        const json = await response.json();
        props.onRead?.(response, json);
    }

    async function UpdateDocument(ID: string) {
        const response = await props.Fetch({
            method: "PATCH",
            body: props.updateBody ?? {},
            route: `${props.route}/${ID}`,
        });

        const json = await response.json();
        props.onUpdate?.(response, json);
    }

    async function DeleteDocument(ID: string) {
        const response = await props.Fetch({
            method: "DELETE",
            route: `${props.route}/${ID}`,
        });

        const json = await response.json();
        props.onDelete?.(response, json);
    }

    return {
        ReadDocument,
        CreateDocument,
        UpdateDocument,
        DeleteDocument,
    };
}
