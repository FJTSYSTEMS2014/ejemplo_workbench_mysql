// requerir o importar express
const express = require ('express');
// requerir o importar mysql2
const mysql = require ('mysql2');
// requerir o importar body-parser
const bodyParser = require ('body-parser');

// generar una constante para nuestro puerto
const PORT = 4000;

// crear constante llamada app y generamos una instancia de express
const app = express ();

// utilizamos app.use y le pasamos bodyparser
app.use (express.json ());

// mysql en base a la documentacion:
//https://www.npmjs.com/package/mysql

const connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  // En el password va tu contraseña de workbench
  password: 'TSCHERIG2002',
  // database: nombre de la base de datos utilizada en workbench (Materia Base de Datos)
  database: 'Northwind',
});

// Primera Ruta
app.get ('/', (req, res) => {
  res.send ('hola compas de IUPA :)');
});

// leer todos los clientes
app.get ('/customers', (req, res) => {
  connection.query ('SELECT * FROM customers', (err, resultado) => {
    if (!err) {
      res.json (resultado);
    } else {
      console.log (err);
      res.send ('no hay resultados');
    }
  });
});
// leer un cliente por id
app.get ('/customers/:id', (req, res) => {
  const {id} = req.params;
  const sql = `SELECT * FROM customers WHERE id= ${id}`;
  connection.query (sql, (err, resultado) => {
    if (!err) {
      res.json (resultado);
    } else {
      console.log (err);
      res.send ('no hay resultados');
    }
  });
});

// agregar un cliente
app.post ('/add', (req, res) => {
  const sql = 'INSERT INTO customers SET ?';
  const customerObject = {
    id: 36,
    company: req.body.company,
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    email_address: req.body.email_address,
    job_title: req.body.job_title,
    business_phone: req.body.business_phone,
    home_phone: req.body.home_phone,
    mobile_phone: req.body.mobile_phone,
    fax_number: req.body.fax_number,
    address: req.body.address,
    city: req.body.city,
    state_province: req.body.state_province,
    zip_postal_code: req.body.zip_postal_code,
    country_region: req.body.country_region,
    web_page: req.body.web_page,
    notes: req.body.notes,
  };
  connection.query (sql, customerObject, error => {
    if (error) throw error;
    res.send (' customers actualizado');
    console.log (' customers actualizado');
  });
});

//actualizar el cliente
app.put ('/update/:id', (req, res) => {
  const {id} = req.params;
  const {
    company,
    last_name,
    first_name,
    email_address,
    job_title,
    business_phone,
    home_phone,
    mobile_phone,
    fax_number,
    address,
    city,
    state_province,
    zip_postal_code,
    country_region,
    web_page,
    notes,
  } = req.body;
  const sql = ` UPDATE customers SET company='${company}',
    last_name='${last_name}',
    first_name='${first_name}',
    email_address='${email_address}',
    job_title='${job_title}', 
    business_phone='${business_phone}',
    home_phone='${home_phone}',
    mobile_phone='${mobile_phone}',
    fax_number='${fax_number}',
    address='${address}',
    city='${city}',
    state_province='${state_province}',
    zip_postal_code='${zip_postal_code}',
    country_region='${country_region}',
    web_page='${web_page}',
    notes= '${notes}'  where id='${id}'`;
  connection.query (sql, error => {
    if (error) throw error;
    res.send (` id=${id} customers modificado`);
    console.log (` id=${id} customers modificado`);
  });
});

// chequeo de conexión
connection.connect (error => {
  if (error) throw error;
  console.info ('la base de datos esta funcionando');
});

// escuchar el puerto (alt96 = `)
app.listen (PORT, () =>
  console.info (`El servidor esta escuchando en el puerto:${PORT}`)
);
