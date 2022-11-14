-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS cats;

CREATE TABLE dogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    age INT NOT NULL,
    breed VARCHAR NOT NULL
);

INSERT INTO 
    dogs (name, age, breed)
VALUES
    ('Lottie', 4, 'Pit Mix'),
    ('Rudy', 10, 'Pit Mix'),
    ('Laika', 2, 'Min Pin'),
    ('Lucy', 4, 'German Shorthair'),
    ('Rascal', 12, 'Super Mutt');

CREATE TABLE cats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    age INT NOT NULL,
    color VARCHAR NOT NULL
);

INSERT INTO 
    cats (name, age, color)
VALUES
    ('Scooter', 4, 'Tortiouse'),
    ('Simon', 8, 'Black'),
    ('Harry', 6, 'Black and White'),
    ('Dino', 1, 'Tabby'),
    ('Harold', 7, 'Orange'),
    ('Ghost', 20, 'Cream');