/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const CustomersController = () => import('#controllers/customers_controller')
const ProductsController = () => import('#controllers/products_controller')

router.resource('customers', CustomersController).apiOnly()
router.resource('products', ProductsController).apiOnly()

// router.get('/customer', [CustomersController, 'index'])
// router.post('/customer', [CustomersController, 'store'])
// router.put('/customer/:id', [CustomersController, 'update'])
// router.patch('/customer/:id', [CustomersController, 'update'])
// router.delete('/customer/:id', [CustomersController, 'destroy'])
