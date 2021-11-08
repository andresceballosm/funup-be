import crypto from 'crypto';

const IV_LENGTH = 16;

const encrypt = (text: string) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-ctr',
    Buffer.from(process.env.ENCRYPTION_SECRET || '', 'hex'),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (text: string) => {
  const textParts: string[] = text.includes(':') ? text.split(':') : [];
  const iv = Buffer.from(textParts.shift() || '', 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    Buffer.from(process.env.ENCRYPTION_SECRET || '', 'hex'),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export { encrypt, decrypt };
