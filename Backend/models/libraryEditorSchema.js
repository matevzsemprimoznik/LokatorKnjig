import mongoose from 'mongoose';
const { Schema } = mongoose;

const libraryEditorSchema = new Schema(
    {
        section: String,
        abbreviation: String,
        desc: String,
        file: Object
    },
    { timestamps: true }
);

const LibraryEditor = mongoose.model('LibraryEditor', libraryEditorSchema);

export default LibraryEditor;
