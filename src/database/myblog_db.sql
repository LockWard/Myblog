DROP DATABASE if EXISTS myblog_db;
CREATE database myblog_db;
use myblog_db;

--ROLES

DROP TABLE if EXISTS role;

CREATE TABLE role (
    role_id VARCHAR(100) NOT NULL,
    role_name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(role_name),
    PRIMARY KEY(role_id)
);

-- SELECT * FROM role;
-- DELETE FROM role;
-- TRUNCATE TABLE role;
-- DROP TABLE role;

--USER

DROP TABLE if EXISTS user;

CREATE TABLE user (
    user_id VARCHAR(100) NOT NULL,
    user_profile VARCHAR(255) DEFAULT NULL,
    user_handle VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    user_first_name VARCHAR(100) NOT NULL,
    user_last_name VARCHAR(100) NOT NULL,
    user_follower_count INT DEFAULT 0,
    user_description TINYTEXT DEFAULT NULL,
    user_password VARCHAR(125) NOT NULL,
    user_status BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    role_id VARCHAR(100),
    PRIMARY KEY(user_id),
    UNIQUE(user_email, user_handle),
    Foreign Key (role_id) REFERENCES role(role_id)
);

-- SELECT * FROM user;
-- DELETE FROM user;
-- TRUNCATE TABLE user;
-- DROP TABLE user;

--DIRECT_MESSAGES

DROP TABLE if EXISTS direct_message;

CREATE TABLE direct_message (
    message_id VARCHAR(100) NOT NULL,
    message_text TINYTEXT NOT NULL,
    message_status BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sender_id VARCHAR(100) NOT NULL,
    receiver_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (message_id),
    FOREIGN KEY (sender_id) REFERENCES user(user_id),
    FOREIGN KEY (receiver_id) REFERENCES user(user_id)
);

-- SELECT * FROM direct_message;
-- DELETE FROM direct_message;
-- TRUNCATE TABLE direct_message;
-- DROP TABLE direct_message;

--NOTIFICATION

DROP TABLE if EXISTS notification;

CREATE TABLE notification (
    notification_id VARCHAR(100) NOT NULL,
    notification_type ENUM('post', 'message', 'follow', 'vote') NOT NULL,
    recipient_id VARCHAR(100) NOT NULL,
    sender_id VARCHAR(100) NOT NULL,
    notification_text TINYTEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (notification_id),
    FOREIGN KEY (recipient_id) REFERENCES user(user_id),
    FOREIGN KEY (sender_id) REFERENCES user(user_id)
);

-- SELECT * FROM notification;
-- DELETE FROM notification;
-- TRUNCATE TABLE notification;
-- DROP TABLE notification;

--FOLLOWER

DROP TABLE if EXISTS follower;

CREATE TABLE follower (
    follower_id VARCHAR(100) NOT NULL,
    following_id VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(follower_id, following_id),
    Foreign Key (follower_id) REFERENCES user(user_id),
    Foreign Key (following_id) REFERENCES user(user_id),
    CHECK (follower_id <> following_id)
);

-- the following is follow by follower 

-- ALTER TABLE followers
-- ADD CONSTRAINT
-- CHECK (follower_id <> following_id);

-- SELECT * FROM follower;
-- DELETE FROM follower;
-- TRUNCATE TABLE follower;
-- DROP TABLE follower;

--POST

DROP TABLE if EXISTS post;

CREATE TABLE post(
    post_id VARCHAR(100) NOT NULL,
    post_text TEXT NOT NULL,
    post_media VARCHAR(255) DEFAULT NULL,
    post_num_votes INT DEFAULT 0,
    post_num_comments INT DEFAULT 0,
    post_num_shared INT DEFAULT 0,
    post_status BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(100) NOT NULL,
    PRIMARY KEY(post_id),
    Foreign Key (user_id) REFERENCES user(user_id)
);

-- SELECT * FROM post;
-- DELETE FROM post;
-- TRUNCATE TABLE post;
-- DROP TABLE post;

--vote_post

DROP TABLE if EXISTS post_vote;

CREATE TABLE post_vote(
    user_id VARCHAR(100) NOT NULL,
    post_id VARCHAR(100) NOT NULL,
    post_vote_reaction ENUM('Like', 'Dislike') DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id, post_id),
    Foreign Key (user_id) REFERENCES user(user_id),
    Foreign Key (post_id) REFERENCES post(post_id)
);

-- SELECT * FROM post_vote;
-- DELETE FROM post_vote;
-- TRUNCATE TABLE post_vote;
-- DROP TABLE post_vote;

--COMMENT

DROP TABLE if EXISTS comment;

