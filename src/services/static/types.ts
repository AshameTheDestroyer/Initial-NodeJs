import { FileSchema } from "./schema";
import { InferSchemaType } from "mongoose";

export type FileProps = InferSchemaType<typeof FileSchema>;
