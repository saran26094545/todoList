import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo_db',
  password: '123456',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database', err);
    } else {
      console.log('Connected to the database');
    }
  });

app.get('/api/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/todos', async (req, res) => {
  const { title, completed } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
      [title, completed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  try {
    const result = await pool.query(
      'UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
      [title, completed, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.patch('/api/todos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    try {
      let query = 'UPDATE todos SET';
      const values = [];
      let paramCount = 1;
  
      if (title !== undefined) {
        query += ` title = $${paramCount}`;
        values.push(title);
        paramCount++;
      }
  
      if (completed !== undefined) {
        if (paramCount > 1) query += ',';
        query += ` completed = $${paramCount}`;
        values.push(completed);
        paramCount++;
      }
  
      query += ` WHERE id = $${paramCount} RETURNING *`;
      values.push(id);
  
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });