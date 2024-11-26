/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const UserController = () => import('#controllers/user_controller')
const CustomersController = () => import('#controllers/customers_controller')
const ProductsController = () => import('#controllers/products_controller')
const SaleController = () => import('#controllers/sale_controller')

router.post('signup', [UserController, 'signup'])
router.post('signin', [UserController, 'signin'])

router
  .group(() => {
    router.resource('customers', CustomersController).apiOnly()
    router.resource('products', ProductsController).apiOnly()
    router.post('sale', [SaleController, 'store'])
  })
  .use(middleware.auth())
