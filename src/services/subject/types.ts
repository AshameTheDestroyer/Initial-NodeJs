import { SubjectSchema } from "./schema";
import { InferSchemaType } from "mongoose";

export type SubjectProps = InferSchemaType<typeof SubjectSchema>;
