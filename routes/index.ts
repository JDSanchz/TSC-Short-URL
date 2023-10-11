import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

// Route to create short URL
router.post('/shorten', controllers.shortenURL);

// Route to redirect to original URL
router.get('/:shortID', controllers.redirectToOriginalURL);

export default router;
