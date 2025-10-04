const express = require("express");
const books = require("./booksdb.js");
const users = require("./auth_users.js").users;
const public_users = express.Router();

// Register new user (Task 6)
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  if (users.find((user) => user.username === username))
    return res
      .status(400)
      .json({
        message: "Username already exists. Please choose a different one.",
      });

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully." });
});

// Get all books
public_users.get("/", (req, res) => res.status(200).json(books));

// Get book by ISBN (Task 2)
public_users.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });
  return res.status(200).json(books[isbn]);
});

// Get books by author (Task 3)
public_users.get("/author/:author", (req, res) => {
  const author = decodeURIComponent(req.params.author);
  const filtered = Object.values(books).filter(
    (book) => book.author === author
  );
  if (filtered.length === 0)
    return res.status(404).json({ message: "Books by this author not found" });
  return res.status(200).json(filtered);
});

// Get books by title (Task 4)
public_users.get("/title/:title", (req, res) => {
  const title = decodeURIComponent(req.params.title);
  const filtered = Object.values(books).filter((book) => book.title === title);
  if (filtered.length === 0)
    return res.status(404).json({ message: "Books for this title not found" });
  return res.status(200).json(filtered);
});

// Get book reviews (Task 5)
public_users.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
