import { Model } from "mongoose";
import { RequestHandler } from "express";

export function PostDocument<T>(model: Model<T>): RequestHandler {
    return (request, response) =>
        new model(request.body)
            .save()
            .then((document) => response.send(document))
            .catch((error) => response.status(500).send(error));
}
