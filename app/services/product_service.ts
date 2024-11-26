/* eslint-disable @typescript-eslint/naming-convention */
import Product from '#models/product'

interface IProduct {
  name: string
  description?: string
  imageUrl?: string
  sku: string
  price: number
  amount: number
}

export class ProductService {
  async getAll() {
    return await Product.query().where('isDeleted', false).orderBy('name', 'asc')
  }

  async getProduct(id: number) {
    const product = await Product.query()
      .where('id', id)
      .preload('sales', (sales) => sales.preload('customer').orderBy('createdAt', 'desc'))
      .firstOrFail()

    return product
  }

  async create(data: IProduct) {
    const product = await Product.create(data)

    if (product.$isPersisted) return product
    else throw new Error('Internal server error')
  }

  async update(id: number, data: DeepPartial<IProduct>) {
    const product = await Product.findOrFail(id)
    product.merge(data)
    await product.save()

    return product
  }

  async delete(id: number) {
    const product = await Product.findOrFail(id)
    product.merge({ ...product, isDeleted: true })
    await product.save()
  }
}
