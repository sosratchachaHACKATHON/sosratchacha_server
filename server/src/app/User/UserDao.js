const users=[];

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

function userJoin(id,nickname,room){
    const user={id,nickname,room};
    users.push(user);

    return user;
}

function getCurrentUser(id){
    return users.find(user=>user.id===id);
}

function userLeave(id){
    const index=users.findIndex(user => user.id === id);
    if(index !==-1){
        return users.splice(index,1)[0];
    }
}
function getRoomUsers(room){
    return users.filter(user=>user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    createUser,
    loginUser
}