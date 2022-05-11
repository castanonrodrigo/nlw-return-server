import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer_mail_adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma_feedbacks_repository";
import { SubmitFeedbackUseCase } from "./use_cases/submit_feedback_use_case";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
