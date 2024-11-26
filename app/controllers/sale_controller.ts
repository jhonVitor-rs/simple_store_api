import { SaleService } from '#services/sale_service'
import { createSaleValidator } from '#validators/sale'
import { inject } from '@adonisjs/core'
import { errors as vineErrors } from '@vinejs/vine'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SaleController {
  constructor(private slaeService: SaleService) {}

  async store({ request, response }: HttpContext) {
    try {
      const sale = await request.validateUsing(createSaleValidator)
      const newSale = await this.slaeService.create(sale)

      response.ok(newSale)
    } catch (error) {
      if (error instanceof vineErrors.E_VALIDATION_ERROR)
        response.unprocessableEntity({ errors: error.messages })
      else response.internalServerError({ error: 'Something went wrong.' })
    }
  }
}
