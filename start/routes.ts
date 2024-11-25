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

router.get('/customer', [CustomersController, 'index'])
router.post('/customer', [CustomersController, 'store'])
router.delete('/customer/:id', [CustomersController, 'destroy'])
