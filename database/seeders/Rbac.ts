import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'

export default class RbacSeeder extends BaseSeeder {
  public async run() {
    const superadmin = await Role.create({
      name: 'Super Administrateur',
      slug: 'superadmin',
      active: true,
      description: "Rôle de super administateur de l'application",
      level: 0,
      editable: false,
    })

    const admin = await Role.create({
      name: 'Administrateur',
      slug: 'admin',
      active: true,
      description: "Rôle d'administateur de l'application",
      level: 1,
      editable: false,
    })

    const seller = await Role.create({
      name: 'Vendeur',
      slug: 'seller',
      active: true,
      description: 'Role autorisant un utilisateur à vendre',
      level: 10,
      editable: false,
    })
    await superadmin.save()
    await admin.save()
    await seller.save()

    const adminPerms = await Permission.createMany([
      {
        slug: 'admin:accessPanel',
        active: true,
      },
      {
        slug: 'admin:addUser',
        active: true,
      },
      {
        slug: 'admin:viewUser',
        active: true,
      },
      {
        slug: 'admin:updateUser',
        active: true,
      },
      {
        slug: 'admin:deleteUser',
        active: true,
      },
      {
        slug: 'admin:addRole',
        active: true,
      },
      {
        slug: 'admin:viewRole',
        active: true,
      },
      {
        slug: 'admin:updateRole',
        active: true,
      },
      {
        slug: 'admin:deleteRole',
        active: true,
      },
    ])

    await superadmin.related('permissions').saveMany(adminPerms)
    await admin.related('permissions').saveMany(adminPerms)
  }
}
