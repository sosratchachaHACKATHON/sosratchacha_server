async function insertBoard(connection,content,type,picUrl,userInfo){
    const query = `
        INSERT INTO Item(content,type,picUrl) VALUES (?, ?, ?);
    `

    const response = await connection.query(query, [content, type, picUrl]);

    // const picQuery = `
    //     INSERT INTO PicURL(boardId, url) VALUES (?, ?);
    // `
    // const picResponse = await connection.query(picQuery, [response[0].insertId, fileName]);

    // return [response[0].insertId, picResponse[0].insertId];
}

async function selectItem(connection, userInfo, itemType){
    const query = `
        SELECT I.id, I.content, I.type, I.ItemType, I.picurl
        FROM Item I
        //INNER JOIN PicURL PU on B.id = PU.boardID
        WHERE Itemtype = ?
        ORDER BY I.id DESC;
    `

    const response = await connection.query(query, itemType);

    return response[0];
}