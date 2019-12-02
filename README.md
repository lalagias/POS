
# Restaurant-PoS <hr>

Restaurant PoS is a simple React application for managing restaurant seating. It's features include handling orders for multiple guests and receipt printing. Restaurant PoS is lightweight making it easy to run on very low memory systems.

## Technologies:

* React
* Node
* create-react-app
* Express
* MongoDB
* Mongoose
* Linux Server Deployed
* NGINX Reverse Proxy
* REST Api
* React Alerts

### Installation Instructions:

1) Clone Repository to your local drive
2) From your favorite terminal enter `$ cd Restaurant-PoS`
3) Run `$ npm install` to install packages
4) `$ cd client`
5) Run `$ npm install` to install React packages
6) `$ cd ..` into the main app folder
7) In the app folder run `$ npm start` to run the app. Happy Hacking!


## API Routes

  * / Renders the main page. *Does NOT return JSON*

### /checks
#### GET Routes
 * /check  returns JSON of all 'checks' entries
 * /check/paid returns JSON of all paid checks
 * /check/unpaid returns JSON of all unpaid checks
 * /check/:id returns single check by ID
#### POST Routes
 * /check/seat creates a new 'check' or a new gues seating, returns json with ID data
#### PUT Routes
 * /check/:id Updates check by ID
#### DELETE Routes
 * /check/delete/:id

### /menu
#### GET Routes
 * /menu returns JSON of all menu entries
 * /menu/:section returns JSON of all menu entries by section / category
#### POST Routes
 * /menu/add Creates a new menu entry, returns JSON with ID
#### DELETE Routes
 * /menu/:id Deletes a menu entry by ID

### /order
#### GET Routes
 * /order returns JSON of all order entries
 * /order/paid returns JSON of all paid checks
 * /order/unpaid returns JSON of all unpaid checks
 * /order/:id returns single check by ID / category
#### PUT Routes
 * /order/:id Updates check by ID

### /servers
#### GET Routes
 * /servers returns JSON of all waitstaff entries
 * /servers/login/:code Validates the user access code
#### POST Routes
 * /servers/add Creates a new waitstaff/server entry, returns JSON with ID 
 
### /shifts
#### GET Routes
 * /shift returns JSON of shift entries
#### POST Routes
 * /shift/start request to start the shift
#### PUT Routes
 * /updateShift/:id Updates shift data
 * /finishShift/:id Updates shift data and finish shift
 