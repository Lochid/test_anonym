module.exports = {
    "up": `
            ALTER TABLE users 
            ADD banned BOOLEAN NOT NULL DEFAULT false
    `,
    "down": " ALTER TABLE users DROP COLUMN banned"
}