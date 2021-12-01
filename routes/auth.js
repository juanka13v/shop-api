const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const saveUser = await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("wrong credentials");

    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const passwordCryp = hashedPassword.toString(CryptoJs.enc.Utf8);

    if (passwordCryp !== req.body.password)
      return res.status(401).json("wrong credentials");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...data } = user._doc;

    res.status(200).json({ data, accessToken });
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
});

module.exports = router;
