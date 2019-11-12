import {
  authDomain,
  authClientId
} from '../secret';

export const AUTH_KEYS = {
  domain: authDomain,
  clientId: authClientId,
  callbackUrl: 'http://localhost:3000/callback'
};
