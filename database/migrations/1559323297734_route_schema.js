'use strict'

const Schema = use('Schema')

class RouteSchema extends Schema {
  up () {
    this.create('routes', (table) => {
      table.increments()
      table.timestamps()
      table.string('route_name')
      table.string('identifier').unique()
      table.string('polylines_file')
      table.integer('danger_level')
      table.string('origin')
      table.string('destination')
      table.integer('distance')
      table.integer('speed')
      table.string('company_identifier')
    })
  }

  down () {
    this.dropIfExists('routes')
  }
}

module.exports = RouteSchema
