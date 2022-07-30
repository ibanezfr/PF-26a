const { User } = require("../db");

const setAdmin = async (req, res) => {
  const { id } = req.params;

  let setAdmin = true;
  try {
    const user = await User.findOne({ where: { id: id } });
    if (user.isAdmin) {
      setAdmin = false;
    }
    const newAdmin = await User.update(
      {
        isAdmin: setAdmin,
      },
      { where: { id: id } }
    );
    return res.status(200).send(newAdmin);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll();
    if (!user) {
      return res.status(404).send("Users Not Found");
    }

    const userData = user.map((e) => {
      const format = {
        id: e.id,
        fullName: e.fullName,
        image: e.image,
        email: e.email,
        banned: e.banned === false ? "Active" : "Banned",
        admin: e.isAdmin === false ? "User" : "Admin",
      };
      return format;
    });

    return res.status(200).send(userData);
  } catch (error) {
    res.status(404).send(error);
  }
};

const disableAccount = async (req, res) => {
  const { id } = req.params;
  let ban = true;

  try {
    const user = await User.findOne({ where: { id: id } });

    if (user.banned) {
      ban = false;
    }

    const disabledAcc = await User.update(
      {
        banned: ban,
      },
      { where: { id: id } }
    );
    return res.status(201).send(disabledAcc);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { admin, banned } = req.body;

  try {
    console.log(admin);
    console.log(banned);
    // let setAdmin;
    // let setBan;

    // if (admin === "User") {
    //   let setAdmin = false;
    // }
    // if (admin === "Admin") {
    //   let setAdmin = true;
    // }
    // if (banned === "Active") {
    //   let setBan = false;
    // }
    // if (banned === "Banned") {
    //   let setBan = true;
    // }

    const updated = await User.update(
      {
        banned: banned === "Active" ? false : true,
        isAdmin: admin === "User" ? false : true,
      },
      { where: { id: id } }
    );

    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send("error");
  }
};

module.exports = { getAllUsers, disableAccount, setAdmin, updateStatus };
