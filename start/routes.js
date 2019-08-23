'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

// ----------------------------------->  Company  <------------------------------------------- //

//Get

Route.get('/approvedCompanies', 'CompanyController.listApprovedCompanies')
Route.get('/waitingCompanies', 'CompanyController.listWaitingCompanies')
Route.get('/rejectedCompanies', 'CompanyController.listRejectedCompanies')
Route.get('/companies', 'CompanyController.listAll')
Route.get('/companyDetails/:id', 'CompanyController.companyDetails')

//Post

Route.post('/companyRegistration','CompanyController.store')
Route.post('/approveCompany','CompanyController.approveCompany')
Route.post('/editCompany','CompanyController.edit')
Route.post('/deleteCompany', 'CompanyController.delete')
Route.post('/rejectCompany', 'CompanyController.reject')

// ------------------------------------->   User  <----------------------------------------------- //

//Get

Route.get('/users', 'UserController.listAll')

//Post

Route.post('/logIn','UserController.login')

// ------------------------------------>  Driver  <----------------------------------------------- //

//Get

Route.get('/driverDetails/:id', 'DriverController.driverDetails')
Route.get('/listDrivers', 'DriverController.listAll')
Route.get('/listDrivers/:id', 'DriverController.listCompanyDrivers')

//Post

Route.post('/driverRegistration','DriverController.store')

// ------------------------------------>  Routes  <------------------------------------------------- //

//Get

Route.get('/routeDetails/:id', 'RouteController.routeDetails')
Route.get('/listRoutes', 'RouteController.listAll')
Route.get('/listRoutes/:id', 'RouteController.listCompanyRoutes')

//Post

Route.post('/routeRegistration','RouteController.store')