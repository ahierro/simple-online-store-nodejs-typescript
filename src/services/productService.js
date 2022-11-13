const Container = require('../container/container');
const { optionsMariaDB } = require('../config/mariaDB');
const container = new Container("producto",optionsMariaDB);

module.exports = {
  productService: container,
};
