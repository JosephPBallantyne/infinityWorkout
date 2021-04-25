import crypto from 'crypto';

export const createToken = (digits: number = 32): string => {
  let token;
  do {
    // Ensure the length of token is fixed length
    token = crypto.randomBytes(digits).toString('base64').replace(/\W/g, '');
  } while (token.length !== digits);

  return token;
};

export default createToken;
