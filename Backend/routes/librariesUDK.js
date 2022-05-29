import express from 'express';
import Library from '../models/librarySchema.js';

const router = express.Router();

//returns all spaces on the floor with the selected udk
router.get('/:abbreviation/:udk', async (req, res) => {
    const queryResult = await Library.findOne({abbreviation: req.params.abbreviation}, 'file -_id');

    const file = await queryResult.file;

    //filters through spaces and then through bookshelves to find the bookshelf that matches the selected udk
    let space = file.filter(prostor => {
        const inner = prostor.police.filter(polica => (polica.udk.includes((req.params.udk))));
        if (inner.length === 0) return false;
        return true;
    });

    if(space.length != 0){
        let result = file.filter(prostor => (prostor.nadstropje === space[0].nadstropje));
        return res.json(result);
    } else {
        let result = file.filter(prostor => (prostor.nadstropje === 0));
        return res.json(result);
    }
});

export default router;