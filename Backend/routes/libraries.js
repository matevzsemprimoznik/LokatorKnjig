import express from 'express';
import Library from '../models/librarySchema.js';
import {authenticateJWT} from "../middlewares/authenticate.js";

const router = express.Router();

router.get('/', async (req, res) => {
  const libraries = await Library.find();
  return res.json(libraries);
});

router.post('/',  async (req, res) => {
  //const reqLibrary = req.body.library;
  const library = new Library({
    "section":"Knjižnica tehniških fakultet",
    "abbreviation":"KTF",
    "desc":"Knjižnica tehniških fakultet se nahaja v Univerzi v Mariboru, na Smetanovi ulici 17. Odpiralni časi: PON-ČET: 7.30 - 16:30 PETEK: 7.30 - 14:30",
    "file": [
      {
        "label": "G-102",
        "floor": 0,
        "ground": [
          {
            "x": -15,
            "y": 0,
            "z": 15
          },
          {
            "x": -15,
            "y": 0,
            "z": -15
          },
          {
            "x": 15,
            "y": 0,
            "z": 15
          },
          {
            "x": 15,
            "y": 0,
            "z": -15
          }
        ],
        "entrances": [
          {
            "position": {
              "x": -11,
              "y": 0,
              "z": -7.5
            },
            "rotation": 0
          }
        ],
        "bookshelves": [
          {
            "udks": [
              "0"
            ],
            "position": {
              "z": -7.39,
              "y": 0.4,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "1"
            ],
            "position": {
              "z": -7.39,
              "y": 1.04,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "2"
            ],
            "position": {
              "z": -7.39,
              "y": 1.68,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "3"
            ],
            "position": {
              "z": -7.39,
              "y": 2.32,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "4"
            ],
            "position": {
              "z": -7.39,
              "y": 2.96,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "5"
            ],
            "position": {
              "z": -7.39,
              "y": 3.6,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "6"
            ],
            "position": {
              "z": -7.39,
              "y": 0.4,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "7"
            ],
            "position": {
              "z": -7.39,
              "y": 1.04,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "8"
            ],
            "position": {
              "z": -7.39,
              "y": 1.68,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "9"
            ],
            "position": {
              "z": -7.39,
              "y": 2.32,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "10"
            ],
            "position": {
              "z": -7.39,
              "y": 2.96,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "11"
            ],
            "position": {
              "z": -7.39,
              "y": 3.6,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "12"
            ],
            "position": {
              "z": -7.39,
              "y": 0.4,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "13"
            ],
            "position": {
              "z": -7.39,
              "y": 1.04,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "14"
            ],
            "position": {
              "z": -7.39,
              "y": 1.68,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "15"
            ],
            "position": {
              "z": -7.39,
              "y": 2.32,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "16"
            ],
            "position": {
              "z": -7.39,
              "y": 2.96,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "17"
            ],
            "position": {
              "z": -7.39,
              "y": 3.6,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "18"
            ],
            "position": {
              "z": -7.39,
              "y": 0.4,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "19"
            ],
            "position": {
              "z": -7.39,
              "y": 1.04,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "20"
            ],
            "position": {
              "z": -7.39,
              "y": 1.68,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "21"
            ],
            "position": {
              "z": -7.39,
              "y": 2.32,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "22"
            ],
            "position": {
              "z": -7.39,
              "y": 2.96,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "23"
            ],
            "position": {
              "z": -7.39,
              "y": 3.6,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "24"
            ],
            "position": {
              "z": -7.39,
              "y": 0.4,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "25"
            ],
            "position": {
              "z": -7.39,
              "y": 1.04,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "26"
            ],
            "position": {
              "z": -7.39,
              "y": 1.68,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "27"
            ],
            "position": {
              "z": -7.39,
              "y": 2.32,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "28"
            ],
            "position": {
              "z": -7.39,
              "y": 2.96,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "29"
            ],
            "position": {
              "z": -7.39,
              "y": 3.6,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "30"
            ],
            "position": {
              "z": -7.39,
              "y": 0.4,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "31"
            ],
            "position": {
              "z": -7.39,
              "y": 1.04,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "32"
            ],
            "position": {
              "z": -7.39,
              "y": 1.68,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "33"
            ],
            "position": {
              "z": -7.39,
              "y": 2.32,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "34"
            ],
            "position": {
              "z": -7.39,
              "y": 2.96,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "35"
            ],
            "position": {
              "z": -7.39,
              "y": 3.6,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "36"
            ],
            "position": {
              "z": -7.39,
              "y": 0.4,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "37"
            ],
            "position": {
              "z": -7.39,
              "y": 1.04,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "38"
            ],
            "position": {
              "z": -7.39,
              "y": 1.68,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "39"
            ],
            "position": {
              "z": -7.39,
              "y": 2.32,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "40"
            ],
            "position": {
              "z": -7.39,
              "y": 2.96,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "41"
            ],
            "position": {
              "z": -7.39,
              "y": 3.6,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "42"
            ],
            "position": {
              "z": -7.39,
              "y": 0.4,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "43"
            ],
            "position": {
              "z": -7.39,
              "y": 1.04,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "44"
            ],
            "position": {
              "z": -7.39,
              "y": 1.68,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "45"
            ],
            "position": {
              "z": -7.39,
              "y": 2.32,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "46"
            ],
            "position": {
              "z": -7.39,
              "y": 2.96,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "47"
            ],
            "position": {
              "z": -7.39,
              "y": 3.6,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "48"
            ],
            "position": {
              "z": -7.39,
              "y": 0.4,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "49"
            ],
            "position": {
              "z": -7.39,
              "y": 1.04,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "50"
            ],
            "position": {
              "z": -7.39,
              "y": 1.68,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "51"
            ],
            "position": {
              "z": -7.39,
              "y": 2.32,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "52"
            ],
            "position": {
              "z": -7.39,
              "y": 2.96,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "53"
            ],
            "position": {
              "z": -7.39,
              "y": 3.6,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "54"
            ],
            "position": {
              "z": -7.39,
              "y": 0.4,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "55"
            ],
            "position": {
              "z": -7.39,
              "y": 1.04,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "56"
            ],
            "position": {
              "z": -7.39,
              "y": 1.68,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "57"
            ],
            "position": {
              "z": -7.39,
              "y": 2.32,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "58"
            ],
            "position": {
              "z": -7.39,
              "y": 2.96,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "59"
            ],
            "position": {
              "z": -7.39,
              "y": 3.6,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "53"
            ],
            "position": {
              "z": -5,
              "y": 0.4,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "53"
            ],
            "position": {
              "z": -5,
              "y": 1.04,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "53"
            ],
            "position": {
              "z": -5,
              "y": 1.68,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "53"
            ],
            "position": {
              "z": -5,
              "y": 2.32,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "53"
            ],
            "position": {
              "z": -5,
              "y": 2.96,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "53"
            ],
            "position": {
              "z": -5,
              "y": 3.6,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "528"
            ],
            "position": {
              "z": -5,
              "y": 0.4,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "52", "528"
            ],
            "position": {
              "z": -5,
              "y": 1.04,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "519.8"
            ],
            "position": {
              "z": -5,
              "y": 1.68,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "519.6", "519.7", "519.8"
            ],
            "position": {
              "z": -5,
              "y": 2.32,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "519.6"
            ],
            "position": {
              "z": -5,
              "y": 2.96,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "519.6"
            ],
            "position": {
              "z": -5,
              "y": 3.6,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "519.2"
            ],
            "position": {
              "z": -5,
              "y": 0.4,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "519.2"
            ],
            "position": {
              "z": -5,
              "y": 1.04,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "519.1"
            ],
            "position": {
              "z": -5,
              "y": 1.68,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "517"
            ],
            "position": {
              "z": -5,
              "y": 2.32,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "517"
            ],
            "position": {
              "z": -5,
              "y": 2.96,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "517"
            ],
            "position": {
              "z": -5,
              "y": 3.6,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "517"
            ],
            "position": {
              "z": -5,
              "y": 0.4,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "517"
            ],
            "position": {
              "z": -5,
              "y": 1.04,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "517"
            ],
            "position": {
              "z": -5,
              "y": 1.68,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "517"
            ],
            "position": {
              "z": -5,
              "y": 2.32,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "517"
            ],
            "position": {
              "z": -5,
              "y": 2.96,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "517"
            ],
            "position": {
              "z": -5,
              "y": 3.6,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "514"
            ],
            "position": {
              "z": -5,
              "y": 0.4,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "514"
            ],
            "position": {
              "z": -5,
              "y": 1.04,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "512"
            ],
            "position": {
              "z": -5,
              "y": 1.68,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "512"
            ],
            "position": {
              "z": -5,
              "y": 2.32,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "512"
            ],
            "position": {
              "z": -5,
              "y": 2.96,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "510", "511", "512"
            ],
            "position": {
              "z": -5,
              "y": 3.6,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "516"
            ],
            "position": {
              "z": -5,
              "y": 0.4,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "51"
            ],
            "position": {
              "z": -5,
              "y": 1.04,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "51"
            ],
            "position": {
              "z": -5,
              "y": 1.68,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "51"
            ],
            "position": {
              "z": -5,
              "y": 2.32,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "51"
            ],
            "position": {
              "z": -5,
              "y": 2.96,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "51"
            ],
            "position": {
              "z": -5,
              "y": 3.6,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "504"
            ],
            "position": {
              "z": -5,
              "y": 0.4,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "504"
            ],
            "position": {
              "z": -5,
              "y": 1.04,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "37", "37.004", "389", "5", "502", "504"
            ],
            "position": {
              "z": -5,
              "y": 1.68,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "37"
            ],
            "position": {
              "z": -5,
              "y": 2.32,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "35", "36", "37"
            ],
            "position": {
              "z": -5,
              "y": 2.96,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "34"
            ],
            "position": {
              "z": -5,
              "y": 3.6,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "34"
            ],
            "position": {
              "z": -5,
              "y": 0.4,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "34"
            ],
            "position": {
              "z": -5,
              "y": 1.04,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "338"
            ],
            "position": {
              "z": -5,
              "y": 1.68,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "336"
            ],
            "position": {
              "z": -5,
              "y": 2.32,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "331.4"
            ],
            "position": {
              "z": -5,
              "y": 2.96,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "331"
            ],
            "position": {
              "z": -5,
              "y": 3.6,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "331"
            ],
            "position": {
              "z": -5,
              "y": 0.4,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "33"
            ],
            "position": {
              "z": -5,
              "y": 1.04,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "33"
            ],
            "position": {
              "z": -5,
              "y": 1.68,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "32"
            ],
            "position": {
              "z": -5,
              "y": 2.32,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "31"
            ],
            "position": {
              "z": -5,
              "y": 2.96,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "31"
            ],
            "position": {
              "z": -5,
              "y": 3.6,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "3"
            ],
            "position": {
              "z": -5,
              "y": 0.4,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "159.9", "16", "17"
            ],
            "position": {
              "z": -5,
              "y": 1.04,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "159.9"
            ],
            "position": {
              "z": -5,
              "y": 1.68,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "1", "159.9"
            ],
            "position": {
              "z": -5,
              "y": 2.32,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "001", "02"
            ],
            "position": {
              "z": -5,
              "y": 2.96,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "001"
            ],
            "position": {
              "z": -5,
              "y": 3.6,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "531.2", "531.3"
            ],
            "position": {
              "z": -4.5,
              "y": 0.4,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "531.2"
            ],
            "position": {
              "z": -4.5,
              "y": 1.04,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "531.1"
            ],
            "position": {
              "z": -4.5,
              "y": 1.68,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "531"
            ],
            "position": {
              "z": -4.5,
              "y": 2.32,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "531"
            ],
            "position": {
              "z": -4.5,
              "y": 2.96,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "531"
            ],
            "position": {
              "z": -4.5,
              "y": 3.6,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "534"
            ],
            "position": {
              "z": -4.5,
              "y": 0.4,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "532", "533", "534"
            ],
            "position": {
              "z": -4.5,
              "y": 1.04,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "532"
            ],
            "position": {
              "z": -4.5,
              "y": 1.68,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "532"
            ],
            "position": {
              "z": -4.5,
              "y": 2.32,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "531.7"
            ],
            "position": {
              "z": -4.5,
              "y": 2.96,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "531.3"
            ],
            "position": {
              "z": -4.5,
              "y": 3.6,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "536", "537"
            ],
            "position": {
              "z": -4.5,
              "y": 0.4,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "536"
            ],
            "position": {
              "z": -4.5,
              "y": 1.04,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "536"
            ],
            "position": {
              "z": -4.5,
              "y": 1.68,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "536"
            ],
            "position": {
              "z": -4.5,
              "y": 2.32,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "536"
            ],
            "position": {
              "z": -4.5,
              "y": 2.96,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "535.6"
            ],
            "position": {
              "z": -4.5,
              "y": 3.6,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "539.4"
            ],
            "position": {
              "z": -4.5,
              "y": 0.4,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "539.4"
            ],
            "position": {
              "z": -4.5,
              "y": 1.04,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "539.3"
            ],
            "position": {
              "z": -4.5,
              "y": 1.68,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "539.3"
            ],
            "position": {
              "z": -4.5,
              "y": 2.32,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "539"
            ],
            "position": {
              "z": -4.5,
              "y": 2.96,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "537", "539"
            ],
            "position": {
              "z": -4.5,
              "y": 3.6,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "541.1"
            ],
            "position": {
              "z": -4.5,
              "y": 0.4,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "541.1"
            ],
            "position": {
              "z": -4.5,
              "y": 1.04,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "541.1"
            ],
            "position": {
              "z": -4.5,
              "y": 1.68,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "54", "541.1"
            ],
            "position": {
              "z": -4.5,
              "y": 2.32,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "54"
            ],
            "position": {
              "z": -4.5,
              "y": 2.96,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "54"
            ],
            "position": {
              "z": -4.5,
              "y": 3.6,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "543"
            ],
            "position": {
              "z": -4.5,
              "y": 0.4,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "543"
            ],
            "position": {
              "z": -4.5,
              "y": 1.04,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "541.6", "541.64", "542"
            ],
            "position": {
              "z": -4.5,
              "y": 1.68,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "541.2", "541.4", "541.6"
            ],
            "position": {
              "z": -4.5,
              "y": 2.32,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "541.1"
            ],
            "position": {
              "z": -4.5,
              "y": 2.96,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "541.1"
            ],
            "position": {
              "z": -4.5,
              "y": 3.6,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "546"
            ],
            "position": {
              "z": -4.5,
              "y": 0.4,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "543", "546"
            ],
            "position": {
              "z": -4.5,
              "y": 1.04,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "543"
            ],
            "position": {
              "z": -4.5,
              "y": 1.68,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "543"
            ],
            "position": {
              "z": -4.5,
              "y": 2.32,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "543"
            ],
            "position": {
              "z": -4.5,
              "y": 2.96,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "543"
            ],
            "position": {
              "z": -4.5,
              "y": 3.6,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "547"
            ],
            "position": {
              "z": -4.5,
              "y": 0.4,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "547"
            ],
            "position": {
              "z": -4.5,
              "y": 1.04,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "547"
            ],
            "position": {
              "z": -4.5,
              "y": 1.68,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "547"
            ],
            "position": {
              "z": -4.5,
              "y": 2.32,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "546", "547"
            ],
            "position": {
              "z": -4.5,
              "y": 2.96,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "546"
            ],
            "position": {
              "z": -4.5,
              "y": 3.6,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "57", "577"
            ],
            "position": {
              "z": -4.5,
              "y": 0.4,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "55", "57"
            ],
            "position": {
              "z": -4.5,
              "y": 1.04,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "547.1", "548"
            ],
            "position": {
              "z": -4.5,
              "y": 1.68,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "547", "547.1"
            ],
            "position": {
              "z": -4.5,
              "y": 2.32,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "547"
            ],
            "position": {
              "z": -4.5,
              "y": 2.96,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "547"
            ],
            "position": {
              "z": -4.5,
              "y": 3.6,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "620.1"
            ],
            "position": {
              "z": -4.5,
              "y": 0.4,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "620.1"
            ],
            "position": {
              "z": -4.5,
              "y": 1.04,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "620", "620.1"
            ],
            "position": {
              "z": -4.5,
              "y": 1.68,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "62"
            ],
            "position": {
              "z": -4.5,
              "y": 2.32,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "61", "62"
            ],
            "position": {
              "z": -4.5,
              "y": 2.96,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "577", "61"
            ],
            "position": {
              "z": -4.5,
              "y": 3.6,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.39"
            ],
            "position": {
              "z": -2.11,
              "y": 0.4,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.39"
            ],
            "position": {
              "z": -2.11,
              "y": 1.04,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.39"
            ],
            "position": {
              "z": -2.11,
              "y": 1.68,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.38.3", "621.39"
            ],
            "position": {
              "z": -2.11,
              "y": 2.32,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.38.3"
            ],
            "position": {
              "z": -2.11,
              "y": 2.96,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.38"
            ],
            "position": {
              "z": -2.11,
              "y": 3.6,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.38"
            ],
            "position": {
              "z": -2.11,
              "y": 0.4,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.38"
            ],
            "position": {
              "z": -2.11,
              "y": 1.04,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.38"
            ],
            "position": {
              "z": -2.11,
              "y": 1.68,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.38"
            ],
            "position": {
              "z": -2.11,
              "y": 2.32,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.38"
            ],
            "position": {
              "z": -2.11,
              "y": 2.96,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.38"
            ],
            "position": {
              "z": -2.11,
              "y": 3.6,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.38"
            ],
            "position": {
              "z": -2.11,
              "y": 0.4,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.38"
            ],
            "position": {
              "z": -2.11,
              "y": 1.04,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.376", "621.38"
            ],
            "position": {
              "z": -2.11,
              "y": 1.68,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.375"
            ],
            "position": {
              "z": -2.11,
              "y": 2.32,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.372"
            ],
            "position": {
              "z": -2.11,
              "y": 2.96,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.37"
            ],
            "position": {
              "z": -2.11,
              "y": 3.6,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.37"
            ],
            "position": {
              "z": -2.11,
              "y": 0.4,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.32", "621.36"
            ],
            "position": {
              "z": -2.11,
              "y": 1.04,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.317", "621.318"
            ],
            "position": {
              "z": -2.11,
              "y": 1.68,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.317"
            ],
            "position": {
              "z": -2.11,
              "y": 2.32,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.317"
            ],
            "position": {
              "z": -2.11,
              "y": 2.96,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.317"
            ],
            "position": {
              "z": -2.11,
              "y": 3.6,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.316"
            ],
            "position": {
              "z": -2.11,
              "y": 0.4,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.316"
            ],
            "position": {
              "z": -2.11,
              "y": 1.04,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.315", "621.316"
            ],
            "position": {
              "z": -2.11,
              "y": 1.68,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.314", "621.315"
            ],
            "position": {
              "z": -2.11,
              "y": 2.32,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.314"
            ],
            "position": {
              "z": -2.11,
              "y": 2.96,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.313"
            ],
            "position": {
              "z": -2.11,
              "y": 3.6,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.313"
            ],
            "position": {
              "z": -2.11,
              "y": 0.4,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.313"
            ],
            "position": {
              "z": -2.11,
              "y": 1.04,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.313"
            ],
            "position": {
              "z": -2.11,
              "y": 1.68,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.31"
            ],
            "position": {
              "z": -2.11,
              "y": 2.32,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.31"
            ],
            "position": {
              "z": -2.11,
              "y": 2.96,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.31"
            ],
            "position": {
              "z": -2.11,
              "y": 3.6,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.31"
            ],
            "position": {
              "z": -2.11,
              "y": 0.4,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.3.04", "621.31"
            ],
            "position": {
              "z": -2.11,
              "y": 1.04,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.3.049"
            ],
            "position": {
              "z": -2.11,
              "y": 1.68,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.3.049"
            ],
            "position": {
              "z": -2.11,
              "y": 2.32,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.3.049"
            ],
            "position": {
              "z": -2.11,
              "y": 2.96,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.3"
            ],
            "position": {
              "z": -2.11,
              "y": 3.6,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.3"
            ],
            "position": {
              "z": -2.11,
              "y": 0.4,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.3"
            ],
            "position": {
              "z": -2.11,
              "y": 1.04,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.3"
            ],
            "position": {
              "z": -2.11,
              "y": 1.68,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.3"
            ],
            "position": {
              "z": -2.11,
              "y": 2.32,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.3"
            ],
            "position": {
              "z": -2.11,
              "y": 2.96,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.22"
            ],
            "position": {
              "z": -2.11,
              "y": 3.6,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.1", "621.18"
            ],
            "position": {
              "z": -2.11,
              "y": 0.4,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.039", "621.1"
            ],
            "position": {
              "z": -2.11,
              "y": 1.04,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "621-5"
            ],
            "position": {
              "z": -2.11,
              "y": 1.68,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "621-5"
            ],
            "position": {
              "z": -2.11,
              "y": 2.32,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "621-5"
            ],
            "position": {
              "z": -2.11,
              "y": 2.96,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "621-5"
            ],
            "position": {
              "z": -2.11,
              "y": 3.6,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "621-11"
            ],
            "position": {
              "z": -2.11,
              "y": 0.4,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "621"
            ],
            "position": {
              "z": -2.11,
              "y": 1.04,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "621"
            ],
            "position": {
              "z": -2.11,
              "y": 1.68,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "621"
            ],
            "position": {
              "z": -2.11,
              "y": 2.32,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "620.9"
            ],
            "position": {
              "z": -2.11,
              "y": 2.96,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "620.18"
            ],
            "position": {
              "z": -2.11,
              "y": 3.6,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "621.395"
            ],
            "position": {
              "z": -1.61,
              "y": 0.4,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.391"
            ],
            "position": {
              "z": -1.61,
              "y": 1.04,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.391"
            ],
            "position": {
              "z": -1.61,
              "y": 1.68,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.391"
            ],
            "position": {
              "z": -1.61,
              "y": 2.32,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.391"
            ],
            "position": {
              "z": -1.61,
              "y": 2.96,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.391"
            ],
            "position": {
              "z": -1.61,
              "y": 3.6,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.43", "621.45"
            ],
            "position": {
              "z": -1.61,
              "y": 0.4,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.43"
            ],
            "position": {
              "z": -1.61,
              "y": 1.04,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.43"
            ],
            "position": {
              "z": -1.61,
              "y": 1.68,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.3", "621.43"
            ],
            "position": {
              "z": -1.61,
              "y": 2.32,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.394"
            ],
            "position": {
              "z": -1.61,
              "y": 2.96,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.396"
            ],
            "position": {
              "z": -1.61,
              "y": 3.6,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.7"
            ],
            "position": {
              "z": -1.61,
              "y": 0.4,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.65"
            ],
            "position": {
              "z": -1.61,
              "y": 1.04,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.6", "621.65"
            ],
            "position": {
              "z": -1.61,
              "y": 1.68,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.6"
            ],
            "position": {
              "z": -1.61,
              "y": 2.32,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.5", "621.6"
            ],
            "position": {
              "z": -1.61,
              "y": 2.96,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.5"
            ],
            "position": {
              "z": -1.61,
              "y": 3.6,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.7.08"
            ],
            "position": {
              "z": -1.61,
              "y": 0.4,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.7.08"
            ],
            "position": {
              "z": -1.61,
              "y": 1.04,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.7.08"
            ],
            "position": {
              "z": -1.61,
              "y": 1.68,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.7"
            ],
            "position": {
              "z": -1.61,
              "y": 2.32,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.7"
            ],
            "position": {
              "z": -1.61,
              "y": 2.96,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.7"
            ],
            "position": {
              "z": -1.61,
              "y": 3.6,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.8"
            ],
            "position": {
              "z": -1.61,
              "y": 0.4,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.791", "621.8"
            ],
            "position": {
              "z": -1.61,
              "y": 1.04,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.791"
            ],
            "position": {
              "z": -1.61,
              "y": 1.68,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.77", "621.78"
            ],
            "position": {
              "z": -1.61,
              "y": 2.32,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.77"
            ],
            "position": {
              "z": -1.61,
              "y": 2.96,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.73", "621.74"
            ],
            "position": {
              "z": -1.61,
              "y": 3.6,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.86"
            ],
            "position": {
              "z": -1.61,
              "y": 0.4,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.83", "621.85"
            ],
            "position": {
              "z": -1.61,
              "y": 1.04,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.83"
            ],
            "position": {
              "z": -1.61,
              "y": 1.68,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.83"
            ],
            "position": {
              "z": -1.61,
              "y": 2.32,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.8"
            ],
            "position": {
              "z": -1.61,
              "y": 2.96,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.8"
            ],
            "position": {
              "z": -1.61,
              "y": 3.6,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.9"
            ],
            "position": {
              "z": -1.61,
              "y": 0.4,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.9"
            ],
            "position": {
              "z": -1.61,
              "y": 1.04,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.9"
            ],
            "position": {
              "z": -1.61,
              "y": 1.68,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.9"
            ],
            "position": {
              "z": -1.61,
              "y": 2.32,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.9"
            ],
            "position": {
              "z": -1.61,
              "y": 2.96,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.89", "621.9"
            ],
            "position": {
              "z": -1.61,
              "y": 3.6,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "624"
            ],
            "position": {
              "z": -1.61,
              "y": 0.4,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "624"
            ],
            "position": {
              "z": -1.61,
              "y": 1.04,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "624"
            ],
            "position": {
              "z": -1.61,
              "y": 1.68,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.9", "624"
            ],
            "position": {
              "z": -1.61,
              "y": 2.32,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.9"
            ],
            "position": {
              "z": -1.61,
              "y": 2.96,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "621.9"
            ],
            "position": {
              "z": -1.61,
              "y": 3.6,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "624.01"
            ],
            "position": {
              "z": -1.61,
              "y": 0.4,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "624.01"
            ],
            "position": {
              "z": -1.61,
              "y": 1.04,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "624.01"
            ],
            "position": {
              "z": -1.61,
              "y": 1.68,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "624.01"
            ],
            "position": {
              "z": -1.61,
              "y": 2.32,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "624.01"
            ],
            "position": {
              "z": -1.61,
              "y": 2.96,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "624", "624.01"
            ],
            "position": {
              "z": -1.61,
              "y": 3.6,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "624.04"
            ],
            "position": {
              "z": -1.61,
              "y": 0.4,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "624.04"
            ],
            "position": {
              "z": -1.61,
              "y": 1.04,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "624.04"
            ],
            "position": {
              "z": -1.61,
              "y": 1.68,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "624.04"
            ],
            "position": {
              "z": -1.61,
              "y": 2.32,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "624.04"
            ],
            "position": {
              "z": -1.61,
              "y": 2.96,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "624.01"
            ],
            "position": {
              "z": -1.61,
              "y": 3.6,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "669"
            ],
            "position": {
              "z": 0.78,
              "y": 0.4,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "669"
            ],
            "position": {
              "z": 0.78,
              "y": 1.04,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "669"
            ],
            "position": {
              "z": 0.78,
              "y": 1.68,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "667", "669"
            ],
            "position": {
              "z": 0.78,
              "y": 2.32,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "664", "666", "667"
            ],
            "position": {
              "z": 0.78,
              "y": 2.96,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "662", "663", "664"
            ],
            "position": {
              "z": 0.78,
              "y": 3.6,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "661"
            ],
            "position": {
              "z": 0.78,
              "y": 0.4,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "66.06", "661"
            ],
            "position": {
              "z": 0.78,
              "y": 1.04,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "66.04", "66.06"
            ],
            "position": {
              "z": 0.78,
              "y": 1.68,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "66.04"
            ],
            "position": {
              "z": 0.78,
              "y": 2.32,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "66.017"
            ],
            "position": {
              "z": 0.78,
              "y": 2.96,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "66.0"
            ],
            "position": {
              "z": 0.78,
              "y": 3.6,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "66.0"
            ],
            "position": {
              "z": 0.78,
              "y": 0.4,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "66.0"
            ],
            "position": {
              "z": 0.78,
              "y": 1.04,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "66.0"
            ],
            "position": {
              "z": 0.78,
              "y": 1.68,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "66", "66.0"
            ],
            "position": {
              "z": 0.78,
              "y": 2.32,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "66"
            ],
            "position": {
              "z": 0.78,
              "y": 2.96,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "66"
            ],
            "position": {
              "z": 0.78,
              "y": 3.6,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "658.56"
            ],
            "position": {
              "z": 0.78,
              "y": 0.4,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "658.52", "658.56"
            ],
            "position": {
              "z": 0.78,
              "y": 1.04,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "658.5", "658.512", "658.52"
            ],
            "position": {
              "z": 0.78,
              "y": 1.68,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "658.5"
            ],
            "position": {
              "z": 0.78,
              "y": 2.32,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "658.5"
            ],
            "position": {
              "z": 0.78,
              "y": 2.96,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "658.5"
            ],
            "position": {
              "z": 0.78,
              "y": 3.6,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "658.5"
            ],
            "position": {
              "z": 0.78,
              "y": 0.4,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "658"
            ],
            "position": {
              "z": 0.78,
              "y": 1.04,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "656.1", "658"
            ],
            "position": {
              "z": 0.78,
              "y": 1.68,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "656", "656.1"
            ],
            "position": {
              "z": 0.78,
              "y": 2.32,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "656"
            ],
            "position": {
              "z": 0.78,
              "y": 2.96,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "656"
            ],
            "position": {
              "z": 0.78,
              "y": 3.6,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "656"
            ],
            "position": {
              "z": 0.78,
              "y": 0.4,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "654+659", "655", "656"
            ],
            "position": {
              "z": 0.78,
              "y": 1.04,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "654.1", "654+659"
            ],
            "position": {
              "z": 0.78,
              "y": 1.68,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "65.015", "651"
            ],
            "position": {
              "z": 0.78,
              "y": 2.32,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "65.015"
            ],
            "position": {
              "z": 0.78,
              "y": 2.96,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "65.015"
            ],
            "position": {
              "z": 0.78,
              "y": 3.6,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "65"
            ],
            "position": {
              "z": 0.78,
              "y": 0.4,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "65"
            ],
            "position": {
              "z": 0.78,
              "y": 1.04,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "65"
            ],
            "position": {
              "z": 0.78,
              "y": 1.68,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "65"
            ],
            "position": {
              "z": 0.78,
              "y": 2.32,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "65"
            ],
            "position": {
              "z": 0.78,
              "y": 2.96,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "65"
            ],
            "position": {
              "z": 0.78,
              "y": 3.6,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "65"
            ],
            "position": {
              "z": 0.78,
              "y": 0.4,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "65"
            ],
            "position": {
              "z": 0.78,
              "y": 1.04,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "629"
            ],
            "position": {
              "z": 0.78,
              "y": 1.68,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "629"
            ],
            "position": {
              "z": 0.78,
              "y": 2.32,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "628.9", "629"
            ],
            "position": {
              "z": 0.78,
              "y": 2.96,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "628.5"
            ],
            "position": {
              "z": 0.78,
              "y": 3.6,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "628", "628.4"
            ],
            "position": {
              "z": 0.78,
              "y": 0.4,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "628"
            ],
            "position": {
              "z": 0.78,
              "y": 1.04,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "626"
            ],
            "position": {
              "z": 0.78,
              "y": 1.68,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "625"
            ],
            "position": {
              "z": 0.78,
              "y": 2.32,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "625"
            ],
            "position": {
              "z": 0.78,
              "y": 2.96,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "625"
            ],
            "position": {
              "z": 0.78,
              "y": 3.6,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "624.2", "624.9"
            ],
            "position": {
              "z": 0.78,
              "y": 0.4,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "624.1"
            ],
            "position": {
              "z": 0.78,
              "y": 1.04,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "624.1"
            ],
            "position": {
              "z": 0.78,
              "y": 1.68,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "624.1"
            ],
            "position": {
              "z": 0.78,
              "y": 2.32,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "624.1"
            ],
            "position": {
              "z": 0.78,
              "y": 2.96,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "624.1"
            ],
            "position": {
              "z": 0.78,
              "y": 3.6,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "677.02"
            ],
            "position": {
              "z": 1.28,
              "y": 0.4,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "677", "677.02"
            ],
            "position": {
              "z": 1.28,
              "y": 1.04,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "677"
            ],
            "position": {
              "z": 1.28,
              "y": 1.68,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "677"
            ],
            "position": {
              "z": 1.28,
              "y": 2.32,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "677"
            ],
            "position": {
              "z": 1.28,
              "y": 2.96,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "675", "677"
            ],
            "position": {
              "z": 1.28,
              "y": 3.6,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "678"
            ],
            "position": {
              "z": 1.28,
              "y": 0.4,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "678"
            ],
            "position": {
              "z": 1.28,
              "y": 1.04,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "677.1", "678"
            ],
            "position": {
              "z": 1.28,
              "y": 1.68,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "677.07", "677.1"
            ],
            "position": {
              "z": 1.28,
              "y": 2.32,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "677.05", "677.07"
            ],
            "position": {
              "z": 1.28,
              "y": 2.96,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "677.02"
            ],
            "position": {
              "z": 1.28,
              "y": 3.6,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "004"
            ],
            "position": {
              "z": 1.28,
              "y": 0.4,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "004:624"
            ],
            "position": {
              "z": 1.28,
              "y": 1.04,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "004:007"
            ],
            "position": {
              "z": 1.28,
              "y": 1.68,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "678", "004:007"
            ],
            "position": {
              "z": 1.28,
              "y": 2.32,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "678"
            ],
            "position": {
              "z": 1.28,
              "y": 2.96,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "678"
            ],
            "position": {
              "z": 1.28,
              "y": 3.6,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.3"
            ],
            "position": {
              "z": 1.28,
              "y": 0.4,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.2", "004.3"
            ],
            "position": {
              "z": 1.28,
              "y": 1.04,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.2"
            ],
            "position": {
              "z": 1.28,
              "y": 1.68,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.05"
            ],
            "position": {
              "z": 1.28,
              "y": 2.32,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "004"
            ],
            "position": {
              "z": 1.28,
              "y": 2.96,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "004"
            ],
            "position": {
              "z": 1.28,
              "y": 3.6,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.41"
            ],
            "position": {
              "z": 1.28,
              "y": 0.4,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.4"
            ],
            "position": {
              "z": 1.28,
              "y": 1.04,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.4"
            ],
            "position": {
              "z": 1.28,
              "y": 1.68,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.3", "004.4"
            ],
            "position": {
              "z": 1.28,
              "y": 2.32,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.3"
            ],
            "position": {
              "z": 1.28,
              "y": 2.96,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.3"
            ],
            "position": {
              "z": 1.28,
              "y": 3.6,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.42"
            ],
            "position": {
              "z": 1.28,
              "y": 0.4,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.42"
            ],
            "position": {
              "z": 1.28,
              "y": 1.04,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.42"
            ],
            "position": {
              "z": 1.28,
              "y": 1.68,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.42"
            ],
            "position": {
              "z": 1.28,
              "y": 2.32,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.42"
            ],
            "position": {
              "z": 1.28,
              "y": 2.96,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.42"
            ],
            "position": {
              "z": 1.28,
              "y": 3.6,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.43"
            ],
            "position": {
              "z": 1.28,
              "y": 0.4,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.43"
            ],
            "position": {
              "z": 1.28,
              "y": 1.04,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.43"
            ],
            "position": {
              "z": 1.28,
              "y": 1.68,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.42", "004.43"
            ],
            "position": {
              "z": 1.28,
              "y": 2.32,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.42"
            ],
            "position": {
              "z": 1.28,
              "y": 2.96,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.42"
            ],
            "position": {
              "z": 1.28,
              "y": 3.6,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.45"
            ],
            "position": {
              "z": 1.28,
              "y": 0.4,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.45"
            ],
            "position": {
              "z": 1.28,
              "y": 1.04,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.45"
            ],
            "position": {
              "z": 1.28,
              "y": 1.68,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.45"
            ],
            "position": {
              "z": 1.28,
              "y": 2.32,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.45"
            ],
            "position": {
              "z": 1.28,
              "y": 2.96,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.43"
            ],
            "position": {
              "z": 1.28,
              "y": 3.6,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.7"
            ],
            "position": {
              "z": 1.28,
              "y": 0.4,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.6", "004.7"
            ],
            "position": {
              "z": 1.28,
              "y": 1.04,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.6"
            ],
            "position": {
              "z": 1.28,
              "y": 1.68,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.5"
            ],
            "position": {
              "z": 1.28,
              "y": 2.32,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.45", "004.5"
            ],
            "position": {
              "z": 1.28,
              "y": 2.96,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.45"
            ],
            "position": {
              "z": 1.28,
              "y": 3.6,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.8"
            ],
            "position": {
              "z": 1.28,
              "y": 0.4,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.8"
            ],
            "position": {
              "z": 1.28,
              "y": 1.04,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.738.5"
            ],
            "position": {
              "z": 1.28,
              "y": 1.68,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.738.5"
            ],
            "position": {
              "z": 1.28,
              "y": 2.32,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.7"
            ],
            "position": {
              "z": 1.28,
              "y": 2.96,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "004.7"
            ],
            "position": {
              "z": 1.28,
              "y": 3.6,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "8"
            ],
            "position": {
              "z": 3.67,
              "y": 0.4,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "8"
            ],
            "position": {
              "z": 3.67,
              "y": 1.04,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "8"
            ],
            "position": {
              "z": 3.67,
              "y": 1.68,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "8"
            ],
            "position": {
              "z": 3.67,
              "y": 2.32,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "77", "79"
            ],
            "position": {
              "z": 3.67,
              "y": 2.96,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "744"
            ],
            "position": {
              "z": 3.67,
              "y": 3.6,
              "x": -6
            },
            "rotation": 180
          },
          {
            "udks": [
              "74"
            ],
            "position": {
              "z": 3.67,
              "y": 0.4,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "72"
            ],
            "position": {
              "z": 3.67,
              "y": 1.04,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "72"
            ],
            "position": {
              "z": 3.67,
              "y": 1.68,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "72"
            ],
            "position": {
              "z": 3.67,
              "y": 2.32,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "72"
            ],
            "position": {
              "z": 3.67,
              "y": 2.96,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "72"
            ],
            "position": {
              "z": 3.67,
              "y": 3.6,
              "x": -4
            },
            "rotation": 180
          },
          {
            "udks": [
              "72"
            ],
            "position": {
              "z": 3.67,
              "y": 0.4,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "72"
            ],
            "position": {
              "z": 3.67,
              "y": 1.04,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "711", "72"
            ],
            "position": {
              "z": 3.67,
              "y": 1.68,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "711"
            ],
            "position": {
              "z": 3.67,
              "y": 2.32,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "711"
            ],
            "position": {
              "z": 3.67,
              "y": 2.96,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "711"
            ],
            "position": {
              "z": 3.67,
              "y": 3.6,
              "x": -2
            },
            "rotation": 180
          },
          {
            "udks": [
              "7"
            ],
            "position": {
              "z": 3.67,
              "y": 0.4,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "7"
            ],
            "position": {
              "z": 3.67,
              "y": 1.04,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "7"
            ],
            "position": {
              "z": 3.67,
              "y": 1.68,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "699.8"
            ],
            "position": {
              "z": 3.67,
              "y": 2.32,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "697"
            ],
            "position": {
              "z": 3.67,
              "y": 2.96,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "697"
            ],
            "position": {
              "z": 3.67,
              "y": 3.6,
              "x": 0
            },
            "rotation": 180
          },
          {
            "udks": [
              "696"
            ],
            "position": {
              "z": 3.67,
              "y": 0.4,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "694", "696"
            ],
            "position": {
              "z": 3.67,
              "y": 1.04,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "692", "693"
            ],
            "position": {
              "z": 3.67,
              "y": 1.68,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "691"
            ],
            "position": {
              "z": 3.67,
              "y": 2.32,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "691"
            ],
            "position": {
              "z": 3.67,
              "y": 2.96,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "691"
            ],
            "position": {
              "z": 3.67,
              "y": 3.6,
              "x": 2
            },
            "rotation": 180
          },
          {
            "udks": [
              "691"
            ],
            "position": {
              "z": 3.67,
              "y": 0.4,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "69", "691"
            ],
            "position": {
              "z": 3.67,
              "y": 1.04,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "69"
            ],
            "position": {
              "z": 3.67,
              "y": 1.68,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "69"
            ],
            "position": {
              "z": 3.67,
              "y": 2.32,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "69"
            ],
            "position": {
              "z": 3.67,
              "y": 2.96,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "69"
            ],
            "position": {
              "z": 3.67,
              "y": 3.6,
              "x": 4
            },
            "rotation": 180
          },
          {
            "udks": [
              "681.58"
            ],
            "position": {
              "z": 3.67,
              "y": 0.4,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "681.52", "681.58"
            ],
            "position": {
              "z": 3.67,
              "y": 1.04,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "681.51"
            ],
            "position": {
              "z": 3.67,
              "y": 1.68,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "681.51"
            ],
            "position": {
              "z": 3.67,
              "y": 2.32,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "681.51"
            ],
            "position": {
              "z": 3.67,
              "y": 2.96,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "681.5", "681.51"
            ],
            "position": {
              "z": 3.67,
              "y": 3.6,
              "x": 6
            },
            "rotation": 180
          },
          {
            "udks": [
              "681.5"
            ],
            "position": {
              "z": 3.67,
              "y": 0.4,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "681.5"
            ],
            "position": {
              "z": 3.67,
              "y": 1.04,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "681.5"
            ],
            "position": {
              "z": 3.67,
              "y": 1.68,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "681.5"
            ],
            "position": {
              "z": 3.67,
              "y": 2.32,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "681.5"
            ],
            "position": {
              "z": 3.67,
              "y": 2.96,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "681", "681.5"
            ],
            "position": {
              "z": 3.67,
              "y": 3.6,
              "x": 8
            },
            "rotation": 180
          },
          {
            "udks": [
              "007.52"
            ],
            "position": {
              "z": 3.67,
              "y": 0.4,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "007.52"
            ],
            "position": {
              "z": 3.67,
              "y": 1.04,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "006"
            ],
            "position": {
              "z": 3.67,
              "y": 1.68,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "004.93", "004.94"
            ],
            "position": {
              "z": 3.67,
              "y": 2.32,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "004.92"
            ],
            "position": {
              "z": 3.67,
              "y": 2.96,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "004.92"
            ],
            "position": {
              "z": 3.67,
              "y": 3.6,
              "x": 10
            },
            "rotation": 180
          },
          {
            "udks": [
              "004.92"
            ],
            "position": {
              "z": 3.67,
              "y": 0.4,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "004.92"
            ],
            "position": {
              "z": 3.67,
              "y": 1.04,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "004.92"
            ],
            "position": {
              "z": 3.67,
              "y": 1.68,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "004.9"
            ],
            "position": {
              "z": 3.67,
              "y": 2.32,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "004.89", "004.9"
            ],
            "position": {
              "z": 3.67,
              "y": 2.96,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "004.89"
            ],
            "position": {
              "z": 3.67,
              "y": 3.6,
              "x": 12
            },
            "rotation": 180
          },
          {
            "udks": [
              "480"
            ],
            "position": {
              "z": 4.17,
              "y": 0.4,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "481"
            ],
            "position": {
              "z": 4.17,
              "y": 1.04,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "482"
            ],
            "position": {
              "z": 4.17,
              "y": 1.68,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "483"
            ],
            "position": {
              "z": 4.17,
              "y": 2.32,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "484"
            ],
            "position": {
              "z": 4.17,
              "y": 2.96,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "485"
            ],
            "position": {
              "z": 4.17,
              "y": 3.6,
              "x": -6
            },
            "rotation": 0
          },
          {
            "udks": [
              "486"
            ],
            "position": {
              "z": 4.17,
              "y": 0.4,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "487"
            ],
            "position": {
              "z": 4.17,
              "y": 1.04,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "488"
            ],
            "position": {
              "z": 4.17,
              "y": 1.68,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "489"
            ],
            "position": {
              "z": 4.17,
              "y": 2.32,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "490"
            ],
            "position": {
              "z": 4.17,
              "y": 2.96,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "491"
            ],
            "position": {
              "z": 4.17,
              "y": 3.6,
              "x": -4
            },
            "rotation": 0
          },
          {
            "udks": [
              "492"
            ],
            "position": {
              "z": 4.17,
              "y": 0.4,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "493"
            ],
            "position": {
              "z": 4.17,
              "y": 1.04,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "494"
            ],
            "position": {
              "z": 4.17,
              "y": 1.68,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "495"
            ],
            "position": {
              "z": 4.17,
              "y": 2.32,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "496"
            ],
            "position": {
              "z": 4.17,
              "y": 2.96,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "497"
            ],
            "position": {
              "z": 4.17,
              "y": 3.6,
              "x": -2
            },
            "rotation": 0
          },
          {
            "udks": [
              "498"
            ],
            "position": {
              "z": 4.17,
              "y": 0.4,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "499"
            ],
            "position": {
              "z": 4.17,
              "y": 1.04,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "500"
            ],
            "position": {
              "z": 4.17,
              "y": 1.68,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "501"
            ],
            "position": {
              "z": 4.17,
              "y": 2.32,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "502"
            ],
            "position": {
              "z": 4.17,
              "y": 2.96,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "503"
            ],
            "position": {
              "z": 4.17,
              "y": 3.6,
              "x": 0
            },
            "rotation": 0
          },
          {
            "udks": [
              "504"
            ],
            "position": {
              "z": 4.17,
              "y": 0.4,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "505"
            ],
            "position": {
              "z": 4.17,
              "y": 1.04,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "506"
            ],
            "position": {
              "z": 4.17,
              "y": 1.68,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "507"
            ],
            "position": {
              "z": 4.17,
              "y": 2.32,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "508"
            ],
            "position": {
              "z": 4.17,
              "y": 2.96,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "509"
            ],
            "position": {
              "z": 4.17,
              "y": 3.6,
              "x": 2
            },
            "rotation": 0
          },
          {
            "udks": [
              "510"
            ],
            "position": {
              "z": 4.17,
              "y": 0.4,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "511"
            ],
            "position": {
              "z": 4.17,
              "y": 1.04,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "512"
            ],
            "position": {
              "z": 4.17,
              "y": 1.68,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "513"
            ],
            "position": {
              "z": 4.17,
              "y": 2.32,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "514"
            ],
            "position": {
              "z": 4.17,
              "y": 2.96,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "515"
            ],
            "position": {
              "z": 4.17,
              "y": 3.6,
              "x": 4
            },
            "rotation": 0
          },
          {
            "udks": [
              "516"
            ],
            "position": {
              "z": 4.17,
              "y": 0.4,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "517"
            ],
            "position": {
              "z": 4.17,
              "y": 1.04,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "518"
            ],
            "position": {
              "z": 4.17,
              "y": 1.68,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "519"
            ],
            "position": {
              "z": 4.17,
              "y": 2.32,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "520"
            ],
            "position": {
              "z": 4.17,
              "y": 2.96,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "521"
            ],
            "position": {
              "z": 4.17,
              "y": 3.6,
              "x": 6
            },
            "rotation": 0
          },
          {
            "udks": [
              "522"
            ],
            "position": {
              "z": 4.17,
              "y": 0.4,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "523"
            ],
            "position": {
              "z": 4.17,
              "y": 1.04,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "524"
            ],
            "position": {
              "z": 4.17,
              "y": 1.68,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "525"
            ],
            "position": {
              "z": 4.17,
              "y": 2.32,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "526"
            ],
            "position": {
              "z": 4.17,
              "y": 2.96,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "527"
            ],
            "position": {
              "z": 4.17,
              "y": 3.6,
              "x": 8
            },
            "rotation": 0
          },
          {
            "udks": [
              "528"
            ],
            "position": {
              "z": 4.17,
              "y": 0.4,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "529"
            ],
            "position": {
              "z": 4.17,
              "y": 1.04,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "530"
            ],
            "position": {
              "z": 4.17,
              "y": 1.68,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "531"
            ],
            "position": {
              "z": 4.17,
              "y": 2.32,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "532"
            ],
            "position": {
              "z": 4.17,
              "y": 2.96,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "533"
            ],
            "position": {
              "z": 4.17,
              "y": 3.6,
              "x": 10
            },
            "rotation": 0
          },
          {
            "udks": [
              "534"
            ],
            "position": {
              "z": 4.17,
              "y": 0.4,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "535"
            ],
            "position": {
              "z": 4.17,
              "y": 1.04,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "536"
            ],
            "position": {
              "z": 4.17,
              "y": 1.68,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "537"
            ],
            "position": {
              "z": 4.17,
              "y": 2.32,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "538"
            ],
            "position": {
              "z": 4.17,
              "y": 2.96,
              "x": 12
            },
            "rotation": 0
          },
          {
            "udks": [
              "539"
            ],
            "position": {
              "z": 4.17,
              "y": 3.6,
              "x": 12
            },
            "rotation": 0
          }
        ]
      }
    ]
  })
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