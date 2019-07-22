module.exports = {
    "up": `
    CREATE TABLE  IF NOT EXISTS messages (
        id INT PRIMARY KEY AUTO_INCREMENT, 
        user_id INT, 
        conversation VARCHAR(256) NOT NULL,
        text VARCHAR(256) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    "down": "DROP TABLE IF EXISTS users"
}