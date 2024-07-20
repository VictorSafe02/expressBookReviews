const express = require("express");
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
  // Filter the users array for any user with the same username
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
};

// Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!doesExist(username)) {
      // Add the new user to the users array
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: "Unable to register user." });
});

//Get the book list available in the shop
// public_users.get("/", function (req, res) {
//   //Write your code here
//   res.send(JSON.stringify({ books }, null, 4));
// });

public_users.get("/", function (req, res) {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 6000);
  })
    .then((data) => {
      res.send(JSON.stringify(data, null, 4));
    })
    .catch((error) =>
      res.status(500).send("Cannot get books: " + error.message)
    );
});

// Get book details based on ISBN
// public_users.get("/id/:id", function (req, res) {
//   //Write your code here

//   const id = req.params.id;
//   const book = books[id];
//   if (book) {
//     res.send(JSON.stringify({ book }, null, 4));
//   } else {
//     res.status(404).send("Book not found");
//   }
// });

public_users.get("/id/:id", function (req, res) {
  const id = req.params.id;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = books[id];
      if (book) {
        resolve(book);
      } else {
        reject(new Error("Book not found"));
      }
    }, 6000);
  })
    .then((book) => {
      res.send(JSON.stringify(book, null, 4));
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
});

// Get book details based on author
// public_users.get("/author/:author", function (req, res) {
//   //Write your code here

//   // const author = req.params.author;
//   // Object.keys(books).forEach((key) => {
//   //   if (books[key].author === author) {
//   //     const book = books[key];
//   //     res.send(JSON.stringify({ book }, null, 4));
//   //   }
//   // });

//   const author = req.params.author;
//   const matchingBooks = [];

//   Object.keys(books).forEach((key) => {
//     if (books[key].author === author) {
//       matchingBooks.push(books[key]);
//     }
//   });

//   if (matchingBooks.length > 0) {
//     res.send(JSON.stringify({ matchingBooks }, null, 4));
//   } else {
//     res.status(404).send("No books found by the specified author");
//   }
// });

public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      const matchingBooks = [];

      for (const key in books) {
        if (books[key].author === author) {
          matchingBooks.push(books[key]);
        }
      }

      if (matchingBooks.length > 0) {
        resolve(matchingBooks);
      } else {
        reject(new Error("No books found by the specified author"));
      }
    }, 6000);
  })
    .then((matchingBooks) => {
      res.send(JSON.stringify(matchingBooks, null, 4));
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
});

// Get all books based on title
// public_users.get("/title/:title", function (req, res) {
//   //Write your code here
//   const title = req.params.title;

//   Object.keys(books).forEach((key) => {
//     if (books[key].title === title) {
//       res.send(JSON.stringify(books[key], null, 4));
//     } else {
//       res.status(404).send("No books found by the specified title");
//     }
//   });
// });

public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      const matchingBooks = [];

      for (const key in books) {
        if (books[key].title === title) {
          matchingBooks.push(books[key]);
        }
      }

      if (matchingBooks.length > 0) {
        resolve(matchingBooks);
      } else {
        reject(new Error("No books found by the specified title"));
      }
    }, 6000);
  })
    .then((matchingBooks) => {
      res.send(JSON.stringify(matchingBooks, null, 4));
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
});

//  Get book review
public_users.get("/reviews/:id", function (req, res) {
  //Write your code here

  const id = req.params.id;

  const book = books[id];
  if (book) {
    res.send(JSON.stringify(book.reviews, null, 4));
  } else {
    res.status(404).send("Book not found");
  }
});

module.exports.general = public_users;
