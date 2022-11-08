module.exports = {
    "up": "CREATE TABLE `users` (`id` INT NOT NULL, `name` VARCHAR(255) NULL, `age` INT NULL, `password` VARCHAR(255) NULL, `email` VARCHAR(255) NULL, PRIMARY KEY (`id`));",
    "down": "DROP TABLE users;"
}