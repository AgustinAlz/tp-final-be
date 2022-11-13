const { Router } = require('express')

const router = new Router()

router.get('/', getAllRoles)
//router.get('/:id', getRoleById)
router.post('/', createRole)
//router.put('/:id', updateRole)
//router.delete('/:id', deleteRole)

 async function getAllRoles(req, res, next) {
    try {
        const roles = await req.model('Role').find({ isActive: true })
        res.send(roles)
    } catch (err) {
        next(err)
    }
}

async function createRole(req, res, next) {
    console.log('createRole: ', req.body)

    const role = req.body

    try {
        
        const roleCreated = await req.model('Role').create({...role})
        //const roleCreated = role
        res.send(`Role created :  ${roleCreated}`)
    } catch (err) {
        next(err)
    }
}

module.exports = router