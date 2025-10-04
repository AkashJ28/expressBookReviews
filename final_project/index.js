const express = require("express");
const jwt = require("jsonwebtoken");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();
app.use(express.json());

const PORT = 3000;

// JWT Authentication middleware
app.use("/customer/auth/*", function auth(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer <token>"
  if (!authHeader)
    return res.status(401).json({ message: "User not logged in" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "access", (err, user) => {
    if (err) return res.status(403).json({ message: "User not authenticated" });
    req.user = user; // store username for later
    next();
  });
});

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