CREATE TABLE comment(
    comment_id VARCHAR(100) NOT NULL,
    comment_text TINYTEXT NOT NULL,
    comment_num_votes INT DEFAULT 0,
    comment_status BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(100),
    post_id VARCHAR(100),
    PRIMARY KEY(comment_id),
    Foreign Key (user_id) REFERENCES user(user_id),
    Foreign Key (post_id) REFERENCES post(post_id)
);

-- SELECT * FROM comment;
-- DELETE FROM comment;
-- TRUNCATE TABLE comment;
-- DROP TABLE comment;

--vote

DROP TABLE if EXISTS comment_vote;

CREATE TABLE comment_vote(
    user_id VARCHAR(100) NOT NULL,
    comment_id VARCHAR(100) NOT NULL,
    comment_vote_reaction ENUM('Like', 'Dislike') DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id, comment_id),
    Foreign Key (user_id) REFERENCES user(user_id),
    Foreign Key (comment_id) REFERENCES comment(comment_id)
);

-- SELECT * FROM comment_vote;
-- DELETE FROM comment_vote;
-- TRUNCATE TABLE comment_vote;
-- DROP TABLE comment_vote;

-- TRIGGERS
--FOLLOWERS

DROP TRIGGER if EXISTS increase_follower_count; 
DELIMITER $$
CREATE TRIGGER increase_follower_count
AFTER INSERT ON follower
FOR EACH ROW
BEGIN
    UPDATE user SET user_follower_count = user_follower_count + 1
    WHERE user_id = NEW.following_id;
END $$
DELIMITER ;

DROP TRIGGER if EXISTS decrease_follower_count; 
DELIMITER $$
CREATE TRIGGER decrease_follower_count
AFTER DELETE ON follower
FOR EACH ROW
BEGIN
    UPDATE user SET user_follower_count = user_follower_count - 1
    WHERE user_id = OLD.following_id;
END $$
DELIMITER ;

-- VOTES OF POSTS

DROP TRIGGER if EXISTS increase_post_vote_count; 
DELIMITER $$
CREATE TRIGGER increase_post_vote_count
AFTER INSERT ON post_vote
FOR EACH ROW
BEGIN
    UPDATE post SET post_num_votes = post_num_votes + 1
    WHERE post_id = NEW.post_id;
END $$
DELIMITER ;

DROP TRIGGER if EXISTS decrease_post_vote_count; 
DELIMITER $$
CREATE TRIGGER decrease_post_vote_count
AFTER DELETE ON post_vote
FOR EACH ROW
BEGIN
    UPDATE post SET post_num_votes = post_num_votes - 1
    WHERE post_id = OLD.post_id;
END $$
DELIMITER ;

-- COMMENTS OF POSTS

DROP TRIGGER if EXISTS increase_post_comment_count; 
DELIMITER $$
CREATE TRIGGER increase_post_comment_count
AFTER INSERT ON comment
FOR EACH ROW
BEGIN
    UPDATE post SET post_num_comments = post_num_comments + 1
    WHERE post_id = NEW.post_id;
END $$
DELIMITER ;

DROP TRIGGER if EXISTS decrease_post_comment_count; 
DELIMITER $$
CREATE TRIGGER decrease_post_comment_count
AFTER UPDATE ON comment
FOR EACH ROW
BEGIN
    IF NEW.comment_status = FALSE THEN
    UPDATE post SET post_num_comments = post_num_comments - 1
    WHERE post_id = OLD.post_id;
    END IF;
END; $$
DELIMITER ;

-- DROP TRIGGER if EXISTS decrease_post_comment_count; 
-- DELIMITER $$
-- CREATE TRIGGER decrease_post_comment_count
-- AFTER DELETE ON comment
-- FOR EACH ROW
-- BEGIN
--     UPDATE post SET post_num_comments = post_num_comments - 1
--     WHERE post_id = OLD.post_id;
-- END $$
-- DELIMITER ;

-- VOTES OF COMMENT

DROP TRIGGER if EXISTS increase_comment_vote_count; 
DELIMITER $$
CREATE TRIGGER increase_comment_vote_count
AFTER INSERT ON comment_vote
FOR EACH ROW
BEGIN
    UPDATE comment SET comment_num_votes = comment_num_votes + 1
    WHERE comment_id = NEW.comment_id;
END $$
DELIMITER ;

DROP TRIGGER if EXISTS decrease_comment_vote_count; 
DELIMITER $$
CREATE TRIGGER decrease_comment_vote_count
AFTER DELETE ON comment_vote
FOR EACH ROW
BEGIN
    UPDATE comment SET comment_num_votes = comment_num_votes - 1
    WHERE comment_id = OLD.comment_id;
END $$
DELIMITER ;

-- select *
-- from information_schema.table_constraints
-- where constraint_schema = 'myblog_db';

-- select *
-- from information_schema.key_column_usage
-- where constraint_schema = 'myblog_db';

-- select *
-- from information_schema.referential_constraints
-- where constraint_schema = 'myblog_db';