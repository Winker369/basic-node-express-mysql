module.exports = {
    "up": "CREATE TABLE `treasures` (`id` INT NOT NULL, `latitude` VARCHAR(255) NULL, `longitude` VARCHAR(255) NULL, `name` VARCHAR(255) NULL, PRIMARY KEY (`id`));",
    "down": "DROP TABLE treasures;"
}