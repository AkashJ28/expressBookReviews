const express = require("express");
const jwt = require("jsonwebtoken");
const books = require("./booksdb.js");

const regd_users = express.Router();
let users = []; // store registered users

// Check username/password
const authenticatedUser = (username, password) => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

// Login (Task 7)
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  if (!authenticatedUser(username, password))
    return res.status(401).json({ message: "Invalid username or password." });

  const token = jwt.sign({ username }, "access", { expiresIn: "1h" });
  return res.status(200).json({ message: "Logged in successfully", token });
});

// Add or update review (Task 8)
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.user.username; // from middleware
  const isbn = req.params.isbn;
  const review = req.query.review;
  if (!review)
    return res
      .status(400)
      .json({ message: "Review query parameter is required." });
  if (!books[isbn]) return res.status(404).json({ message: "Book not found." });

  books[isbn].reviews[username] = review;
  return res
    .status(200)
    .json({
      message: `Review for book with ISBN ${isbn} has been added/updated`,
    });
});

// Delete review (Task 9)
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = req.user.username; // from middleware
  const isbn = req.params.isbn;
  if (!books[isbn]) return res.status(404).json({ message: "Book not found." });
  if (!books[isbn].reviews[username])
    return res
      .status(404)
      .json({ message: "Review not found for this user and ISBN." });

  delete books[isbn].reviews[username];
  return res.status(200).json({ message: "Review deleted successfully." });
});

module.exports.authenticated = regd_users;
module.exports.users = users;
