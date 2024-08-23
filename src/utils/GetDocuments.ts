import { Model } from "mongoose";
import { RequestHandler } from "express";
import { GetSortOptions } from "./GetSortOptions";
import { GetSearchOptions } from "./GetSearchOptions";
import { GetPaginationOptions } from "./GetPaginationOptions";

export function GetDocuments<T>(
    model: Model<T>,
    ...fields: Array<`${"" | "+" | "-"}${Exclude<keyof T, symbol>}`>
): RequestHandler {
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
                    .select(fields)
                    .sort(GetSortOptions(request))
                    .then((documents) => documents)
                    .then((documents) =>
                        model
                            .countDocuments()
                            .then((totalCount) =>
                                response.send({ totalCount, data: documents }),
                            ),
                    ),
            )
            .catch(
                (error) => (
                    console.error(error), response.status(500).send(error)
                ),
            );
}
