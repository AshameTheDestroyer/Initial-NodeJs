import { Student } from "./schema";

export type StudentProps = Awaited<ReturnType<typeof Student.create>>[0];
