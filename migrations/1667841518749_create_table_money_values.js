module.exports = {
    "up": "CREATE TABLE `money_values` (`id` INT NOT NULL, `treasure_id` INT NOT NULL, `amount` INT NULL, PRIMARY KEY (`id`));",
    "down": "DROP TABLE money_values;"
}