const Hapi = require('@hapi/hapi');
const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const notes = require('./notes');

// func to create new note
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

    notes.push(newNote);

    const isSuccess = notes.find((note) => {
        return note.id === id;
    });

    if (isSuccess !== undefined) {
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
            message: 'failed adding note',
        });
        response.code(500);
        return response;

    }
}

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
});

const getNotesHandler = (req, h) => {
    const { id } = req.params;
    let isFind = noteChecker(id);

    if (isFind !== undefined) {
        return {
          status: 'success',
          data: {
            note: isFind,
          },
        };
      } else {
        const response = h.response({
            status: 'fail'
        })
        response.code(500);
        return response;
    }
}

const editNoteHandler = (req, h) => {
    const { id } = req.params;
    const { title, tags, body } = req.payload;
    const updatedAt = new Date().toISOString();
    
    let isFind = noteChecker(id)

    if (isFind !== undefined) {
        // edit obj properties
        isFind.title = title;
        isFind.tags = tags;
        isFind.body = body;
        isFind.updatedAt = updatedAt;

        const response = h.response({
            status: "success",
            message: "successfully edited"
        })
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: "fail",
            message: "fail to edit note, please try again"
        })
        response.code(404);
        return response;
    }
}

const deleteNoteHandler = (req, h) => {
    const { id } = req.params;
    let deleteIdx = notes.findIndex(note => {
        return note.id === id;
    });

    if (deleteIdx !== -1) {
        notes.splice(deleteIdx);

        const response = h.response({
            status: "success",
            message: "note successfully deleted"
        });
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: "fail",
            message: "failed to delete note, please try again"
        });
        response.code(404);
        return response;
    }
}

const noteChecker = (id) => {
    return notes.find((note) => {
        return note.id === id;
    });
}

module.exports = {
    addNoteHandler, 
    getAllNotesHandler, 
    getNotesHandler, 
    editNoteHandler, 
    deleteNoteHandler
};