import jwt from 'jsonwebtoken';

interface UserPayload {
  email: string;
  verified: boolean;
}

export const getEmailFromToken = (token: string): string | null => {
  try {
    // Decode the token (you can also verify it if you have the secret or public key)
    const decoded = jwt.decode(token) as UserPayload;

    // Extract and return the email
    return decoded?.email || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getVerifiedFromToken = (token: string): boolean | null => {
  try {
    // Decode the token (you can also verify it if you have the secret or public key)
    const decoded = jwt.decode(token) as UserPayload;

    return decoded?.verified || false;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
