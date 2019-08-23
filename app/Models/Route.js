'use strict'

const Model = use('Model')

class Route extends Model {

    Company() {
		return this.belongsTo('App/Models/Company')
	}

}

module.exports = Route
