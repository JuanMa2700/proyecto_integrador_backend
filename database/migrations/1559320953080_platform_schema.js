'use strict'

const Schema = use('Schema')

class Platform_UserSchema extends Schema {
  up () {
    this.create('platform_user', (table) => {
      table.increments()
      table.timestamps()
      table.string('user_name')
      table.string('identifier').unique()

    })
  }

  down () {
    this.dropIfExists('platform_user')
  }
}

module.exports = Platform_UserSchema
