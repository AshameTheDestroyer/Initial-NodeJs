import { RequestHandler } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";

export const ValidateAuthenticity: RequestHandler = (
    request,
    response,
    next,
) => {
    if (request.headers.authorization == null) {
        response.status(401).send({ message: "User is unauthenticated." });
        return;
    }

    try {
        const payload = Jwt.verify(
            request.headers.authorization.split(" ")[1],
            process.env["JWT_KEY"]!,
        );

        const _request = request as typeof request & { userID: string };
        const _payload = payload as (JwtPayload | string) & { userID: string };

        _request["userID"] = _payload["userID"];

        next();
    } catch {
        response.status(401).send({ message: "Invalide token." });
    }
};
