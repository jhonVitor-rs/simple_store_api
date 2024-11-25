import { CustomerService } from '#services/customer_service'
import { createCustomerValidator } from '#validators/customer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CustomersController {
  constructor(private customerService: CustomerService) {}

  async index({ response }: HttpContext) {
    try {
      const customers = await this.customerService.getAll()

      response.ok(customers)
    } catch (error) {
      response.badRequest(error.message)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const customer = await request.validateUsing(createCustomerValidator)
      const newCustomer = await this.customerService.create(customer)

      response.ok(newCustomer)
    } catch (error) {
      response.badRequest(error)
    }
  }

  async show({ params }: HttpContext) {}

  async update({ params, request }: HttpContext) {}

  async destroy({ params, response }: HttpContext) {
    try {
      const { id } = params
      await this.customerService.delete(id)

      response.ok('Customer deleted with success')
    } catch (error) {
      response.badRequest(error.message)
    }
  }
}
