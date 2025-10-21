import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { TOTP, Secret } from "otpauth";

export const generateSecret = () => {
  return new Secret().hex;
};

export const verifyCode = (code: string, secret: string) => {
  const totpClient = new TOTP({
    secret: Secret.fromHex(secret),
  });

  const delta = totpClient.validate({ token: code, window: 1 });
  return delta;
};

export const getUrl = (secret: string, issuer: string, label: string) => {
  return new TOTP({
    secret: Secret.fromHex(secret),
    issuer,
    label,
  }).toString();
};

export const encryptSecret = (secret: string) => {
  const kek = process.env.TOTP_KEK!;
  const dek = randomBytes(32);
  const iv = randomBytes(16);

  const cipher = createCipheriv("aes-256-cbc", dek, iv);
  let encryptedSecret = cipher.update(secret, "hex", "hex");
  encryptedSecret += cipher.final("hex");

  const dekCipher = createCipheriv("aes-256-cbc", kek, Buffer.alloc(16, 0));
  let encryptedDek = dekCipher.update(dek.toString("hex"), "hex", "hex");
  encryptedDek += dekCipher.final("hex");

  return `${encryptedDek}:${encryptedSecret}:${iv}`;
};

export const decryptSecret = (encryptedString: string) => {
  const kek = process.env.TOTP_KEK!;
  const [encryptedDek, encryptedSecret, iv] = encryptedString.split(":");

  const dekDecipher = createDecipheriv("aes-256-cbc", kek, Buffer.alloc(16, 0));
  let decryptedDek = dekDecipher.update(encryptedDek, "hex", "hex");
  decryptedDek += dekDecipher.final("hex");

  const dek = Buffer.from(decryptedDek, "hex");
  const decipher = createDecipheriv("aes-256-cbc", dek, iv);
  let decryptedSecret = decipher.update(encryptedSecret, "hex", "hex");
  decryptedSecret += decipher.final("hex");

  return decryptedSecret;
};
