module.exports = {
    "up": "INSERT INTO `users` (`id`, `name`, `age`, `password`, `email`) VALUES ('3000', 'U1', '21', '123123', 'u1@kitra.abc'), ('3001', 'U2', '51', '234234', 'u2@kitra.abc'), ('3002', 'U3', '31', '345345', 'u3@kitra.abc'), ('3003', 'U4', '18', '456456', 'u4@kitra.abc'), ('3004', 'U5', '21', '567567', 'u5@kitra.abc'), ('3005', 'U6', '35', '678678', 'u6@kitra.abc');",
    "down": "TRUNCATE TABLE users;"
}