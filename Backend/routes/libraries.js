import express from 'express';
import Library from '../models/librarySchema.js';
import { authenticateJWT } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const libraries = await Library.find();
  return res.json(libraries);
});

router.post('/', authenticateJWT, async (req, res) => {
  const reqLibrary = req.body.library;
  const library = new Library({ ...reqLibrary });
  const result = await library.save();
  return res.json(result);
});

export default router;
