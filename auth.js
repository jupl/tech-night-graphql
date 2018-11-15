/**
 * Simple (AND UNSAFE) auth implementation using cookies
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @return {Object} Auth implementation
 */
export const create = (req, res) => ({
  ok: () => req.headers.cookie
    ? req.headers.cookie.split(';').some(x => x.includes('Auth=1'))
    : false,
  on: () => { res.cookie('Auth', '1', {maxAge: 1000 * 60 * 10, httpOnly: true}) },
  off: () => { res.clearCookie('Auth') },
})
