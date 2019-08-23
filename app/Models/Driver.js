'use strict'

const Model = use('Model')

class Driver extends Model {

    Company() {
		return this.belongsTo('App/Models/Company')
	}

}

module.exports = Driver
