import { Router } from "express";
import { ValidateAuthenticity, ValidateAuthority } from "../../middleware";
import {
    GetSubjects,
    PostSubject,
    PatchSubject,
    GetSubjectByID,
    DeleteAllSubjects,
    DeleteSubjectByID,
} from "./services";

export const SUBJECT_ROUTE = "/subject";
export const SubjectRouter = Router();

SubjectRouter.get(SUBJECT_ROUTE, ValidateAuthenticity, GetSubjects);
SubjectRouter.get(`${SUBJECT_ROUTE}/:id`, ValidateAuthenticity, GetSubjectByID);

SubjectRouter.post(SUBJECT_ROUTE, ValidateAuthenticity, PostSubject);

SubjectRouter.patch(`${SUBJECT_ROUTE}/:id`, ValidateAuthenticity, PatchSubject);

// UNTESTED!
SubjectRouter.delete(
    SUBJECT_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority("admin"),
    DeleteAllSubjects,
);
SubjectRouter.delete(
    `${SUBJECT_ROUTE}/:id`,
    ValidateAuthenticity,
    DeleteSubjectByID,
);
