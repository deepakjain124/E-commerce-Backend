const userdata = require("../models/users");
require("dotenv").config();
const express = require("express");
const app = new express();
require("../db/conn");
const updatetoken = require("../models/Tokenrefre");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authorization");

const getAllusers = async (req, res) => {
  try {
    const user = await userdata.find();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

const RegisterUSer = async (req, res) => {
  try {
    const confirmpassword = req.body.confirmpassword;
    const password = req.body.password;
    if (password === confirmpassword) {
      const user = await new userdata(req.body);
      const token = await user.generateAuthToken();
      const registered = await user.save();
      res.status(201).send(user);
    } else {
      res.send("password and confirmpassword are not same");
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

const LoginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const findbyemail = await userdata.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, findbyemail.password);
    const token = await findbyemail.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30000),
      httpOnly: true,
    });
    if (isMatch) {
      res.status(200).send(findbyemail);
    } else {
      res.status(400).send("passwrd are not matching");
    }
  } catch (error) {
    res.status(400).send("invalid login details");
  }
};
const tokenRefresh = async (req, res) => {
  try {
    const gettoken = await new updatetoken(req.body);
    const gettokenofuser = jwt.verify(
      gettoken.refreshToken,
      "thisismychannelofdeepakjaincomehererefreshtoken"
    );
    const { _id } = gettokenofuser;
    const accesstoken = jwt.sign(
      { _id: _id.toString() },
      "thisismychannelofdeepakjaincomehere",
      {
        // expiresIn: 120
      }
    );
    let profile = await userdata.findByIdAndUpdate(
      { _id: _id },
      { $set: { tokens: accesstoken } }
    );
    console.log(profile);
    res.status(200).send(profile);
  } catch (error) {
    console.log(error);
  }
};
const passwordChange =
  (auth,
  async (req, res) => {
    try {
      const { previouspassword, newPassword } = req.body;
      const authtoken = jwt.verify(
        req.headers["authorization"],
        "thisismychannelofdeepakjaincomehere"
      );
      const { _id } = authtoken;
      let getUserData = await userdata.find({ _id: _id });
      const isMatch = await bcrypt.compare(
        previouspassword,
        getUserData[0].password
      );
      let newData = { ...getUserData[0]._doc };
      if (isMatch && previouspassword !== newPassword) {
        newData = {
          ...newData,
          password: await bcrypt.hash(newPassword, 10),
          confirmpassword: await bcrypt.hash(newPassword, 10),
        };
        const updatedata = await userdata.findByIdAndUpdate(
          { _id: _id },
          newData
        );
        updatedata
          .save()
          .then(() => {
            console.log("kjh");
            res.status(200).send("change successfully");
          })
          .catch(() => {
            console.log("jhgh");
            res.status(400).send("There is some issue");
          });
      } else {
        res.status(400).send("previous and new password can not be same");
      }
    } catch (error) {}
  });
module.exports = {
  getAllusers,
  RegisterUSer,
  LoginUser,
  tokenRefresh,
  passwordChange,
  passwordChange,
};
