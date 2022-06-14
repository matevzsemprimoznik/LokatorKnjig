import express from 'express';
import Library from '../models/librarySchema.js';
import LibraryEditor from "../models/libraryEditorSchema.js";

import fs from 'fs';
import readline from 'readline';

const router = express.Router();

//get all libraries (returns section, abbreviation and description of each library)
router.get('/', async (req, res) => {
    try {
        const library = await LibraryEditor.find({}, 'section abbreviation desc -_id');
        return res.json(library).status(200);
    } catch (err) {
        return res.status(500).json("The server could not provide data specified");
    }
});

//get all floors and spaces of editor library
router.get('/:abbreviation/floors-and-spaces', async (req, res) => {
    try {
        const queryResult = await LibraryEditor.findOne({abbreviation: req.params.abbreviation}, 'file -_id').collation({
            locale: "sl",
            strength: 1
        });
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
        const queryResult = await LibraryEditor.findOne({abbreviation: req.params.abbreviation}, 'file svg -_id').collation({
            locale: "sl",
            strength: 1
        });
        const file = queryResult.file;
        const svg = queryResult.svg;

        let floor = file.filter(room => (room.floor == req.params.floor));


        let spacesWithSVG = [];

        for (const space of floor) {
            let index = svg.findIndex(svgSpace => (svgSpace.label == space.label));

            if (index != -1) {
                spacesWithSVG.push(svg[index]);
            }
        }

        return res.json(spacesWithSVG);
    } catch (err) {
        res.status(500).json("The server could not provide data specified");
    }
});

router.post('/', async (req, res) => {
    try {
        const editor = new LibraryEditor({
            "section": req.body.section,
            "abbreviation": req.body.abbreviation,
            "desc": req.body.desc,
            "file": [],
            "svg": [],
            "fileOrg": []
        });

        const editorResult = await editor.save();
        return res.json(editorResult);

    } catch (err) {
        return res.status(500).json("The server could not add data specified.");
    }

});

router.post('/:abbreviation', async (req, res) => {
    try {
        const library = await LibraryEditor.findOne({abbreviation: req.params.abbreviation}, 'file svg fileOrg -_id').collation({
            locale: "sl",
            strength: 1
        });

        if (library == null) {
            const reqLibrary = req.body;
            const library = new LibraryEditor({...reqLibrary});
            const result = await library.save();

            return res.json(result);
        } else {
            let spaces = library.file;
            let svgs = library.svg;
            let orgSpaces = library.fileOrg;

            //it's only one space being added per request as an object
            const newSpace = req.body.space;
            const newSvg = req.body.svg;
            const newOrgSpace = req.body.orgSpace;


            let index = spaces.findIndex(space => (space.label == newSpace.label));

            let data = newSvg.data;
            let split = data.split(','); // or whatever is appropriate here. this will work for the example given
            let base64string = split[1];
            let buffer = Buffer.from(base64string, 'base64');

            if (index == -1) {
                spaces.push(newSpace);
                svgs.push({label: req.body.svg.label, svg: buffer});
                orgSpaces.push(newOrgSpace);
            } else {
                spaces[index] = newSpace;
                svgs[index] = newSvg;
                orgSpaces[index] = newOrgSpace;
            }

            let result = await LibraryEditor.updateOne({abbreviation: req.params.abbreviation}, {
                $set: {
                    "file": spaces,
                    "svg": svgs,
                    "fileOrg": orgSpaces,
                }
            }).collation({locale: "sl", strength: 1});

            return res.json(result);
        }
    } catch (err) {
        console.log(err)
        res.status(500).json("The server could not add data specified");
    }
});

//adds new attributes to selected spaces
router.post('/:abbreviation/space/', async (req, res) => {
    try {
        const library = await LibraryEditor.findOne({abbreviation: req.params.abbreviation}, 'file -_id').collation({
            locale: "sl",
            strength: 1
        });

        if (library != null) {
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
            }).collation({locale: "sl", strength: 1});

            return res.json(result);
        }
    } catch (err) {
        res.status(500).json("The server could not add data specified");
    }
});

//add Library model to posted libraries on the website
router.post('/newLibrary/:abbreviation', async (req, res) => {
    try {
        const library = await LibraryEditor.findOne({abbreviation: req.params.abbreviation}, 'section abbreviation desc file -_id').collation({
            locale: "sl",
            strength: 1
        });
        const uploadedLibrary = await Library.findOne({abbreviation: req.params.abbreviation}).collation({
            locale: "sl",
            strength: 1
        });

        //console.log(library, uploadedLibrary)

        const arr = []
        await library.file[1].bookshelves.sort(
            function (a, b) {
                if (a.position.z === b.position.z) {
                    // Price is only important when cities are the same
                    if (a.position.x === b.position.x) {
                        // Price is only important when cities are the same
                        return b.position.y - a.position.y;
                    }
                    return a.position.x > b.position.x ? 1 : -1;
                }
                return a.position.z > b.position.z ? 1 : -1;
            });


        async function processLineByLine() {
            const fileStream = fs.createReadStream('./test.txt');

            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });
            // Note: we use the crlfDelay option to recognize all instances of CR LF
            // ('\r\n') in input.txt as a single line break.

            for await (const line of rl) {

                if (line !== '') {
                    arr.push([...line.split(',')])
                }

            }
        }

        await processLineByLine()


        library.file[1].bookshelves = library.file[1].bookshelves.map((b, index) => {
            console.log(arr[index])
            return {...b, udks: [...arr[index]]}
        })
        setTimeout(() => {
            console.log(library.file[1].bookshelves[0].udks)
            const newLibrary = new Library({
                "section": library.section,
                "abbreviation": library.abbreviation,
                "desc": library.desc,
                "file": library.file
            });

            newLibrary.save();
        }, 6000)
        if (library != null && uploadedLibrary === null) {

            const newLibrary = new Library({
                "section": library.section,
                "abbreviation": library.abbreviation,
                "desc": library.desc,
                "file": library.file
            });

            //newLibrary.save();

            return res.status(200).json("The library has been posted.");
        } else {

            const result = await Library.updateOne({abbreviation: req.params.abbreviation}, {
                "section": library.section, "desc": library.desc, "file": library.file
            }).collation({locale: "sl", strength: 1});

            return res.json(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


export default router;