async function selectItem(connection, userInfo, itemType){
    const query = `
        SELECT *
        FROM Item
        WHERE type = ?
    `
    const response = await connection.query(query, itemType);

    return response[0];
}

module.exports = {
    selectItem
}