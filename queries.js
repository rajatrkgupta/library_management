const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'library_management',
  password: 'Root@123',
  port: 5432,
});


const getBooks = (request, response) => {
  let query = ""
  let conditions = []

  const name = request.query.name;
  const category = request.query.category;
  const rent_from = request.query.rent_from;
  const rent_to = request.query.rent_to;

  if (name) {
    conditions.push(`name ilike '%${name}%'`)
  }

  if (category) {
    conditions.push(`category = '${category}'`)
  }

  if (rent_from && rent_to) {
    conditions.push(`rent_per_day BETWEEN ${rent_from} AND ${rent_to}`)
  }

  if (conditions.length > 0) {
    query = "WHERE " + conditions.join(" AND ");
  }

  pool.query(`SELECT * FROM books ${query} ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
};

module.exports = {
  getBooks,
}
