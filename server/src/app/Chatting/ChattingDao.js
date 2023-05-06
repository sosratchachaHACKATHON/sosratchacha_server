async function insertChatting(connection, userId, message){
    const insertChattingQuery = `
        INSERT CHATTING (userId, content) VALUES (?, ?);
    `;
    const insertChattingParams = [userId, message];
    const [insertChattingRows] = await connection.query(insertChattingQuery, insertChattingParams);
    return insertChattingRows;
}

async function selectChatting(connection, userId, userNicname){
    const selectChattingQuery = `
        SELECT CT.id as chattingId, createdAt, u.nickname, content
        FROM CHATTING CT
        INNER JOIN user u on u.id = CT.userId
        ORDER BY CT.createdAt DESC;
    `
    const [selectChattingRows] = await connection.query(selectChattingQuery);
    return selectChattingRows;
}

module.exports = {
    insertChatting,
    selectChatting
}