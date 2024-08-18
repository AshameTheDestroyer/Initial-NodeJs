import { UserSchema } from "./schema";
import { InferSchemaType } from "mongoose";

export type UserProps = InferSchemaType<typeof UserSchema>;
