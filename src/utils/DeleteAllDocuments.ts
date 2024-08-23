import { Model } from "mongoose";
import { RequestHandler } from "express";

export function DeleteAllDocuments<T>(model: Model<T>): RequestHandler {
    return (_request, response) =>
        model
            .deleteMany()
            .then((result) =>
                response.send({
                    message:
                        result.deletedCount +
                        ` ${model.modelName.toLowerCase()}(s) has been successfully deleted.`,
                }),
            )
            .catch(
                (error) => (
                    console.error(error), response.status(500).send(error)
                ),
            );
}
