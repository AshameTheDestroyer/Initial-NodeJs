import { Model } from "mongoose";
import { RequestHandlerWithID } from "../types";

export function GetDocumentByID<T>(
    model: Model<T>,
    ...fields: Array<`${"" | "+" | "-"}${Exclude<keyof T, symbol>}`>
): RequestHandlerWithID {
    return (request, response) =>
        model
            .findById(request.params.id)
            .select(fields)
            .then((document) =>
                document != null
                    ? response.send(document)
                    : response
                          .status(404)
                          .send({ message: `${model.modelName} isn't found.` }),
            )
            .catch((error) => response.status(500).send(error));
}
