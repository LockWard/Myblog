DROP DATABASE if EXISTS myblog;
CREATE database if not EXISTS myblog;
use myblog;

--ROLES
CREATE TABLE role (
    role_id VARCHAR(255) NOT NULL,
    role_name VARCHAR(125) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(role_name),
    PRIMARY KEY(role_id)
)

INSERT INTO role (role_name)
VALUES
('admin'),
('moderator'),
('user');

SELECT * FROM role;

TRUNCATE TABLE role;

DROP TABLE role;

--USER
CREATE TABLE if not EXISTS user (
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_description LONGTEXT,
    user_status BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    role_id VARCHAR(255),
    PRIMARY KEY(user_id),
    UNIQUE(user_email),
    Foreign Key (role_id) REFERENCES role(role_id)
);

select * from user where user_name = '' and user_password = 'anything' or 'x' = 'x';

INSERT INTO user (user_name, user_email, user_password, role_id)
VALUES ('Roger Herrera', 'roger1210@live.com', '123456', (select role_id from role where role_name = 'admin'));

SELECT * FROM user;

TRUNCATE TABLE user;

DROP TABLE user;

--POST
CREATE TABLE post(
    post_id VARCHAR(255) NOT NULL,
    post_title VARCHAR(255) NOT NULL,
    post_content TEXT(255) NOT NULL,
    post_media VARCHAR(255),
    post_status BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(255),
    PRIMARY KEY(post_id),
    Foreign Key (user_id) REFERENCES user(user_id)
);

SELECT * FROM post;

TRUNCATE TABLE post;

DROP TABLE post;

--COMMENT
CREATE TABLE comment(
    comment_id VARCHAR(255) NOT NULL,
    comment_content TEXT(255) DEFAULT NULL,
    comment_status BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(255),
    post_id VARCHAR(255),
    PRIMARY KEY(comment_id),
    Foreign Key (user_id) REFERENCES user(user_id),
    Foreign Key (post_id) REFERENCES post(post_id)
);

SELECT * FROM comment;

TRUNCATE TABLE comment;

DROP TABLE comment;

--vote
CREATE TABLE vote(
    vote_id VARCHAR(255) NOT NULL,
    vote_type BOOLEAN DEFAULT NULL,
    vote_status BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(255),
    post_id VARCHAR(255),
    comment_id VARCHAR(255),
    PRIMARY KEY(vote_id),
    Foreign Key (user_id) REFERENCES user(user_id),
    Foreign Key (post_id) REFERENCES post(post_id),
    Foreign Key (comment_id) REFERENCES comment(comment_id)
);

SELECT * FROM vote;

TRUNCATE TABLE vote;

DROP TABLE vote;


