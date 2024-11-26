import { ProductService } from '#services/product_service'
import { createProductValidator, updateProductValidator } from '#validators/product'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { errors as vineErrors } from '@vinejs/vine'
import { errors as lucidErrors } from '@adonisjs/lucid'

@inject()
export default class ProductsController {
  constructor(private productService: ProductService) {}

  async index({ response }: HttpContext) {
    try {
      const products = await this.productService.getAll()

      response.ok(products)
    } catch (error) {
      response.internalServerError(error.messages)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const product = await request.validateUsing(createProductValidator)
      const newProduct = await this.productService.create(product)

      response.ok(newProduct)
    } catch (error) {
      if (error instanceof vineErrors.E_VALIDATION_ERROR)
        response.unprocessableEntity({ errors: error.messages })
      else response.internalServerError({ error: 'Something went wrong.' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const { id } = params
      const product = await this.productService.getProduct(id)

      return product
    } catch (error) {
      if (error instanceof lucidErrors.E_ROW_NOT_FOUND) {
        response.notFound({ error: error.message })
      } else {
        response.internalServerError({ error: 'Something went wrong' })
      }
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      const product = await request.validateUsing(updateProductValidator)
      const updateProduct = await this.productService.update(id, product)

      response.ok(updateProduct)
    } catch (error) {
      if (error instanceof vineErrors.E_VALIDATION_ERROR)
        response.unprocessableEntity({ errors: error.messages })
      else if (error instanceof lucidErrors.E_ROW_NOT_FOUND)
        response.notFound({ error: error.message })
      else response.badRequest({ error: 'Something went wrong.' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const { id } = params
      await this.productService.delete(id)

      response.ok('Product deleted with success')
    } catch (error) {
      if (error instanceof lucidErrors.E_ROW_NOT_FOUND) response.notFound({ error: error.message })
      else response.badRequest(error.message)
    }
  }
}
