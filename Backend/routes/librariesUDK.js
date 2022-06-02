import express from 'express';
import Library from '../models/librarySchema.js';

const router = express.Router();

//returns all spaces on the floor with the selected udk
router.get('/:abbreviation/:udk', async (req, res) => {
    const queryResult = await Library.findOne({abbreviation: req.params.abbreviation}, 'file -_id');

    const file = await queryResult.file;

    //filters through spaces and then through bookshelves to find the bookshelf that matches the selected udk
    let space = file.filter(room => {
        const inner = room.bookshelves.filter(bookshelf => (bookshelf.udks.includes((req.params.udk))));
        if (inner.length === 0) return false;
        return true;
    });

    if(space.length != 0){
        let result = file.filter(room => (room.floor === space[0].floor));
        return res.json(result);
    } else {
        let result = file.filter(room => (room.floor === 0));
        return res.json(result);
    }
});

//returns all spaces on the first floor found
router.get('/:abbreviation', async (req, res) => {
    const queryResult = await Library.findOne({ abbreviation: req.params.abbreviation }, 'file -_id');

    const file = await queryResult.file;
    
    let floor = file[0].floor;
    let result = file.filter(room => (room.floor === floor));
    return res.json(result);
});

export default router;