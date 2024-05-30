const nodemailer = require("nodemailer");
const { sendMail } = require("../../controllers/mailer");

jest.mock("nodemailer");

describe("sendMail", () => {
  let transporterMock;

  beforeAll(() => {
    transporterMock = {
      sendMail: jest.fn((mailOptions, callback) => {
        callback(null, { response: "250 OK: message queued" });
      }),
    };

    nodemailer.createTransport.mockReturnValue(transporterMock);
  });

  it("should send an email successfully", async () => {
    const mailAddress = "test@example.com";
    const subject = "Test Subject";
    const mailBody = "<h1>Test Body</h1>";

    const response = await sendMail(mailAddress, subject, mailBody);
    expect(response).toBe("250 OK: message queued");
    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(transporterMock.sendMail).toHaveBeenCalledWith(
      {
        from: "feasfive5@gmail.com",
        to: mailAddress,
        subject: subject,
        html: mailBody,
      },
      expect.any(Function)
    );
  });

  it("should throw an error if mailAddress is not provided", async () => {
    expect.assertions(1);

    try {
      await sendMail(null, "Test Subject", "<h1>Test Body</h1>");
    } catch (e) {
      expect(e.message).toBe("Alıcı adresi belirtilmemiş.");
    }
  });

  it("should handle errors from nodemailer", async () => {
    const error = new Error("Failed to send email");
    transporterMock.sendMail.mockImplementationOnce((mailOptions, callback) => {
      callback(error, null);
    });

    expect.assertions(1);

    try {
      await sendMail("test@example.com", "Test Subject", "<h1>Test Body</h1>");
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});
