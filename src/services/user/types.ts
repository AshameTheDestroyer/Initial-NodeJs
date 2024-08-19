import { UserSchema } from "./schema";
import { InferSchemaType } from "mongoose";

export type UserProps = Omit<InferSchemaType<typeof UserSchema>, `_${string}`>;
