async function insertBoard(connection, xCoordi, yCoordi, where, type, content, boardType, fileName){
    const query = `
        INSERT INTO Board(xCoord, yCoord, locationName, type, content, boardType) VALUES (?, ?, ?, ?, ?, ?);
    `

    const response = await connection.query(query, [xCoordi, yCoordi, where, type, content, boardType]);

    const picQuery = `
        INSERT INTO PicURL(boardId, url) VALUES (?, ?);
    `
    const picResponse = await connection.query(picQuery, [response[0].insertId, fileName]);

    return [response[0].insertId, picResponse[0].insertId];
}

async function selectBoard(connection, boardType){
    const query = `
        SELECT B.id, B.xCoord, B.yCoord, B.locationName, B.type, B.content, B.boardType, PU.url
        FROM Board B
        INNER JOIN PicURL PU on B.id = PU.boardID
        WHERE Boardtype = ?
        ORDER BY B.id DESC;
    `

    const response = await connection.query(query, boardType);

    return response[0];
}

async function insertComment(connection, userInfo, boardId, content){
    const query = `
        INSERT INTO BoardComment(boardId, userId, text) VALUES (?, ?, ?);`
    const response = await connection.query(query, [boardId, userInfo.id, content]);

    return response[0];
}

async function selectBoardDetail(connection, boardId){
    const detailQuery = `
        SELECT B.createdAt, B.xCoord, B.yCoord, B.locationName, B.type, B.content AS boardContent, B.boardType
        FROM Board B
        WHERE B.id = ?
        ORDER BY createdAt DESC;
    `
    const detailQueryResponse = await connection.query(detailQuery, boardId);
    const commentQuery = `
        SELECT BC.text AS comment, nickname AS writerNickname
        FROM Board B
        INNER JOIN BoardComment BC ON B.id = BC.boardID
        Inner JOIN user U on U.id = BC.userId
        WHERE B.id = ?
        ORDER BY BC.createdAt ASC;
    `
    const commentQueryResponse = await connection.query(commentQuery, boardId);

    const boardPicQuery = `
        SELECT PU.url
        FROM PicURL PU
        WHERE PU.boardId = ?;
    `
    const boardPicQueryResponse = await connection.query(boardPicQuery, boardId);

    return [detailQueryResponse[0], commentQueryResponse[0], boardPicQueryResponse[0]];
}
module.exports = {
    insertBoard,
    selectBoard,
    insertComment,
    selectBoardDetail
}