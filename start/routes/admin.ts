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
    .as('deleteUser')
    .middleware('permission:admin_deleteUser')

  Route.post('/utilisateurs/:id/nouveau-role', 'AdminsController.addRole')
    .as('addRole')
    .middleware('permission:admin_updateUser')
    .where('id', /^\d+$/)

  Route.get('/utilisateurs/:id/supprimer-role/:role', 'AdminsController.deleteRole')
    .as('deleteRole')
    .middleware('permission:admin_updateUser')

  Route.get('/utilisateurs/:id/bannir', 'AdminsController.banUser')
    .as('banUser')
    .middleware('permission:admin_updateUser')

  Route.get('/utilisateurs/:id/debannir', 'AdminsController.unbanUser')
    .as('unbanUser')
    .middleware('permission:admin_updateUser')
})
  .as('admin')
  .prefix('admin')
  .middleware('permission:admin_accessPanel')
