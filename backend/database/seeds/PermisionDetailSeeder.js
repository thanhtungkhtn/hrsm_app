'use strict'

/*
|--------------------------------------------------------------------------
| PermisionDetailSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const PermisionDetail = use('App/Models/PermisionDetail')

class PermisionDetailSeeder {
  async run () {
    await PermisionDetail.createMany([
      {
        permision_id:  1,
        action_name:  "Create post",
        action_code:  "CREATE",
        check_action: 1
      },
      {
        permision_id:  1,
        action_name:  "Edit post",
        action_code:  "EDIT",
        check_action: 1
      },
      {
        permision_id:  1,
        action_name:  "Delete post",
        action_code:  "DELETE",
        check_action: 1
      },
      {
        permision_id:  1,
        action_name:  "View post",
        action_code:  "VIEW",
        check_action: 1
      },
      {
        permision_id:  2,
        action_name:  "Create post",
        action_code:  "CREATE",
        check_action: 1
      },
      {
        permision_id:  2,
        action_name:  "Edit post",
        action_code:  "EDIT",
        check_action: 1
      },
      {
        permision_id:  2,
        action_name:  "Delete post",
        action_code:  "DELETE",
        check_action: 0
      },
      {
        permision_id:  2,
        action_name:  "View post",
        action_code:  "VIEW",
        check_action: 1
      },
      {
        permision_id:  3,
        action_name:  "Create post",
        action_code:  "CREATE",
        check_action: 0
      },
      {
        permision_id:  3,
        action_name:  "Edit post",
        action_code:  "EDIT",
        check_action: 1
      },
      {
        permision_id:  3,
        action_name:  "Delete post",
        action_code:  "DELETE",
        check_action: 0
      },
      {
        permision_id:  3,
        action_name:  "View post",
        action_code:  "VIEW",
        check_action: 1
      },
      {
        permision_id:  4,
        action_name:  "Create post",
        action_code:  "CREATE",
        check_action: 1
      },
      {
        permision_id:  4,
        action_name:  "Edit post",
        action_code:  "EDIT",
        check_action: 0
      },
      {
        permision_id:  4,
        action_name:  "Delete post",
        action_code:  "DELETE",
        check_action: 0
      },
      {
        permision_id:  4,
        action_name:  "View post",
        action_code:  "VIEW",
        check_action: 1
      },
      {
        permision_id:  5,
        action_name:  "Create post",
        action_code:  "CREATE",
        check_action: 0
      },
      {
        permision_id:  5,
        action_name:  "Edit post",
        action_code:  "EDIT",
        check_action: 0
      },
      {
        permision_id:  5,
        action_name:  "Delete post",
        action_code:  "DELETE",
        check_action: 0
      },
      {
        permision_id:  5,
        action_name:  "View post",
        action_code:  "VIEW",
        check_action: 1
      },
      {
        permision_id:  6,
        action_name:  "Create post",
        action_code:  "CREATE",
        check_action: 0
      },
      {
        permision_id:  6,
        action_name:  "Edit post",
        action_code:  "EDIT",
        check_action: 0
      },
      {
        permision_id:  6,
        action_name:  "Delete post",
        action_code:  "DELETE",
        check_action: 0
      },
      {
        permision_id:  6,
        action_name:  "View post",
        action_code:  "VIEW",
        check_action: 0
      }
    ])
  }
}

module.exports = PermisionDetailSeeder
