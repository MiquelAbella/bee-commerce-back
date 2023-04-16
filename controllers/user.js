const User = require("../models/User");
// const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.json("email and password required");
    }

    let user = await User.findOne({ email: email });

    if (user) {
      return res.json({
        ok: false,
        msg: "User already exist",
      });
    }

    user = new User(req.body);
    user.history = [];
    await user.save();

    res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    res.status(503).json("something happened");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email: email });

  if (!user) {
    return res.json({
      ok: false,
      msg: "user does not exist",
    });
  }

  const isValidPassword = user.password === password;

  if (!isValidPassword) {
    return res.json({
      ok: false,
      msg: "email and password do not match",
    });
  }
  user.password = undefined;

  res.status(200).json({
    ok: true,
    user,
  });
};

const getUserById = async (req, res) => {
  const { uid } = req.params;
  let user = await User.findOne({ _id: uid });
  console.log(user);

  if (!user) {
    return res.json({
      ok: false,
      msg: "user does not exist",
    });
  }

  user.password = undefined;

  res.status(200).json({
    ok: true,
    user,
  });
};

module.exports = { createUser, loginUser, getUserById };