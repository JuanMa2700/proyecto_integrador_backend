'use strict'

const Schema = use('Schema')

class ConstraintsSchema extends Schema {
  up () {
    this.alter('drivers', (table) => {
      
      table.foreign('company_identifier').references('companies.nit').onDelete('cascade')

    })

    this.alter('routes', (table) => {

      table.foreign('company_identifier').references('companies.nit').onDelete('cascade')

    })
    
  }

  down () {
    this.alter('drivers', (table) => {
      
      table.dropForeign('company_identifier')

    })
    this.alter('routes', (table) => {
      
      table.dropForeign('company_identifier')

    })
  }
}

module.exports = ConstraintsSchema
