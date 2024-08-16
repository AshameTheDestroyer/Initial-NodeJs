import { Router } from "express";
import {
    GetStudents,
    PostStudent,
    PatchStudent,
    GetStudentByID,
    DeleteAllStudents,
    DeleteStudentByID,
} from "./services";

export const STUDENT_ROUTE = "/student";
export const StudentRouter = Router();

StudentRouter.get(STUDENT_ROUTE, GetStudents);
StudentRouter.get(`${STUDENT_ROUTE}/:id`, GetStudentByID);

StudentRouter.post(STUDENT_ROUTE, PostStudent);

StudentRouter.patch(`${STUDENT_ROUTE}/:id`, PatchStudent);

StudentRouter.delete(STUDENT_ROUTE, DeleteAllStudents);
StudentRouter.delete(`${STUDENT_ROUTE}/:id`, DeleteStudentByID);
