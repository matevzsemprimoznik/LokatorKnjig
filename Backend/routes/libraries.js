import express from 'express';
import Library from '../models/librarySchema.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const libraries = await Library.find();
  return res.json(libraries);
});

router.post('/',  async (req, res) => {
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
  const queryResult = await Library.findOne({abbreviation: req.params.abbreviation}, 'file -_id');
  const file = queryResult.file;
  //TODO: fix json format, change return response
  let floor = file.filter(prostor => (prostor.nadstropje == req.params.floor));

  return res.json(floor);
});

//adds new space to file of existing library
router.post('/:abbreviation', async (req, res) => {
  const library = await Library.findOne({abbreviation: req.params.abbreviation}, 'file -_id');

  if(library == null) {
    const reqLibrary = req.body;
    const library = new Library({ ...reqLibrary });
    const result = await library.save();

    return res.json(result);
  } else {
    let spaces = library.file;

    //[0] cause it's only one space being added per request
    const newSpace = req.body.file.prostori[0];
    let index = spaces.findIndex(prostor => (prostor.oznaka == newSpace.oznaka));

    if (index == -1) {
      spaces.push(newSpace);
    } else {
      spaces[index] = newSpace;
    }

    let result = await Library.updateOne({abbreviation: req.params.abbreviation}, {
      $set: {"desc": req.body.desc, "file": spaces}
    });

    return res.json(result);
  }
});

export default router;