const Hapi = require('@hapi/hapi');
const { nanoid } = require('nanoid');
const Note = require('./notes');

const addNoteHandler = (req, h) => {
    const {title, tags, body} = req.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = {
        id,
        title,
        tags,
        body,
        createdAt,
        updatedAt
    };

    Note.push(newNote);

    const isSuccess = Note.find((note) => {
        note.id === id;
    })

    if (isSuccess!=undefined) {
        const response = h.response({
            status: 'success',
            message: 'Note successfully added',
            data: {
                noteId: id
            }
        });
        response.code(201);
        return response;

    } else {
        const response = h.response({
            status: 'fail',
            message: 'Note successfully added',
        });
        response.code(500);
        return response;

    }
}

module.exports = {addNoteHandler};