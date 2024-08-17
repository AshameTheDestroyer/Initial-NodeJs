import { Model } from "mongoose";
import { RequestHandlerWithID } from "../types";

export function PatchDocument<T>(model: Model<T>): RequestHandlerWithID {
    return (request, response) =>
        model
            .findByIdAndUpdate(request.params.id, request.body, { new: true })
            .then((document) =>
                document != null
                    ? response.send({
                          message: `${model.modelName} has been successfully updated.`,
                      })
                    : response
                          .status(404)
                          .send({ message: `${model.modelName} isn't found.` }),
            )
            .catch((error) => response.status(500).send(error));
}
