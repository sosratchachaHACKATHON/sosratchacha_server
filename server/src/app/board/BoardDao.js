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

async function selectBoard(connection, userInfo, boardType){
    const query = `
        SELECT B.id, B.xCoord, B.yCoord, B.locationName, B.type, B.content, B.boardType, PU.url
        FROM Board B
        INNER JOIN PicURL PU on B.id = PU.boardID
        WHERE Boardtype = ?
    `

    const response = await connection.query(query, boardType);

    return response[0];
}

module.exports = {
    insertBoard,
    selectBoard
}