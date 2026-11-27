import { DatabaseSync } from "node:sqlite";
import bcrypt from "bcrypt";

export default function fillDatabase(database) {
  if ((!database) instanceof DatabaseSync) {
    throw new TypeError(
      "Please provide a database that is an instance of the DatabaseSync class.",
    );
  }

  if (!database) {
    throw new Error("Please provide a database instance as an argument.");
  }

  database.exec(`
    INSERT INTO Users (UserId, UserName, PasswordHash, Role, MembershipStatus)
    VALUES
    ('USR001', 'john_doe', '${bcrypt.hashSync("JohnTest!2026", 10)}', 'Customer', 'Active'),
    ('USR002', 'emma_wilson', '${bcrypt.hashSync("EmmaTest!2026", 10)}', 'Customer', 'Active'),
    ('USR003', 'michael_smith', '${bcrypt.hashSync("MichaelTest!2026", 10)}', 'Customer', 'Inactive'),
    ('USR004', 'sophia_brown', '${bcrypt.hashSync("SophiaTest!2026", 10)}', 'Customer', 'Active'),
    ('USR005', 'oliver_jones', '${bcrypt.hashSync("OliverTest!2026", 10)}', 'Customer', 'Inactive'),
    ('USR006', 'admin_alex', '${bcrypt.hashSync("AdminTest!2026", 10)}', 'Employee', 'N/A'),
    ('USR007', 'staff_emily', '${bcrypt.hashSync("StaffTest!2026", 10)}', 'Employee', 'N/A');
`);

  database.exec(`
  INSERT INTO Authors (
    AuthorId, FirstName, LastName, DateOfBirth, Nationality, Biography
  )
  VALUES
    ('AUT001', 'Stan', 'Lee', '1922-12-28', 'American',
     'Co-created iconic Marvel characters including Spider-Man, Iron Man and the X-Men.'),

    ('AUT002', 'Jack', 'Kirby', '1917-08-28', 'American',
     'Influential comic book artist and writer who co-created many iconic Marvel characters.'),

    ('AUT003', 'Alan', 'Moore', '1953-11-18', 'British',
     'Writer known for Watchmen, V for Vendetta and The League of Extraordinary Gentlemen.'),

    ('AUT004', 'Frank', 'Miller', '1957-01-27', 'American',
     'Comic book writer and artist known for The Dark Knight Returns, Sin City and 300.'),

    ('AUT005', 'Neil', 'Gaiman', '1960-11-10', 'British',
     'Writer known for the acclaimed comic book series The Sandman.'),

    ('AUT006', 'Grant', 'Morrison', '1960-01-31', 'Scottish',
     'Comic book writer known for Animal Man, Doom Patrol and All-Star Superman.'),

    ('AUT007', 'Brian', 'Vaughan', '1976-07-17', 'American',
     'Comic book writer known for Saga, Y: The Last Man and Paper Girls.');
  `);

  database.exec(`
  INSERT INTO Orders (OrderId, Date, Price, Status, UserId)
  VALUES
    ('ORD001', '2026-11-20', 49.90, 'Completed', 'USR001'),
    ('ORD002', '2026-11-21', 29.95, 'New',       'USR002'),
    ('ORD003', '2026-11-22', 74.50, 'Processing','USR003'),
    ('ORD004', '2026-11-23', 19.99, 'Completed', 'USR004'),
    ('ORD005', '2026-11-24', 59.90, 'New',       'USR005');
  `);

  database.exec(`
  INSERT INTO BookStock (
    BookId, Category, Price, Title, PublicationYear, Quantity
  )
  VALUES
    ('BOK001', 'Superhero', 19.99, 'The Amazing Spider-Man', 2020, 2),
    ('BOK002', 'Superhero', 24.99, 'Fantastic Four', 2019, 2),
    ('BOK003', 'Superhero', 29.99, 'X-Men: The Dark Phoenix Saga', 2018, 2),
    ('BOK004', 'Superhero', 29.91, 'The Mighty Thor', 2021, 2),

    ('BOK005', 'Superhero', 34.99, 'The New Gods', 2017, 2),
    ('BOK006', 'Superhero', 9.96, 'Kamandi: The Last Boy on Earth', 2016, 2),
    ('BOK007', 'Superhero', 31.99, 'The Fourth World', 2015, 2),

    ('BOK008', 'Graphic Novel', 39.51, 'Watchmen', 1987, 2),
    ('BOK009', 'Dystopian', 25.99, 'V for Vendetta', 1989, 2),
    ('BOK010', 'Fantasy', 29.99, 'The League of Extraordinary Gentlemen', 1999, 2),

    ('BOK011', 'Superhero', 21.99, 'The Dark Knight Returns', 1986, 2),
    ('BOK012', 'Crime', 32.99, 'Sin City: The Hard Goodbye', 1991, 2),
    ('BOK013', 'Historical Fiction', 26.50, '300', 1998, 2),

    ('BOK014', 'Fantasy', 34.91, 'The Sandman: Preludes & Nocturnes', 1989, 2),
    ('BOK015', 'Fantasy', 39.99, 'The Sandman: The Doll''s House', 1989, 2),

    ('BOK016', 'Superhero', 24.99, 'All-Star Superman', 2005, 2),
    ('BOK017', 'Superhero', 27.99, 'JLA: Earth 2', 2000, 2),
    ('BOK018', 'Science Fiction', 29.99, 'Animal Man: The Hunt', 1988, 2),

    ('BOK019', 'Science Fiction', 36.99, 'Saga, Volume 1', 2012, 2),
    ('BOK020', 'Science Fiction', 31.99, 'Y: The Last Man, Volume 1', 2002, 2);
  `);

  database.exec(`
  INSERT INTO ComicBooks (
    ISBN, Format, Publisher, PublicationDate, Condition, Language, Status, BookId
  )
  VALUES
    -- The Amazing Spider-Man
    ('9781000000001', 'Paperback', 'Marvel Comics', '2020-03-15', 'Very Good', 'English', 'Ordered', 'BOK001'),
    ('9781000000002', 'Hardcover', 'Marvel Comics', '2020-03-15', 'Excellent', 'English', 'Ordered', 'BOK001'),

    -- Fantastic Four
    ('9781000000003', 'Paperback', 'Marvel Comics', '2019-06-20', 'Good', 'English', 'Ordered', 'BOK002'),
    ('9781000000004', 'Hardcover', 'Marvel Comics', '2019-06-20', 'Very Good', 'English', 'Available', 'BOK002'),

    -- X-Men: The Dark Phoenix Saga
    ('9781000000005', 'Paperback', 'Marvel Comics', '2018-09-12', 'Excellent', 'English', 'Available', 'BOK003'),
    ('9781000000006', 'Hardcover', 'Marvel Comics', '2018-09-12', 'Good', 'English', 'Available', 'BOK003'),

    -- The Mighty Thor
    ('9781000000007', 'Paperback', 'Marvel Comics', '2021-02-10', 'Very Good', 'English', 'Ordered', 'BOK004'),
    ('9781000000008', 'Hardcover', 'Marvel Comics', '2021-02-10', 'Excellent', 'English', 'Available', 'BOK004'),

    -- The New Gods
    ('9781000000009', 'Paperback', 'DC Comics', '2017-05-17', 'Good', 'English', 'Ordered', 'BOK005'),
    ('9781000000010', 'Hardcover', 'DC Comics', '2017-05-17', 'Excellent', 'English', 'Available', 'BOK005'),

    -- Kamandi: The Last Boy on Earth
    ('9781000000011', 'Paperback', 'DC Comics', '2016-08-24', 'Very Good', 'English', 'Ordered', 'BOK006'),
    ('9781000000012', 'Hardcover', 'DC Comics', '2016-08-24', 'Good', 'English', 'Available', 'BOK006'),

    -- The Fourth World
    ('9781000000013', 'Paperback', 'DC Comics', '2015-11-11', 'Excellent', 'English', 'Available', 'BOK007'),
    ('9781000000014', 'Hardcover', 'DC Comics', '2015-11-11', 'Very Good', 'English', 'Available', 'BOK007'),

    -- Watchmen
    ('9781000000015', 'Paperback', 'DC Comics', '1987-09-01', 'Very Good', 'English', 'Ordered', 'BOK008'),
    ('9781000000016', 'Hardcover', 'DC Comics', '1987-09-01', 'Excellent', 'English', 'Available', 'BOK008'),

    -- V for Vendetta
    ('9781000000017', 'Paperback', 'DC Comics', '1989-03-01', 'Good', 'English', 'Available', 'BOK009'),
    ('9781000000018', 'Hardcover', 'DC Comics', '1989-03-01', 'Very Good', 'English', 'Available', 'BOK009'),

    -- The League of Extraordinary Gentlemen
    ('9781000000019', 'Paperback', 'Top Shelf Productions', '1999-01-01', 'Excellent', 'English', 'Available', 'BOK010'),
    ('9781000000020', 'Hardcover', 'Top Shelf Productions', '1999-01-01', 'Very Good', 'English', 'Available', 'BOK010'),

    -- The Dark Knight Returns
    ('9781000000021', 'Paperback', 'DC Comics', '1986-02-01', 'Very Good', 'English', 'Available', 'BOK011'),
    ('9781000000022', 'Hardcover', 'DC Comics', '1986-02-01', 'Excellent', 'English', 'Available', 'BOK011'),

    -- Sin City: The Hard Goodbye
    ('9781000000023', 'Paperback', 'Dark Horse Comics', '1991-04-01', 'Good', 'English', 'Available', 'BOK012'),
    ('9781000000024', 'Hardcover', 'Dark Horse Comics', '1991-04-01', 'Very Good', 'English', 'Available', 'BOK012'),

    -- 300
    ('9781000000025', 'Paperback', 'Dark Horse Comics', '1998-05-01', 'Excellent', 'English', 'Available', 'BOK013'),
    ('9781000000026', 'Hardcover', 'Dark Horse Comics', '1998-05-01', 'Good', 'English', 'Available', 'BOK013'),

    -- The Sandman: Preludes & Nocturnes
    ('9781000000027', 'Paperback', 'DC Comics', '1989-01-01', 'Very Good', 'English', 'Ordered', 'BOK014'),
    ('9781000000028', 'Hardcover', 'DC Comics', '1989-01-01', 'Excellent', 'English', 'Available', 'BOK014'),

    -- The Sandman: The Doll's House
    ('9781000000029', 'Paperback', 'DC Comics', '1989-07-01', 'Good', 'English', 'Available', 'BOK015'),
    ('9781000000030', 'Hardcover', 'DC Comics', '1989-07-01', 'Very Good', 'English', 'Available', 'BOK015'),

    -- All-Star Superman
    ('9781000000031', 'Paperback', 'DC Comics', '2005-01-01', 'Excellent', 'English', 'Ordered', 'BOK016'),
    ('9781000000032', 'Hardcover', 'DC Comics', '2005-01-01', 'Very Good', 'English', 'Available', 'BOK016'),

    -- JLA: Earth 2
    ('9781000000033', 'Paperback', 'DC Comics', '2000-01-01', 'Good', 'English', 'Available', 'BOK017'),
    ('9781000000034', 'Hardcover', 'DC Comics', '2000-01-01', 'Excellent', 'English', 'Available', 'BOK017'),

    -- Animal Man: The Hunt
    ('9781000000035', 'Paperback', 'DC Comics', '1988-01-01', 'Very Good', 'English', 'Available', 'BOK018'),
    ('9781000000036', 'Hardcover', 'DC Comics', '1988-01-01', 'Good', 'English', 'Available', 'BOK018'),

    -- Saga, Volume 1
    ('9781000000037', 'Paperback', 'Image Comics', '2012-10-10', 'Excellent', 'English', 'Available', 'BOK019'),
    ('9781000000038', 'Hardcover', 'Image Comics', '2012-10-10', 'Very Good', 'English', 'Available', 'BOK019'),

    -- Y: The Last Man, Volume 1
    ('9781000000039', 'Paperback', 'Vertigo', '2002-09-04', 'Good', 'English', 'Available', 'BOK020'),
    ('9781000000040', 'Hardcover', 'Vertigo', '2002-09-04', 'Excellent', 'English', 'Available', 'BOK020'),

    -- Additional user-owned copies (Bought)
    ('9791234567001', 'Paperback', 'Marvel Comics', '2020-03-15', 'Excellent', 'English', 'Bought', 'BOK001'),
    ('9791234567002', 'Hardcover', 'Marvel Comics', '2019-06-20', 'Very Good', 'English', 'Bought', 'BOK002'),
    ('9791234567003', 'Paperback', 'DC Comics', '1987-09-01', 'Good', 'English', 'Bought', 'BOK008'),
    ('9791234567004', 'Hardcover', 'DC Comics', '1989-01-01', 'Excellent', 'English', 'Bought', 'BOK014'),
    ('9791234567005', 'Paperback', 'DC Comics', '2005-01-01', 'Very Good', 'English', 'Bought', 'BOK016'),
    ('9791234567006', 'Hardcover', 'Image Comics', '2012-10-10', 'Excellent', 'English', 'Bought', 'BOK019'),
    ('9791234567007', 'Paperback', 'Vertigo', '2002-09-04', 'Good', 'English', 'Bought', 'BOK020');
  `);

  database.exec(`
  INSERT INTO ComicBookAuthors (AuthorId, BookId)
  VALUES
    ('AUT001', 'BOK001'),
    ('AUT001', 'BOK002'),
    ('AUT001', 'BOK003'),
    ('AUT001', 'BOK004'),

    ('AUT002', 'BOK005'),
    ('AUT002', 'BOK006'),
    ('AUT002', 'BOK007'),

    ('AUT003', 'BOK008'),
    ('AUT003', 'BOK009'),
    ('AUT003', 'BOK010'),

    ('AUT004', 'BOK011'),
    ('AUT004', 'BOK012'),
    ('AUT004', 'BOK013'),

    ('AUT005', 'BOK014'),
    ('AUT005', 'BOK015'),

    ('AUT006', 'BOK016'),
    ('AUT006', 'BOK017'),
    ('AUT006', 'BOK018'),

    ('AUT007', 'BOK019'),
    ('AUT007', 'BOK020');
  `);

  database.exec(`
    INSERT INTO OrderItems (OrderId, ISBN, UnitPrice)
    VALUES
    -- ORD001: 19.99 + 29.91 = 49.90
    ('ORD001', '9781000000001', 19.99), -- BOK001
    ('ORD001', '9781000000007', 29.91), -- BOK004

    -- ORD002: 19.99 + 9.96 = 29.95
    ('ORD002', '9781000000002', 19.99), -- BOK001
    ('ORD002', '9781000000011', 9.96),  -- BOK006

    -- ORD003: 34.99 + 39.51 = 74.50
    ('ORD003', '9781000000009', 34.99), -- BOK005
    ('ORD003', '9781000000015', 39.51), -- BOK008

    -- ORD004: 24.99
    ('ORD004', '9781000000003', 24.99), -- BOK002

    -- ORD005: 24.99 + 34.91 = 59.90
    ('ORD005', '9781000000031', 24.99), -- BOK016
    ('ORD005', '9781000000027', 34.91); -- BOK014
  `);

  database.exec(`
    INSERT INTO UserComicBooks (UserId, ISBN)
    VALUES
    ('USR001', '9791234567001'),
    ('USR001', '9791234567002'),
    ('USR002', '9791234567003'),
    ('USR002', '9791234567004'),
    ('USR003', '9791234567005'),
    ('USR004', '9791234567006'),
    ('USR005', '9791234567007');
  `);
}
