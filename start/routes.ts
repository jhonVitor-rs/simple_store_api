/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const CustomersController = () => import('#controllers/customers_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('customer', CustomersController).apiOnly()

// router.get('/customer', [CustomersController, 'index'])
// router.post('/customer', [CustomersController, 'store'])
// router.put('/customer/:id', [CustomersController, 'update'])
// router.patch('/customer/:id', [CustomersController, 'update'])
// router.delete('/customer/:id', [CustomersController, 'destroy'])
