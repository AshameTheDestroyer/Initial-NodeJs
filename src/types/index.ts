import { Model } from "mongoose";
import { RequestHandler } from "express";

export type RequestHandlerWithID = RequestHandler<{ id: string }>;

export type UnwrapModel<T extends Model<unknown>["create"]> = Awaited<
    ReturnType<T>
>[0];
