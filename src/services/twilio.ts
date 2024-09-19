import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verificationSid = process.env.TWILIO_VERIFICATION_SID!;

const client = new Twilio(accountSid, authToken);

export const createVerification = async (mobile: string) => {
    const verification = await client.verify.v2
      .services(verificationSid)
      .verifications.create({
        channel: "sms",
        to: mobile,
      });
  
    return verification.sid;
};

export const checkVerificationCode = async (mobile: string, code: string) => {
  try {
      const verificationCheck = await client.verify.v2
        .services(verificationSid)
        .verificationChecks.create({
          to: mobile,
          code,
        });

      if (verificationCheck.status === 'approved') {
          return true;
      }
      return false;
  } catch (error) {
      console.error('Error checking verification code:', error);
      return false;
  }
};