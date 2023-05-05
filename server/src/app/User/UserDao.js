async function createUser(connection, name, email, nickname, password){
    const query = `
        INSERT INTO user(name, email, nickname, password)  VALUES (?, ?, ?, ?)
    `;
    const row = await connection.query(query, [name, email, nickname, password]);
    console.log(row)
    return row[0];
}

async function loginUser(connection, email, password){
    const query = `
        SELECT *
        FROM user
        WHERE email=? and password=?
    `;
    const row = await connection.query(query, [email, password]);
    return row[0][0];
}

module.exports = {
    createUser,
    loginUser
}