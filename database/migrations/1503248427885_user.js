'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('user_name', 80).notNullable().unique()
      table.string('identifier', 254).notNullable().unique()
      table.integer('rol').notNullable()

      /*
      
      About roles (Integer):
      1 = Platform administrator
      2 = Company administrator
      3 = Driver

      */

      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('users')
  }
}

module.exports = UserSchema
