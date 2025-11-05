CREATE DATABASE BookDB;
CREATE TABLE Users (
    username VARCHAR(50) PRIMARY KEY,
    displayName VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Books (
    bookID SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    pubDate DATE NOT NULL,
    rating FLOAT NOT NULL
);

CREATE TABLE Reviews (
    reviewID SERIAL PRIMARY KEY,
    bookID INT REFERENCES Books(bookID) ON DELETE CASCADE,
    author VARCHAR(50) REFERENCES Users(username) ON DELETE CASCADE,
    reviewText TEXT NOT NULL,
    reviewTitle VARCHAR(100) NOT NULL,
    rating INT NOT NULL
);