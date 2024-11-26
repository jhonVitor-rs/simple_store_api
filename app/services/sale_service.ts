/* eslint-disable @typescript-eslint/naming-convention */

import Customer from '#models/customer'
import Product from '#models/product'
import Sale from '#models/sale'
import db from '@adonisjs/lucid/services/db'

interface ISale {
  amount: number
  customerId: number
  productId: number
}

export class SaleService {
  async create(data: ISale) {
    const trx = await db.transaction()

    try {
      const product = await Product.query({ client: trx })
        .where('id', data.productId)
        .forUpdate()
        .firstOrFail()

      await Customer.findOrFail(data.customerId, { client: trx })

      if (product.amount < data.amount) throw new Error('Insufficient quantity of product')

      product.amount -= data.amount
      await product.save()

      const totalPrice = data.amount * product.price
      const sale = await Sale.create(
        {
          amount: data.amount,
          customerId: data.customerId,
          productId: data.productId,
          unitPrice: product.price,
          totalPrice,
        },
        { client: trx }
      )
      await trx.commit()

      await sale.load('customer')
      await sale.load('product')

      return sale
    } catch (error) {
      trx.rollback()
      throw error
    }
  }
}
