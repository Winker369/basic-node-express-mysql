module.exports = {
    "up": "INSERT INTO `money_values` (`id`, `treasure_id`, `amount`) VALUES ('1', '100', '15'), ('2', '101', '10'), ('3', '102', '15'), ('4', '103', '15'), ('5', '104', '10'), ('6', '105', '15'), ('7', '106', '15'), ('8', '107', '10'), ('9', '108', '15'), ('10', '109', '15'), ('11', '110', '10'), ('12', '111', '15'), ('13', '112', '15'), ('14', '113', '10'), ('15', '114', '15'), ('16', '115', '15'), ('17', '116', '10'), ('18', '117', '15'), ('19', '100', '20'), ('20', '101', '25'), ('21', '102', '20'), ('22', '103', '25'), ('23', '107', '30'), ('24', '108', '30'), ('25', '109', '30');",
    "down": "TRUNCATE TABLE money_values;"
}