"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToOriginalURL = exports.shortenURL = void 0;
const Database_1 = require("../Database"); // Assuming you have a Database class for DB operations
const utils_1 = require("../utils"); // Your utility function
const shortenURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { originalURL } = req.body;
    const shortID = (0, utils_1.generateRandomString)();
    // Store in the database
    const db = Database_1.Database.getDB();
    if (db) {
        const collection = db.collection('short-urls');
        yield collection.insertOne({ shortID, originalURL });
    }
    res.json({ shortID, originalURL });
});
exports.shortenURL = shortenURL;
const redirectToOriginalURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortID } = req.params; // Assuming the shortID is passed as a URL parameter
    // Access the database
    const db = Database_1.Database.getDB();
    if (db) {
        const collection = db.collection('short-urls');
        // Find the original URL corresponding to the shortID
        const result = yield collection.findOne({ shortID });
        // If a result exists, redirect to the original URL
        if (result) {
            return res.redirect(result.originalURL);
        }
        // If not found, respond with a 404 error
        return res.status(404).json({ message: 'URL not found' });
    }
    // If database connection fails, respond with a 500 error
    res.status(500).json({ message: 'Database error' });
});
exports.redirectToOriginalURL = redirectToOriginalURL;
