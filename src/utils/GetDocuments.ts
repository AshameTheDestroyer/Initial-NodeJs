import { Model } from "mongoose";
import { RequestHandler } from "express";
import { GetSortOptions } from "./GetSortOptions";
import { GetSearchOptions } from "./GetSearchOptions";
import { GetPaginationOptions } from "./GetPaginationOptions";

export function GetDocuments<T>(model: Model<T>): RequestHandler {
    return (request, response) =>
        model
            .listIndexes()
            .then((indexes) =>
                model
                    .find(
                        GetSearchOptions(request, indexes),
                        {},
                        GetPaginationOptions(request),
                    )
                    .sort(GetSortOptions(request))
                    .then((documents) =>
                        model
                            .countDocuments()
                            .then((totalCount) =>
                                response.send({ totalCount, data: documents }),
                            ),
                    ),
            )
            .catch((error) => response.status(500).send(error));
}
