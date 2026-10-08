/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {Date} [createdAt]
 * @property {Date} [updatedAt]
 */

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string} authorId
 * @property {User} author
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {boolean} isLoading
 * @property {string|null} error
 * @property {(credentials: {email: string, password: string}) => Promise<{success: boolean, error?: string}>} login
 * @property {(userData: {email: string, password: string, name: string}) => Promise<{success: boolean, error?: string}>} register
 * @property {() => void} logout
 */