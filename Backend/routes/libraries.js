import express from 'express';
import Library from '../models/librarySchema.js';
import {authenticateJWT} from "../middlewares/authenticate.js";
import LibraryEditor from "../models/libraryEditorSchema.js";
const router = express.Router();

//get all libraries (returns section, abbreviation and description of each library)
router.get('/', async (req, res) => {
  try {
    const library = await Library.find({}, 'section abbreviation desc -_id');
    return res.json(library).status(200);
  } catch (err) {
    return res.status(500).json("The server could not provide data specified");
  }
});

router.post('/',  async (req, res) => {
  try {

    const library = new Library({
      "section": req.body.section,
      "abbreviation": req.body.abbreviation,
      "desc": req.body.desc,
      "file": []
    });
    const editor = new LibraryEditor({
      "section": req.body.section,
      "abbreviation": req.body.abbreviation,
      "desc": req.body.desc,
      "file": []
    });

    const result = await library.save();
    const editorResult = await editor.save();
    return res.json(result);


  } catch (err) {
    return res.status(500).json("The server could not add data specified.");
  }

});

//get all floors of library
router.get('/:abbreviation/floors', async (req, res) => {
  try {
    const queryResult = await Library.findOne({abbreviation: req.params.abbreviation}, 'section file -_id');
    const file = queryResult.file;
    let allFloors = file.map(room => room.floor);
    const uniqueFloors = [...new Set(allFloors)];

    const floorsSorted = uniqueFloors.sort();

    const result = {
      "section": queryResult.section,
      "floors": floorsSorted
    }

    return res.json(result);
  } catch {
    res.status(500).json("The server could not provide data specified");
  }
});

//get all floors and spaces of library
router.get('/:abbreviation/floors-and-spaces', async (req, res) => {
  try {
    const queryResult = await Library.findOne({abbreviation: req.params.abbreviation}, 'file -_id');
    const file = queryResult.file;
    let allFloors = file.map(room => room.floor);
    const uniqueFloors = [...new Set(allFloors)];

    let allSpaces = file.map(room => room.label);

    let result = {
      "floors": uniqueFloors,
      "spaces": allSpaces
    }

    return res.json(result);
  } catch {
    res.status(500).json("The server could not provide data specified");
  }
});

//get floor(spaces) of library with the given abbreviation
router.get('/:abbreviation/:floor', async (req, res) => {
  try {
    const queryResult = await Library.findOne({abbreviation: req.params.abbreviation}, 'file -_id');
    const file = queryResult.file;

    let floor = file.filter(room => (room.floor == req.params.floor));

    return res.json(floor);
  } catch {
    res.status(500).json("The server could not provide data specified");
  }
});

//adds new space to file of existing library
router.post('/:abbreviation', async (req, res) => {
  try {
    const library = await Library.findOne({abbreviation: req.params.abbreviation}, 'file -_id');

    if(library == null) {
      const reqLibrary = req.body;
      const library = new Library({ ...reqLibrary });
      const result = await library.save();

      return res.json(result);
    } else {
      let spaces = library.file;

      //it's only one space being added per request as an object
      const newSpace = req.body.space;
      let index = spaces.findIndex(space => (space.label == newSpace.label));

      if (index == -1) {
        spaces.push(newSpace);
      } else {
        spaces[index] = newSpace;
      }

      let result = await Library.updateOne({abbreviation: req.params.abbreviation}, {
        $set: {"file": spaces}
      });

      return res.json(result);
    }
  } catch {
    res.status(500).json("The server could not add data specified");
  }
});

//adds new attributes to selected space
router.post('/:abbreviation/space/:spaceLabel', async (req, res) => {
  const library = await Library.findOne({abbreviation: req.params.abbreviation}, 'file -_id');

  if(library != null) {
    let spaces = library.file;

    //it's only one space being added per request
    const newSpace = req.body.space;
    let index = spaces.findIndex(space => (space.label == newSpace.label));

    if (index == -1) {
      spaces.push(newSpace);
    } else {
      let updatedSpace = Object.assign(spaces[index], newSpace);
      spaces[index] = updatedSpace;
    }

    let result = await Library.updateOne({abbreviation: req.params.abbreviation}, {
      $set: {"file": spaces}
    });

    return res.json(result);
  }
});

export default router;