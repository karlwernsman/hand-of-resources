-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS mountains;
DROP TABLE IF EXISTS flowers;
DROP TABLE IF EXISTS colors;

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

CREATE TABLE mountains (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    height_in_feet INT NOT NULL,
    location VARCHAR NOT NULL
);

INSERT INTO 
    mountains (name, height_in_feet, location)
VALUES
    ('Everest', 29035, 'Nepal/Tibet'),
    ('K2', 28250, 'Pakistan/China'),
    ('Kanchenjunga', 28169, 'India/Nepal'),
    ('Lhotse I', 27940, 'Nepal/Tibet'),
    ('Makalu I', 27766, 'Nepal/Tibet'),
    ('Cho Oyu', 26906, 'Nepal/Tibet');

CREATE TABLE flowers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    sun_needs VARCHAR NOT NULL,
    soil_needs VARCHAR NOT NULL
);

INSERT INTO 
    flowers (name, sun_needs, soil_needs)
VALUES
    ('Daisy', 'Full Sun', 'Well-drained'),
    ('Periwinkle', 'Full Sun/Partial Shade', 'Droughty'),
    ('Dahlia', 'Full Sun', 'Well-drained'),
    ('Foxglove', 'All Sun Types', 'Well-drained'),
    ('Pearly Everlasting', 'Full Sun/Partial Shade', 'Damp'),
    ('Moonflower', 'Full Sun', 'Well-drained');

CREATE TABLE colors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    meaning VARCHAR NOT NULL,
    thing VARCHAR NOT NULL
);

INSERT INTO 
    colors (name, meaning, thing)
VALUES
    ('Red', 'Passion', 'Apple'),
    ('Pink', 'Happiness', 'Cat nose'),
    ('Green', 'Growth', 'Grass'),
    ('Blue', 'Peace', 'Sky'),
    ('White', 'Purity', 'Cloud'),
    ('Brown', 'Reliable', 'Chocolate');