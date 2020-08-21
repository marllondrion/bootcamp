const express = require('express');
const server = express();
server.use(express.json());

const projects = require('./data/project.json');
var numberRequest = 0;
/**
 * Global middleware
 */
server.use((req, res, next) => {

    console.log(`${new Date().toISOString()} - method: ${req.method} - url: ${req.url} - total of request: ${numberRequest}`);
    next();
    numberRequest++;

})

/**
 * POST / projects: 
 * The route must receive id and title within 
 * the body and register a new project within an 
 * array in the following 
 * format: {id: "1", title: "New project", tasks: []}; 
 * Be sure to send both the project ID and the title 
 * in string format with double quotes.
 */
server.post('/project', validationOfInformation, (req, res) => {
    projects.push(req.project);
    return res.json(projects);
});

/**
 * GET: projects: 
 * Route that lists all projects and their tasks
 */
server.get('/project', (req, res) => {
    return res.json(projects);
});

/**
 * PUT /projects/:id:
 * The route should only change the title of the project
 * with the id present in the route parameters;
 */
server.put('/project/:id', idExists, (req, res) => {

    // const project = getProjectById(req.params.id);
    req.project.title = req.body.title;
    updateProjectById(req.project);
    return res.json(req.project);

});

/**
 * DELETE /project/:id : 
 * The route must delete the project with the id 
 * present in the route parameters;
 */
server.delete('/project/:id', idExists, (req, res) => {
    const { id } = req.params;
    deleteById(id);
    req.project = undefined;
    return res.send();

});

/**
 * POST /projects/:id/task
 * The route must receive a title field and store a 
 * new task in the task array for a specific project 
 * using the id present in the route parameters;
 */
server.post('/project/:id/task', idExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const project = getProjectById(id);
    project.tasks.push(title);
    updateProjectById(project)

    return res.json(project);
});

/**
 * Delete in my fake DB
 * @param {String} id 
 */
function deleteById(id) {
    const projectIndex = projects.findIndex(p => p.id == id);
    projects.splice(projectIndex, 1);
}
/**
 * 
 * @param {string} id 
 */
function getProjectById(id) {
    return projects.find(element => element.id == id);
}

/**
 * Update in the list my fake DB
 * @param {*} project 
 */
function updateProjectById(project) {
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].Id === project.id) {
            projects[i].title = project.title;
            projects[i].tasks.push(project.tasks);
            return;
        }
    }
    return;
}

/**
 * Validation form
 * format: {id: "1", title: 'New project', tasks: []}; 
 */
function projectIsFilled(project) {
    return project.id !== "" && project.title !== "";
}

function idExists(req, res, next) {
    const id = req.params.id || req.body.id;
    const project = getProjectById(id);

    if (project === undefined) {
        return res.status(400).json({ error: 'The id was not found!' });
    }
    req.project = project;

    return next();
};

/**
 * Validation form
 * format: {id: "1", title: 'New project', tasks: []}; 
 */
function validationOfInformation(req, res, next) {
    const project = getProjectByReq(req);

    if (!projectIsFilled(project)) {
        return res.status(400).json({ error: 'The id and title of that project should be filled up!' });
    }
    req.project = project;

    return next();
};

function getProjectByReq(req) {
    const { id, title } = req.body;
    const project = {
        id,
        title,
        tasks: []
    };
    return project;
}


server.listen(3000);