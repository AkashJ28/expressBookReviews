const axios = require("axios");

const getAllBooks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/");
    console.log(response.data);
  } catch (err) {
    console.error(err.message);
  }
};

getAllBooks();

const getBookByISBN = async (isbn) => {
  try {
    const response = await axios.get(`http://localhost:3000/isbn/${isbn}`);
    console.log(response.data);
  } catch (err) {
    console.error(err.message);
  }
};
getBookByISBN(3);

const getBooksByAuthor = async (author) => {
  try {
    const encodedAuthor = encodeURIComponent(author);
    const response = await axios.get(
      `http://localhost:3000/author/${encodedAuthor}`
    );
    console.log(response.data);
  } catch (err) {
    console.error(err.message);
  }
};
getBooksByAuthor("Dante Alighieri");

const getBooksByTitle = async (title) => {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await axios.get(
      `http://localhost:3000/title/${encodedTitle}`
    );
    console.log(response.data);
  } catch (err) {
    console.error(err.message);
  }
};
getBooksByTitle("Things Fall Apart");
