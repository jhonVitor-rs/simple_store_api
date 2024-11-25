import { CustomerService } from '#services/customer_service'
import { createCustomerValidator, updateCustomerValidator } from '#validators/customer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import { DateTime } from 'luxon'

@inject()
export default class CustomersController {
  constructor(private customerService: CustomerService) {}

  async index({ response }: HttpContext) {
    try {
      const customers = await this.customerService.getAll()

      response.ok(customers)
    } catch (error) {
      response.internalServerError(error.messages)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const customer = await request.validateUsing(createCustomerValidator)
      const newCustomer = await this.customerService.create(customer)

      response.ok(newCustomer)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR)
        response.unprocessableEntity({ errors: error.messages })
      response.internalServerError({ error: 'Something went wrong.' })
    }
  }

  async show({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      const { yearMonth } = request.qs()

      if (!DateTime.fromISO(yearMonth).isValid) {
        return response.badRequest({ error: 'Invalid yearMonth format. Use ISO 8601 format.' })
      }

      const customer = await this.customerService.getCustomer(id, yearMonth)
      response.ok(customer)
    } catch (error) {
      response.internalServerError({ error: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      const customer = await request.validateUsing(updateCustomerValidator)
      const updateCustomer = await this.customerService.update(+id, customer)

      response.ok(updateCustomer)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR)
        response.unprocessableEntity({ errors: error.messages })
      response.internalServerError({ error: 'Something went wrong.' })
    }
  }

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
