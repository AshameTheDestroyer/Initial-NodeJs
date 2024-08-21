import { RequestHandler } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";

export const ValidateAuthenticity: RequestHandler = (
    request,
    response,
    next,
) => {
    if (request.headers.authorization == null) {
        response.status(400).send({ message: "User is unauthenticated." });
        return;
    }

    try {
        const payload = Jwt.verify(
            request.headers.authorization.split(" ")[1],
            process.env["JWT_KEY"]!,
        );

        const _request = request as typeof request & { userId: string };
        const _payload = payload as (JwtPayload | string) & { userId: string };

        _request["userId"] = _payload["userId"];

        next();
    } catch {
        response.status(401).send({ message: "Invalide token." });
    }
};
