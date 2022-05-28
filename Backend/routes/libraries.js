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

//get all libraries (returns section, abbreviation and description of each library)
router.get('/all', async (req, res) => {
  const library = await Library.find({}, 'section abbreviation desc -_id');
  return res.json(library).status(200);
});

//get floor(spaces) of library with the given abbreviation
router.get('/:abbreviation/:floor', async (req, res) => {
  const queryResult = await Library.find({abbreviation: req.params.abbreviation}, 'file -_id');
  //TODO: fix json format, change return response
  //let floor = queryResult[0].file.prostori.filter(prostor => (prostor.nadstropje == req.params.floor));

  return res.json(queryResult[0].file);
});

//adds new space to file of existing library
router.post('/:abbreviation', async (req, res) => {
  const library = await Library.find({abbreviation: req.params.abbreviation}, 'file -_id');
  let file = library[0].file;

  const newSpace = req.body.space;

  /* TODO: fix json format
  let prostori = file.prostori;
  prostori.push(newSpace);

  let result = await Library.updateOne({abbreviation: req.params.abbreviation}, {
    "file": prostori
  });

  return res.json(result);*/
});

export default router;
