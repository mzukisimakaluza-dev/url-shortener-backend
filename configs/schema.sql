CREATE DATABASE url_shortener;

USE url_shortener;

CREATE TABLE urls (
    url_key VARCHAR(255) PRIMARY KEY,
    long_url VARCHAR(1024) NOT NULL,
    short_url VARCHAR(255) NOT NULL
);

INSERT INTO urls (url_key, long_url, short_url) VALUES
(
    "hello", "https://www.youtube.com/watch?v=Hej48pi_lOc", "https://www.youtube.com/hello"
);