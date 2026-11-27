import { DatabaseSync } from "node:sqlite";
import fillDatabase from "./fillDatabase.js";

const db = new DatabaseSync("database.db");

console.log("Connected to the SQLite database successfully!");

db.exec(`CREATE TABLE IF NOT EXISTS Users (
    UserId VARCHAR(255) PRIMARY KEY,
    UserName VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Role VARCHAR(255) NOT NULL,
    MembershipStatus VARCHAR(255) NOT NULL
)`);

db.exec(`CREATE TABLE IF NOT EXISTS Orders (
    OrderId VARCHAR(255) PRIMARY KEY,
    Date DATE NOT NULL,
    Price FLOAT NOT NULL,
    Status VARCHAR(255) DEFAULT 'New',
    UserId VARCHAR(255) NOT NULL,
    CONSTRAINT FkUserId FOREIGN KEY (UserId) REFERENCES Users(UserId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
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
    ISBN VARCHAR(13) PRIMARY KEY,
    Format VARCHAR(255),
    Publisher VARCHAR(255) NOT NULL,
    PublicationDate DATE,
    Condition VARCHAR(255),
    Language VARCHAR(255),
    Status VARCHAR(255) NOT NULL,
    BookId VARCHAR(255) NOT NULL,
    CONSTRAINT FkBookId FOREIGN KEY (BookId) REFERENCES BookStock(BookId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)`);

db.exec(`CREATE TABLE IF NOT EXISTS BookStock (
    BookId VARCHAR(255) PRIMARY KEY,
    Category VARCHAR(255) NOT NULL,
    Price FLOAT NOT NULL,
    Title VARCHAR(255) NOT NULL,
    PublicationYear INTEGER,
    Quantity INTEGER NOT NULL
)`);

db.exec(`CREATE TABLE IF NOT EXISTS UserComicBooks (
    UserId VARCHAR(255) NOT NULL,
    ISBN VARCHAR(13) UNIQUE NOT NULL,
    PRIMARY KEY (UserId, ISBN),
    CONSTRAINT FkUserId FOREIGN KEY (UserId) REFERENCES Users(UserId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FkISBN FOREIGN KEY (ISBN) REFERENCES ComicBooks(ISBN)
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
    CONSTRAINT FkBookId FOREIGN KEY (BookId) REFERENCES BookStock(BookId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)`);

db.exec(`CREATE TABLE IF NOT EXISTS OrderItems (
    OrderId VARCHAR(255) NOT NULL,
    ISBN VARCHAR(13) UNIQUE NOT NULL,
    UnitPrice FLOAT NOT NULL,
    PRIMARY KEY (OrderId, ISBN),
    CONSTRAINT OrderId FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FkISBN FOREIGN KEY (ISBN) REFERENCES ComicBooks(ISBN)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
)`);

console.log("Creation of database instance successful!");

console.log("Adding initial data to tables...");

fillDatabase(db);

console.log("All the data was added successfully!");

db.close();
