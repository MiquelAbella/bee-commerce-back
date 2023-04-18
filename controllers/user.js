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
    console.log(user);
    await user.save();

    res.status(200).json({
      ok: true,
      user: {
        fullName: user.fullName,
        email: user.email,
        history: user.history,
      },
    });
  } catch (error) {
    res.status(503).json({ ok: false, msg: error });
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

const addHistory = async (req, res) => {
  const { uid, product } = req.body;

  try {
    let user = await User.findOne({ _id: uid });

    user.history.push(product);

    await user.save();

    return res.json({
      ok: true,
      user,
    });
  } catch (error) {
    return res.json({
      ok: false,
      msg: error,
    });
  }
};

module.exports = { createUser, loginUser, getUserById, addHistory };
