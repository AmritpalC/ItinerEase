const jwt = require('jsonwebtoken')
const User = require ('../../models/user')
const bcrypt = require('bcrypt')

module.exports = {
  create,
  login,
  checkToken
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user)
    return res.json(token)
  } catch (err) {
    // Client will check for non-2xx status code 
    // 400 = Bad Request
    res.status(401).json(err);
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // extra data for the payload
    { user },
    process.env.SECRET,
    { expiresIn: '7d' }
  );
}