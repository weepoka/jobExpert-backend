import jwt from "jsonwebtoken";

export const createToken = (
  payload: any,
  keyType: "ACCESS" | "REFRESH" | "OTP"
) => {
  if (keyType === "ACCESS") {
    return jwt.sign(payload, process.env.AUTH_TOKEN!, {
      expiresIn: process.env.AUTH_TOKEN_EXPIRES_IN! || "15m",
    });
  } else if (keyType === "REFRESH") {
    return jwt.sign(payload, process.env.REFRESH_TOKEN!, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN! || "7d",
    });
  }

  return jwt.sign(payload, process.env.OTP_TOKEN!, {
    expiresIn: process.env.OTP_TOKEN_EXPIRES_IN! || "2m",
  });
};
