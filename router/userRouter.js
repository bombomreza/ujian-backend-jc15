const express = require('express');
const {db, query} = require('../database');
const router = express.Router();
const {
  checkToken,
  createJWTToken,
  hashPassword,
  transporter,
  transportPromise,
} = require('../helper');

// REGISTER
router.post('/register', async (req, res) => {
  let {username, email, password} = req.body;
  const uid = Date.now();
  password = hashPassword(password);
  try {
    const insert = await query(
      `INSERT INTO users (uid, username, email, password, role, status ) VALUES (${uid}, '${username}', '${email}', '${password}', 2, 1)`
    );
    const responseData = {...insert[0]};
    responseData.token = createJWTToken(responseData);
    return res.status(200).send(responseData);
  } catch (err) {
    return res.status(500).send({message: 'ERROR REGISTER'});
  }
});

// LOGIN
router.post('/login', (req, res) => {
  const {username, password} = req.body;
  let sql = `
    SELECT 
      id,
      uid,
      username,
      email,
      password,
      role,
      status
    FROM users WHEre username = '${username}' AND password = '${hashPassword(
    password
  )}'
  `;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (data.length === 0) {
      return res.status(404).send({
        message: 'User Not Found',
        status: 'Not Found',
      });
    } else {
      const responseData = {...data[0]};
      const token = createJWTToken(responseData);
      responseData.token = token;
      console.log(responseData);
      return res.status(200).send(responseData);
    }
  });
});

//DEACTIVE ACCOUNT
// router.patch('/deactive', async (req, res) => {
//   const {token} = req.body;
//   const responseData = {...token[0]};
//   const token1 = createJWTToken(responseData);
//   responseData.token = token1;
//   console.log(token1);
//   console.log(responseData);
//   console.log(responseData.token);
//   try {
//     await query(`SELECT * FROM users WHERE id = ${responseData.id}`);
//     const response = await query(`
//     UPDATE users SET status = 2 WHERE id = ${responseData.id} `);
//     return res.status(200).send(response);
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// });

module.exports = router;
