const express = require('express')
const router = express.Router()
const pool = require('../db')

router.post('/', async (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO contacto (nombre, email, telefono, mensaje) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, telefono, mensaje]
    )
    res.json({ ok: true, data: result.rows[0] })
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message })
  }
})

module.exports = router