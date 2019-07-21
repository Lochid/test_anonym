module.exports = {
    "up": `
            CREATE TABLE  IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT, 
                login VARCHAR(256) NOT NULL UNIQUE,
                password_hash VARCHAR(256) NOT NULL
            )`,
    "down": "DROP TABLE IF EXISTS users"
}