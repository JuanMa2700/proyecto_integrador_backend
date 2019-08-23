'use strict'

const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.timestamps()
      table.string('social_reason').notNullable()
      table.string('email')
      table.string('nit').unique()
      table.integer('state')

      /* About state

        0 = waiting
        1 = approved
        2 = rejected

      */

     
    })
  }

  down () {
    this.dropIfExists('companies')
  }
}

module.exports = CompanySchema
