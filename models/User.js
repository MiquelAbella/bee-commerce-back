const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    history: {
      type: Array,
      required: true,
    },
  },
  { minimize: false }
);

module.exports = model("User", UserSchema);
