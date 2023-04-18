const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    user = new User({ email, fullName, password: hashedPassword, history: [] });

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
    res.status(503).json({ ok: false, msg: "something happened" });
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

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    res.status(503).json({
      ok: false,
      msg: "User and password do not match",
    });
  }

  res.status(200).json({
    ok: true,
    user: { fullName: user.fullName, email: user.email, history: user.history },
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
    let user = await User.findOneAndUpdate(
      { _id: uid },
      { $push: { history: product } },
      { new: true }
    );

    return res.json({
      ok: true,
      user: {
        fullName: user.fullName,
        email: user.email,
        history: user.history,
      },
    });
  } catch (error) {
    return res.json({
      ok: false,
      msg: error,
    });
  }
};

module.exports = { createUser, loginUser, getUserById, addHistory };
