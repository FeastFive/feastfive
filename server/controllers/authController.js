const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendActivationEmail, forgotPasswordEmail } = require("./mailer");

// register a new user
// route /api/users
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    // Validation
    if (!name || !surname || !email || !password) {
      console.log(name, surname, email, password);
      return res
        .status(400)
        .json({ state: "fail", message: "Please include all fields" });
    }

    // Find if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(401)
        .json({ state: "fail", message: "User already exists" });
    }

    const uniqueId = randString();

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name,
      surname,
      email,
      loginDate: new Date(),
      password: hashedPassword,
      uniqueId: uniqueId,
      role: "user",
    });

    if (user) {
      sendActivationEmail(user.uniqueId, user.email);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        loginDate: user.loginDate,
        uniqueId: user.uniqueId,
        token: generateToken(user._id),
        activated: false,
      });
    } else {
      res.status(400).json({ state: "fail", message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ state: "fail", message: "Server error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.activated) {
        user.loginDate = new Date();
        await user.save();

        const responseData = {
          _id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          address: user?.address || null,
          createdAt: user.createdAt,
          loginDate: user.loginDate,
          role: user.role,
          logs: user.logs,
          activated: user.activated,
        };

        res.status(200).json(responseData);
      } else {
        res
          .status(403)
          .json({ state: "fail", message: "Non activated account" });
      }
    } else {
      res.status(401).json({ state: "fail", message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ state: "fail", message: "Server error" });
  }
});

const editUser = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { id, name, surname, email } = req.body;

    // Find user by ID
    const user = await User.findById(id);

    console.log(user);

    if (user) {
      user.name = name || user.name;
      user.surname = surname || user.surname;
      // user.image = image || user.image;

      const updatedUser = await user.save();

      res.status(200).json({
        name: updatedUser.name,
        surname: updatedUser.surname,
        email: updatedUser.email,
      });
    } else {
      res.status(404).json({ state: "fail", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ state: "fail", message: "Server error" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const deletedUser = await User.findByIdAndDelete(id);

    if (deletedUser) {
      res.status(200).json({
        status: "success",
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({ status: "fail", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "fail", message: "Server error" });
  }
});

const forgotPassUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Please include all fields" });
    return;
  }

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }
    await forgotPasswordEmail(userExists.uniqueId, userExists.email);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const forgotPassRedirect = asyncHandler(async (req, res) => {
  try {
    const { uniqueId } = req.params;

    console.log("Activation code, uniqueId:", uniqueId);

    const user = await User.findOne({ uniqueId: uniqueId });

    if (user) {
      return res.redirect(
        `http://localhost:3000/changePassword?uniqueId=${uniqueId}`
      );
    } else {
      return res.status(404).json({ error: "User with provided ID not found" });
    }
  } catch (error) {
    console.error("Error activating account:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    // const { uniqueId } = req.query;
    const { uniqueId, newPassword } = req.body;
    console.log("uniqueId");
    console.log(uniqueId);

    if (!newPassword) {
      return res.status(400).json({ error: "Password does not exist" });
    }

    const user = await User.findOne({ uniqueId: uniqueId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password successfully changed" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const activateAccount = asyncHandler(async (req, res) => {
  try {
    const { uniqueId } = req.params;

    console.log("Activation code, uniqueId:", uniqueId);

    const user = await User.findOne({ uniqueId: uniqueId });

    if (user) {
      user.activated = true;
      await user.save();
      console.log(user);
      return res.redirect("http://localhost:3000/login");
    } else {
      return res.status(404).json({ error: "User with provided ID not found" });
    }
  } catch (error) {
    console.error("Error activating account:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//get restaurant
// route api/users/getOrders
const getOrders = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const order = await User.findById(id, {
      _id: 0,
      orders: 1,
    });

    console.log(order);

    if (!order) {
      res.status(404).json({ message: "No order found" });
      return;
    }

    res.status(200).json({
      orders: order,
    });
  } catch (error) {
    console.error("Error retrieving users from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const addAdress = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id, adress } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ state: "fail", message: "No user found by id" });
    }

    user.address.push(adress);

    await user.save();

    res
      .status(200)
      .json({ state: "success", message: "Address updated successfully" });
  } catch (error) {
    console.error("Error updating address in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getAdress = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  console.log(id);
  try {
    const user = await User.findById(id, {
      address: 1,
    });

    console.log(user);

    if (!user) {
      res.status(404).json({ message: "No user found" });
      return;
    }

    res.status(200).json({
      address: user,
    });
  } catch (error) {
    console.error("Error retrieving address from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const randString = () => {
  const len = 8;
  let randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10) + 1;
    randStr += ch;
  }
  return randStr;
};

//Generating a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  activateAccount,
  getOrders,
  editUser,
  deleteUser,
  addAdress,
  getAdress,
  forgotPassUser,
  forgotPassRedirect,
  changePassword,
};
