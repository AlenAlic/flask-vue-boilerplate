import decode from "jwt-decode";
import { backendServer } from "./util/servers";

/**
 * @typedef {Object} AuthenticatedUser
 * @property {number} id
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {Date} expiresAt
 * @property {Date} issuedAt
 * @property {EncodedJwtToken} token
 */

export class AuthenticatedUser {
  /** @member {EncodedJwtToken} */
  token;
  /** @member {number} */
  id;
  /** @member {string} */
  email;
  /** @member {string} */
  firstName;
  /** @member {string} */
  lastName;
  /** @member {Date} */
  expiresAt;
  /** @member {Date} */
  issuedAt;

  /**
   * @param {EncodedJwtToken} token
   */
  constructor(token) {
    this.token = token;
    const data = decode(token);
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    // Assumption: exp and iat fields are number of milliseconds since 1970
    this.expiresAt = new Date(data.exp * 1000);
    this.issuedAt = new Date(data.iat * 1000);
  }

  /**
   * Gets the full name of the user
   * @returns {string}
   */
  get fullName() {
    return this.firstName + " " + this.lastName;
  }

  /**
   * Indicates if the authenticated user instance is valid; requirements are:
   * - expiration moment is in the future
   * - issue moment before expiration moment
   * @returns {boolean}
   */
  get isValid() {
    return this.expiresAt > new Date() && this.expiresAt > this.issuedAt;
  }
}

export const authApi = {
  /**
   * Starts a new authenticated user session
   * @param {string} email - The email of the user that identifies them.
   * @param {string} password - The password to login with.
   * @param {boolean} remember_me - Toggle if the user should be remembered (longer lasting token)
   * @returns {Promise<void>}
   */
  async login(email, password, remember_me = false) {
    return await backendServer.post(`/auth/login`, {
      email: email,
      password: password,
      remember_me: remember_me
    });
  },
  /**
   * Ends the active user session
   * The interceptors are expected to inject the session token of the session that will be ended.
   * @returns {Promise<void>}
   */
  async logout() {
    await backendServer.delete(`/auth/logout`);
  },
  /**
   * Renews the authenticated user session, returns an updated token
   * @returns {Promise<AuthenticatedUser>}
   */
  async renew() {
    return await backendServer.get(`auth/renew`);
  },
  /**
   * Activates a user's account with a given activation token.
   * @param {string} activationToken
   * @returns {Promise<void>}
   */
  async verifyActivationToken(activationToken) {
    return await backendServer.get(`/auth/activate/${activationToken}`);
  },
  /**
   * Activates a user's account with a given activation token.
   * @param {string} token
   * @param {string} password - The password to login with.
   * @param {string} repeat_password - Repeat of the newly set password.
   * @returns {Promise<void>}
   */
  async activate(token, password, repeat_password) {
    return await backendServer.post(`/auth/activate/${token}`, {
      password: password,
      repeat_password: repeat_password
    });
  },
  /**
   * Sends a request for to reset a user's password.
   * @param {string} email
   * @returns {Promise<void>}
   */
  async resetPasswordRequest(email) {
    return await backendServer.post(`/auth/password/reset`, {
      email
    });
  },
  /**
   * Reset a user's password with a given token.
   * @param {string} token
   * @param {string} password - The password to login with.
   * @param {string} repeat_password - Repeat of the newly set password.
   * @returns {Promise<void>}
   */
  async resetPassword(token, password, repeat_password) {
    return await backendServer.patch(`/auth/password/reset/${token}`, {
      password,
      repeat_password
    });
  }
};
