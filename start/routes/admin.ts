import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'AdminsController.home').as('home')

  Route.get('/utilisateurs', 'AdminsController.users')
    .as('users')
    .middleware('permission:admin_viewUser')

  Route.get('/utilisateurs/:id', 'AdminsController.userInfo')
    .as('userInfo')
    .middleware('permission:admin_viewUser')
    .where('id', /^\d+$/)

  Route.get('/utilisateurs/supprimer', 'AdminsController.deleteUser')
    .as('delete_user')
    .middleware('permission:admin_deleteUser')
})
  .as('admin')
  .prefix('admin')
  .middleware('permission:admin_accessPanel')
