import { UserSchema } from "./schema";
import { InferSchemaType } from "mongoose";

export type UserProps = StrictOmit<
    InferSchemaType<typeof UserSchema>,
    "_resetToken" | "_resetTokenExpirationDate"
>;
