async function createUser(connection, email, name, password, nickname){
    const query = `
        INSERT INTO User (email, name, password, nickname)
        VALUES (?, ?, ?);
    `;
    const row = await connection.query(query, [email, name, password, nickname]);
    return row[0];
}