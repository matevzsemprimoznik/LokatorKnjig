import express from 'express';
import Library from '../models/librarySchema.js';
import LibraryEditor from "../models/libraryEditorSchema.js";

const router = express.Router();

//get all floors and spaces of editor library
router.get('/:abbreviation/floors-and-spaces', async (req, res) => {
    try {
        const queryResult = await LibraryEditor.findOne({abbreviation: req.params.abbreviation}, 'file -_id');
        const file = queryResult.file;
        let allFloors = file.map(room => room.floor);
        const uniqueFloors = [...new Set(allFloors)];

        let allSpaces = file.map(room => room.label);

        let result = {
            "floors": uniqueFloors,
            "spaces": allSpaces
        }

        return res.json(result);
    } catch (err) {
        res.status(500).json("The server could not provide data specified");
    }
});

//get floor(spaces) of library with the given abbreviation
router.get('/:abbreviation/:floor', async (req, res) => {
    try {
        const queryResult = await LibraryEditor.findOne({abbreviation: req.params.abbreviation}, 'file svg -_id');
        const file = queryResult.file;
        const svg = queryResult.svg;

        let floor = file.filter(room => (room.floor == req.params.floor));


        let spacesWithSVG = [];

        for (const space of floor) {
            let index = svg.findIndex(svgSpace => (svgSpace.label == space.label));

            if(index != -1) {
                spacesWithSVG.push(svg[index]);
            }
        }

        return res.json(spacesWithSVG);
    } catch (err) {
        res.status(500).json("The server could not provide data specified");
    }
});

router.post('/:abbreviation', async (req, res) => {
    try {
        const library = await LibraryEditor.findOne({abbreviation: req.params.abbreviation}, 'file -_id');

        if(library == null) {
            const reqLibrary = req.body;
            const library = new LibraryEditor({ ...reqLibrary });
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

            let result = await LibraryEditor.updateOne({abbreviation: req.params.abbreviation}, {
                $set: {"file": spaces}
            });

            return res.json(result);
        }
    } catch (err) {
        res.status(500).json("The server could not add data specified");
    }
});

//adds new attributes to selected spaces
router.post('/:abbreviation/space/', async (req, res) => {
    try {
        const library = await LibraryEditor.findOne({abbreviation: req.params.abbreviation}, 'file -_id');

        if(library != null) {
            let spaces = library.file;

            //array of spaces being addded
            const newSpaces = req.body.spaces;
            for (const newSpace of newSpaces) {
                let index = spaces.findIndex(space => (space.label == newSpace.label));

                if (index == -1) {
                    spaces.push(newSpace);
                } else {
                    Object.assign(spaces[index], newSpace);
                }
            }


            let result = await LibraryEditor.updateOne({abbreviation: req.params.abbreviation}, {
                $set: {"file": spaces}
            });

            return res.json(result);
        }
    } catch (err) {
        res.status(500).json("The server could not add data specified");
    }
});

//add Library model to posted libraries on the website
router.post('/newLibrary/:abbreviation', async (req, res) => {
    try {
        const library = await LibraryEditor.findOne({abbreviation: req.params.abbreviation}, 'section abbreviation desc file -_id');
        const uploadedLibrary = await Library.findOne({abbreviation: req.params.abbreviation});

        if(library != null && uploadedLibrary === null) {
            //TODO turn json into correct format from editor format
            const file = [];

            const newLibrary = new Library({
                "section": library.section,
                "abbreviation": library.abbreviation,
                "desc": library.desc,
                "file": file
            });

            newLibrary.save();

            return res.status(200).json("The library has been posted.");
        } else {
            //TODO json format from editor format
            const file = [{"nekaj": "nekaj"}];

            const result = await Library.updateOne({abbreviation: req.params.abbreviation}, {
                "section": library.section, "desc": library.desc, "file": file
            });

            return res.json(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



export default router;