import bcrypt from "bcrypt";

const userController = (User) => {
  const getAllUsers = async (req, res) => {
    const { query } = req;
    const allUsers = await User.find(query);

    res.json(allUsers);
  };

  const postUsers = async (req, res) => {
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    res.json(user);
  };

  const loginUser = async (req, res) => {
    const { body } = req;
    const userDb = await User.findOne({ userName: body.userName });

    if (userDb && (await bcrypt.compare(body.password, userDb.password))) {
      res.status(200).json({
        status: 0,
        user: userDb,
      });
    } else {
      res.status(401).json({ status: 1, message: "Invalid credentials" });
    }
  };

  return { getAllUsers, postUsers, loginUser };
};

export default userController;
