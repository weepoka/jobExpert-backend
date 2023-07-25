import { User } from "modules/auth/model";

export const generateRandomUID = async (): Promise<string> => {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const uidLength = 6;
  const maxAttempts = 10;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let uid = "";
    for (let i = 0; i < uidLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uid += characters[randomIndex];
    }
    const existingUser = await User.findOne({ uid });

    if (!existingUser) {
      return uid;
    }
  }

  throw new Error("Failed to generate a unique UID after maximum attempts.");
};
