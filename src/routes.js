const {addNoteHandler} = require('./handler');
let routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return 'welcome';
        }
    }
];

module.exports = routes;