### GardensApiNodeJs-React

# About the Project.

This is a project that makes queries to the database working as an API that returns information from the database.

# User interface with ReactJs.

On the client side, it was done with ReactJs for the correct implementation of the user interface, where several React components were created for Registration, User Login and a Home to be the main part and display the queries, each query had its own proper component so that when the user at home selects a specific query, the correct information will be loaded, but also its harmony with the interface. Axios was used because Axios allows the configuration of request and response interceptors. This is useful for adding authorization tokens to all outgoing requests or for centrally handling errors.

# Server with ExpressJs.

On the server side, Express was used to create endpoints and queries to the relational SQL database. Express.js is a web framework for Node.js that simplifies the development of web applications by providing a simple and flexible API for handle routes, HTTP requests and middleware configuration, allows flexibility for handling requests.
Cors was configured so that other specific routes could access the request, also so that the server allowed tokens to be saved as cookies.
Finally, JWT was implemented for the creation of users and correct logging, where through roles the user can or cannot access certain queries where a certain degree of authority is requested from the user's role.
