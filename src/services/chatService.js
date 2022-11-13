const Container = require('../container/container');
const { optionsSQLite } = require('../config/sqlite');
const chatService = new Container("chat",optionsSQLite);

module.exports = {
    chatService,
};
