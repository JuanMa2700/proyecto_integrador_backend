'use strict'

const Model = use('Model')

class Company extends Model {

    
	Drivers(){
		return this.hasMany('App/Models/Driver')
    }
    
    
	Routes(){
		return this.hasMany('App/Models/Route')
    }
    
}

module.exports = Company
