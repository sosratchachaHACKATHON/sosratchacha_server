const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());
    // app.use(express.static(process.cwd() + '/public'));

    //domain 추가
    require('../server/src/app/Base/BaseRoute/BaseRoute')(app);
    require('../server/src/app/User/UserRoute')(app);
    require('../server/src/app/board/BoardRoute')(app);
    require('../server/src/app/item/ItemRoute')(app);
    require('../server/src/app/Chatting/ChattingRoute')(app);

    return app;
};