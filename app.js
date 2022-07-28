const express = require("express");
const app = express();
const cors = require("cors");
const { Login, Product, transaction_Header,transaction_Detail } = require("./models");

const { generateToken, verifyToken } = require("./helpers/jwt");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", async (req, res) => {
  const { user, password } = req.body;
  const newUser = {
    user,
    password,
  };

  try {
    const registerUser = await Login.create(newUser);
    res.status(201).json({
      message: "User created successfully",
      id: registerUser.id,
      user: registerUser.user,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ message: error.errors[0].message });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: "internal server error" });
    }
    //   console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;
    if (!user) {
      throw { name: "userReq" };
    }
    if (!password) {
      throw { name: "passReq" };
    }

    const findUser = await Login.findOne({
      where: {
        user,
      },
    });
    if (!findUser) {
      throw { name: "Unauthorized" };
    }

    const payload = {
      user: findUser.user,
      id: findUser.id,
    };
    const access_token = generateToken(payload);

    res.status(200).json({
      access_token: access_token,
      user: findUser.user,
    });
  } catch (error) {
    if (error.name === "userReq") {
      res.status(400).json({ message: "Username is required" });
    } else if (error.name === "passReq") {
      res.status(400).json({ message: "Password is required" });
    } else if (error.name === "Unauthorized") {
      res.status(401).json({ message: "Invalid email/password" });
    } else {
      res.status(500).json({ message: "internal server error" });
    }
  }
});

app.get("/products", async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

app.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Bad request" };
    }

    const decoded = verifyToken(access_token);

    const findUser = await Login.findOne({
      where: {
        user: decoded.user,
      },
    });

    if (!findUser) {
      throw { name: "Unauthorized" };
    }

    req.userAccess = {
      id: decoded.id,
      user: decoded.user,
    };

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "Bad request") {
      res.status(400).json({ message: "Email/password required" });
    } else if (error.name === "Unauthorized") {
      res.status(401).json({ message: "Invalid email/password" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "internal server error" });
    }
  }
});

app.post("/transaction/:productName", async (req, res) => {
  try {
    const { productName } = req.params;
    const findProduct = await Product.findOne({
      where: { product_name: productName },
    });
    if (!findProduct) {
      throw { name: "Not Found" };
    }
    const document_code = "TRX";
    const allTransaction = await transaction_Header.findAll();
    const document_number = "0" + allTransaction.length + 1;
    const user = req.userAccess.user;
    const date = new Date();
    const quantity = req.body;
    const total = findProduct.price * parseInt(quantity.quantity);

    await transaction_Header.create({
      document_code,
      document_number,
      user,
      total,
      date,
    });

    await transaction_Detail.create({
        document_code,
        document_number,
        product_code: findProduct.product_code,
        price: findProduct.price,
        quantity: parseInt(quantity.quantity),
        unit: findProduct.unit,
        sub_total: total,
        currency: findProduct.currency
    })
   
    res.status(201).json({
        message: "Transaction created successfully",
    })

  } catch (error) {
    if (error.name === "Not Found") {
        res.status(404).json({ message: '"Data not found"' });
      } else if (error.name === "SequelizeValidationError") {
        res.status(400).json({ message: error.errors[0].message });
      } else if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
  }
});

module.exports = app;
