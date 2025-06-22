import User from "../models/user.js";

export const findOrCreateUser = async ({
  email,
  username,
  password,
  avatar = "",
}) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, username, password, avatar });
    return [user, true];
  }
  return [user, false];
};

export const update_user = async (id, updateParams, options = {}) => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: updateParams,
    },
    options
  );

  await user.save();
  return user;
};

export const delete_User = (id, options = {}) => {
  return User.findByIdAndDelete(id, options);
};

export const findUser = (findParams) => {
  return User.findOne(findParams);
};
