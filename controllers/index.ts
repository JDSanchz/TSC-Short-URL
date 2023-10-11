import { Request, Response } from 'express';
import { Database } from '../Database';  // Assuming you have a Database class for DB operations
import { generateRandomString } from '../utils';  // Your utility function

export const shortenURL = async (req: Request, res: Response) => {
    const { originalURL } = req.body;
    const shortID = generateRandomString();
  
    // Store in the database
    const db = Database.getDB();
    if (db) {
      const collection = db.collection('short-urls');
      await collection.insertOne({ shortID, originalURL });
    }
  
    res.json({ shortID, originalURL });
  };
  export const redirectToOriginalURL = async (req: Request, res: Response) => {
    const { shortID } = req.params; // Assuming the shortID is passed as a URL parameter
    
    // Access the database
    const db = Database.getDB();
    if (db) {
      const collection = db.collection('short-urls');
      
      // Find the original URL corresponding to the shortID
      const result = await collection.findOne({ shortID });
      
      // If a result exists, redirect to the original URL
      if (result) {
        return res.redirect(result.originalURL);
      }
      
      // If not found, respond with a 404 error
      return res.status(404).json({ message: 'URL not found' });
    }
    
    // If database connection fails, respond with a 500 error
    res.status(500).json({ message: 'Database error' });
  };
  