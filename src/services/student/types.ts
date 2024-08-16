import { StudentModel } from "./schema";

export type StudentProps = Awaited<ReturnType<typeof StudentModel.create>>[0];
