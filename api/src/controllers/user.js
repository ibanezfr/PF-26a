const { User } = require("../db");

const register = async (req, res, next) => {
  const { id, fullName, email, image } = req.body;
  try {
    const userExist = await User.findOne({ where: { email: email } });
    if (!userExist) {
      await User.create({
        id: id,
        email: email,
        fullName: fullName,
        image: image,
      });
    }
    return res.status(200).send({ msg: "Signed in Successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { fullName, email, id, image } = req.body;

  try {
    const userExist = await User.findOrCreate({
      where: { id: id },
      defaults: {
        email: email,
        fullName: fullName,
        id: id,
        image: image,
      },
    });
    console.log(userExist);
    res.status(200).send(userExist);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id: id },
      include: { all: true },
    });

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    return res.status(200).send(user);
  } catch (error) {
    console.log("error:", error);
    res.status(404).send(error);
  }
};

const updateUser = async () => {
  const { id } = req.params;
  const { fullName, email, image } = req.body;
  try {
    const updated = await User.update(
      {
        fullName: fullName,
        email: email,
        image: email,
      },
      { where: { id: id } }
    );
    return res.status(202).send(updated);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUser,
  updateUser,
};
