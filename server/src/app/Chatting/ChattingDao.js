

async function insertChatting(connection, userId, message){
    const insertChattingQuery = `
        INSERT CHATTING (userId, content) VALUES (?, ?);
    `;
    const insertChattingParams = [userId, message];
    const [insertChattingRows] = await connection.query(insertChattingQuery, insertChattingParams);
    return insertChattingRows;
}

module.exports = {
    insertChatting
}