import { Model } from "mongoose";
import { RequestHandlerWithID } from "../types";

export function DeleteDocumentByID<T>(model: Model<T>): RequestHandlerWithID {
    return (request, response) =>
        model
            .findByIdAndDelete(request.params.id)
            .then((document) =>
                document != null
                    ? response.send({
                          message: `${model.modelName} has been successfully deleted.`,
                      })
                    : response
                          .status(404)
                          .send({ message: `${model.modelName} isn't found.` }),
            )
            .catch(
                (error) => (
                    console.error(error), response.status(500).send(error)
                ),
            );
}
