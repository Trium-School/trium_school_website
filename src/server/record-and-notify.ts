import { sendNotificationEmail } from "./email-smtp";
import {
  saveSubmission,
  setSubmissionEmailStatus,
  type FormType,
} from "./submissions-db";

type Notification = Parameters<typeof sendNotificationEmail>[0];

export async function recordAndNotify(input: {
  formType: FormType;
  name: string;
  email: string;
  phone: string;
  details: Record<string, unknown>;
  notification: Notification;
}) {
  // First save the form to MySQL.
  const id = await saveSubmission({
    formType: input.formType,
    name: input.name,
    email: input.email,
    phone: input.phone,
    details: input.details,
  });

  // Email runs separately so SMTP doesn't block submission.
  void (async () => {
    let emailSent = false;
    let errorCode: string | null = null;

    try {
      await sendNotificationEmail(input.notification);
      emailSent = true;
    } catch (error) {
      errorCode =
        typeof error === "object" && error !== null && "code" in error
          ? String(error.code).slice(0, 64)
          : "UNKNOWN";

      console.error(`${input.formType}.email.failed`, {
        id,
        errorCode,
      });
    }

    try {
      await setSubmissionEmailStatus(
        id,
        emailSent ? "sent" : "failed",
        errorCode,
      );
    } catch (error) {
      console.error("submission.status.failed", {
        id,
        code:
          typeof error === "object" && error !== null && "code" in error
            ? String(error.code)
            : "UNKNOWN",
      });
    }
  })();

  return {
    ok: true,
    id,
    saved: true,
    emailStatus: "pending" as const,
    message: "Your submission has been saved successfully.",
  };
}
