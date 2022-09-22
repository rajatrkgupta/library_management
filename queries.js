const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'library_management',
  password: 'Root@123',
  port: 5432,
});

module.exports = {

}
