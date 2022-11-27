const {
    addNoteHandler, 
    getAllNotesHandler, 
    getNotesHandler, 
    editNoteHandler, 
    deleteNoteHandler
} = require('./handler');

let routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotesHandler
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteHandler
    }
];

module.exports = routes;