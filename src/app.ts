import express, { Request, Response } from 'express';
import path from 'path';
import sqlite3, { RunResult, ERROR } from 'sqlite3';
import bodyParser from 'body-parser';

// Initialize the Express app
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.post('/api/time-entries', (req: Request, res: Response) => {
    const {project,  hours, date} = req.body;

    const stmt = db.prepare('INSERT INTO time_entries (project, hours, date) VALUES (?, ? , ?)');
    stmt.run(project, hours, date, (err: Error |  null)  => {
        if(err){
            res.status(500).json({error: 'Failed to add time entry'});
            return;
        }

        res.status(201).json({message: 'Time entry added successfully'});
    });
});

app.get('/api/time-entries', (req: Request, res: Response) => {
    db.all('SELECT * FROM time_entries ORDER BY date DESC', (err: Error | null, rows: any[]) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch time entries' });
        return;
      }
  
      res.json(rows);
    });
  });
  
  app.get('/create-project', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'create_project.html'));
  });

  app.get('/api/projects', (req: Request, res: Response) => {
    db.all('SELECT project FROM time_entries', (err: Error | null, rows: any[]) => {
        if(err){
            res.status(500).json({error: 'Failed to fetch projects'});
            return;
        }

        res.json(rows);
    });
  });
  


// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '..', 'public')));



// Route handler for the root path
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});





// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



//*DATABASE */
// Set up SQLite database connection
const db = new sqlite3.Database(path.join(__dirname, '..', 'database', 'database.sqlite'));

db.run(`
  CREATE TABLE IF NOT EXISTS time_entries (
    id INTEGER PRIMARY KEY,
    project TEXT NOT NULL,
    hours REAL NOT NULL,
    date TEXT NOT NULL
  )
`);
