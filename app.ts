import 'dotenv/config';
import express from 'express';
import { Database } from './Database';
import { generateRandomString } from './utils';
import routes from './routes';


const app = express();
const port = 3030;
const db = new Database(process.env.MONGODB_URI!);


app.use(express.json());  // For parsing application/json
app.use('/', routes);  // Use the routes

(async () => {
  // Initialize database connection
  await db.connect("short");

  // Define API endpoints
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
})();
