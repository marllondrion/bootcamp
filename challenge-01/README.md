The Challenge 1

Create an application to store projects and their tasks from scratch using Express.

Routes
* POST '/project'= The route must receive id and title within the body and register a new project within an array in the following format: {id: "1", title: 'New project', tasks: []}; 

* GET '/project' = Route that lists all projects and their tasks;

* PUT '/project/:id' = The route must change only the title of the project with the id present in the route parameters;

* DELETE '/project/:id' = The route must delete the project with the id present in the route parameters;

* POST '/project/:id/task' = The route must receive a title field and store a new task in the task array of a specific project chosen through the id present in the route parameters;

* Create middleware that will be used on all routes that receive the project ID in the URL parameters that verify that the project with that ID exists. If it does not exist, return an error, otherwise allow the request to continue normally.