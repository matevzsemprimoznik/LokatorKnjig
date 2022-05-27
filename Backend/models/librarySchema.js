import mongoose from 'mongoose';
const { Schema } = mongoose;

const librarySchema = new Schema({
  section: String,
  abbreviation:   String,
  desc: String,
  file: Object
}, {timestamp: true});

const Library = mongoose.model('Library', librarySchema);

export default Library;