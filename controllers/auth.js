const User = require("../models/User");

const register = async (req, res) => {
  try {
    const user = await User.create({...req.body});
    const token = user.createJWT()
    res.status(200).json({user: user.name, token})
  } catch (err) {
    res.status(500).json(err)
  }
}

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password) {
      res.status(400).json({errMsg: "Email and Password fields cannot be empty"})
    }
    const user = await User.findOne({email}) 
    if(!user) {
      res.status(404).json({errMsg: "Email ain't registered!!"})
    }

    const isMatch = await user.comparePassword(password)
    if(!isMatch) {
      res.status(400).json({errMsg: "Incorrect password...!!"})
    }
    const token = user.createJWT()
    res.status(200).json({user: user.name, token})

  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  register, login
}