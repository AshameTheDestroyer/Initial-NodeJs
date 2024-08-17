import { Model } from "mongoose";
import { RequestHandlerWithID } from "../types";

export function GetDocumentByID<T>(model: Model<T>): RequestHandlerWithID {
    return (request, response) =>
        model
            .findById(request.params.id)
            .then((document) =>
                document != null
                    ? response.send(document)
                    : response
                          .status(404)
                          .send({ message: `${model.modelName} isn't found.` }),
            )
            .catch((error) => response.status(500).send(error));
}
