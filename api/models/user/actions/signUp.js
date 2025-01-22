import { applyParams, save, ActionOptions, ActionRun, ActionOnSuccess } from "gadget-server";

 
export const run = async ({ params, record, logger, api, session }) => {
  logger.info({ params }, "Processing user signup request");

 
  applyParams(params, record);
  record.lastSignedIn = new Date();
  await save(record);
  if (record.emailVerified) {
    logger.info({ userId: record.id }, "Email pre-verified, setting session");
    session?.set("user", { _link: record.id });
  }

  logger.info({ userId: record.id }, "User signup successful");
  return { result: "ok" };
};

 
export const onSuccess = async ({ params, record, logger, api, session }) => {
  if (!record.emailVerified) {
    logger.info({ email: record.email }, "Sending verification email");
    await api.user.sendVerifyEmail({ email: record.email });
  }
};

export const options = {
  actionType: "create",
  returnType: true,
  triggers: {
    googleOAuthSignUp: true,
    emailSignUp: true,
  },
};
