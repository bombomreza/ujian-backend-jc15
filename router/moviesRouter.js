const express = require('express');
const {db, query} = require('../database');
const {route} = require('./userRouter');
const router = express.Router();

//GET ALL
router.get('/get/all', async (req, res) => {
  try {
    let sql = `
    select 
	    m.name,
      m.release_date,
      m.release_month,
      m.release_year,
      m.duration_min,
      m.genre,
      m.description,
      ms.status,
      l.location,
      st.time
    from schedules s
    JOIN movies m ON m.id = s.movie_id
    JOIN locations l ON s.location_id = l.id
    JOIN show_times st ON s.time_id = st.id
    JOIN movie_status ms ON m.status = ms.id
    `;
    const response = await query(sql);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// GET STATUS
router.get('/get?status=:status', async (req, res) => {
  const status = req.params;
  try {
    let sql = `
    select 
        m.name,
        m.release_date,
        m.release_month,
        m.release_year,
        m.duration_min,
        m.genre,
        m.description,
        ms.status,
        l.location,
        st.time
      from schedules s
      JOIN movies m ON m.id = s.movie_id
      JOIN locations l ON s.location_id = l.id
      JOIN show_times st ON s.time_id = st.id
      JOIN movie_status ms ON m.status = ms.id
      WHERE ms.status = '${status}'
    `;
    const response = await query(sql);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// GET lOCATION
router.get('/geta', async (req, res) => {
  try {
    let sql = `
    select 
        m.name,
        m.release_date,
        m.release_month,
        m.release_year,
        m.duration_min,
        m.genre,
        m.description,
        ms.status,
        l.location,
        st.time
      from schedules s
      JOIN movies m ON m.id = s.movie_id
      JOIN locations l ON s.location_id = l.id
      JOIN show_times st ON s.time_id = st.id
      JOIN movie_status ms ON m.status = ms.id
      WHERE l.id = 1
    `;
    const response = await query(sql);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// GET TIME
router.get('/getaa', async (req, res) => {
  try {
    let sql = `
    select 
        m.name,
        m.release_date,
        m.release_month,
        m.release_year,
        m.duration_min,
        m.genre,
        m.description,
        ms.status,
        l.location,
        st.time
      from schedules s
      JOIN movies m ON m.id = s.movie_id
      JOIN locations l ON s.location_id = l.id
      JOIN show_times st ON s.time_id = st.id
      JOIN movie_status ms ON m.status = ms.id
      WHERE st.time = '9 AM'
    `;
    const response = await query(sql);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// GET AND AND AND
router.get('/getaaa', async (req, res) => {
  try {
    let sql = `
    select 
        m.name,
        m.release_date,
        m.release_month,
        m.release_year,
        m.duration_min,
        m.genre,
        m.description,
        ms.status,
        l.location,
        st.time
      from schedules s
      JOIN movies m ON m.id = s.movie_id
      JOIN locations l ON s.location_id = l.id
      JOIN show_times st ON s.time_id = st.id
      JOIN movie_status ms ON m.status = ms.id
      WHERE l.id = 1
    `;
    const response = await query(sql);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
});

//ADMIN POST
router.post('/add', async (req, res) => {
  try {
    const {
      name,
      genre,
      release_date,
      release_month,
      release_year,
      duration_min,
      description,
    } = req.body;
    await query(`INSERT INTO movies (name, genre, release_date,release_month, release_year, duration_min, description) VALUES (
      '${name}','${genre}',${release_date},${release_month},${release_year},${duration_min},'${description}'
    )`);
    return res.status(200).send('Movie Added');
  } catch (err) {
    return res.status(500).send(err);
  }
});

//ADMIN PATCH STATUS
router.patch('/edit/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {status, token} = req.body;
    const response = await query(`
      UPDATE movies SET status = ${status} WHERE id = ${id}
    `);
    return res.status(200).send({message: 'status has been change', id});
  } catch (err) {
    return res.status(500).send(err);
  }
});

//ADMIN PATCH TIME
router.patch('/set/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {location_id, time_id, token} = req.body;
    const insertSql = `INSERT INTO schedules SET movie_id= ${id}, location_id = ${location_id}, time_id = ${time_id}`;
    await query(insertSql);
    return res.status(200).send({message: 'schedule has been added', id});
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
