'use strict'

const Schema = use('Schema')

class DriverSchema extends Schema {
  up () {
    this.create('drivers', (table) => {
      table.increments()
      table.timestamps()
      table.string('first_name')
      table.string('last_name')
      table.string('document').unique()
      table.string('birth_city')
      table.string('email')
      table.string('birthday')
      table.string('gender')
      table.integer('verification_status')
      table.string('company_identifier')
    })
  }

  down () {
    this.dropIfExists('drivers')
  }
}

module.exports = DriverSchema
