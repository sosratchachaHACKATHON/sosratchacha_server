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

module.exports = {
    insertBoard
}