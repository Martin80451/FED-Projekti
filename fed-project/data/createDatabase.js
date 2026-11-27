import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("database.db");

console.log("Connected to the SQLite database successfully!");

db.exec(`CREATE TABLE IF NOT EXISTS Users (
    UserId VARCHAR(255) PRIMARY KEY,
    UserName VARCHAR(255) NOT NULL UNIQUE,
    Role VARCHAR(255) NOT NULL,
    MembershipStatus VARCHAR(255) NOT NULL
  )`);

db.exec(`CREATE TABLE IF NOT EXISTS Orders (
    OrderId VARCHAR(255) PRIMARY KEY,
    Category VARCHAR(255),
    Price FLOAT NOT NULL,
    Publisher VARCHAR(255) NOT NULL,
    PublicationYear INT,
    Condition VARCHAR(255)
  )`);

db.exec(`CREATE TABLE IF NOT EXISTS Authors (
    AuthorId VARCHAR(255) PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    DateOfBirth DATE,
    Nationality VARCHAR(255),
    Biography VARCHAR(255)
  )`);

db.exec(`CREATE TABLE IF NOT EXISTS ComicBooks (
    BookId VARCHAR(255) PRIMARY KEY,
    Category VARCHAR(255) NOT NULL,
    Price FLOAT NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Publisher VARCHAR(255),
    Condition VARCHAR(255)
  )`);

db.exec(`CREATE TABLE IF NOT EXISTS UserComicBooks (
    UserId VARCHAR(255) NOT NULL,
    BookId VARCHAR(255) NOT NULL,
    PRIMARY KEY (UserId, BookId),
    CONSTRAINT FkUserId FOREIGN KEY (UserId) REFERENCES Users(UserId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FkBookId FOREIGN KEY (BookId) REFERENCES ComicBooks(BookId)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
  )`);

db.exec(`CREATE TABLE IF NOT EXISTS ComicBookAuthors (
    AuthorId VARCHAR(255) NOT NULL,
    BookId VARCHAR(255) NOT NULL,
    PRIMARY KEY (AuthorId, BookId),
    CONSTRAINT FkAuthorId FOREIGN KEY (AuthorId) REFERENCES Authors(AuthorId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FkBookId FOREIGN KEY (BookId) REFERENCES ComicBooks(BookId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
  )`);

db.exec(`CREATE TABLE IF NOT EXISTS OrderItems (
    OrderId VARCHAR(255) NOT NULL,
    BookId VARCHAR(255) NOT NULL,
    PRIMARY KEY (OrderId, BookId),
    CONSTRAINT OrderId FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FkBookId FOREIGN KEY (BookId) REFERENCES ComicBooks(BookId)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
  )`);

console.log("Creation of database instance successful!");

db.close();
