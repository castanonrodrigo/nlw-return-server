import { SubmitFeedbackUseCase } from "./submit_feedback_use_case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("Should be able to submit feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example content",
        screenshot: "data:image/png;base64 asdfasdf",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("Should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example content",
        screenshot: "data:image/png;base64 asdfasdf",
      })
    ).rejects.toThrow();
  });
  it("Should not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64 asdfasdf",
      })
    ).rejects.toThrow();
  });
  it("Should not be able to submit feedback with screenshot using invalid image format", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example content",
        screenshot: "wrong format",
      })
    ).rejects.toThrow();
  });
});
