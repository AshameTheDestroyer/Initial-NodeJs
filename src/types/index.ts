import { RequestHandler } from "express";

export type RequestHandlerWithID = RequestHandler<{ id: string }>;
