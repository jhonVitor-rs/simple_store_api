/* eslint-disable @typescript-eslint/naming-convention */
import Customer from '#models/customer'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

interface IPhone {
  number: string
  description?: string
}

interface IAddress {
  publicPlace: string
  number: string
  neighborhood: string
  city: string
  state: string
  complement?: string
  zipCode: string
}

interface ICustomer {
  fullName: string
  cpf: string
  phones: IPhone[]
  address: IAddress
}

export class CustomerService {
  async getAll() {
    try {
      const customers = await Customer.query()
        .orderBy('id', 'asc')
        .preload('address')
        .preload('phones')

      return customers || []
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error.')
    }
  }

  async getCustomer(id: string, date?: string) {
    try {
      const customer = await Customer.query()
        .where('id', id)
        .preload('address')
        .preload('phones')
        .preload('sales', (sales) => {
          if (date) {
            const dateObj = DateTime.fromISO(date)
            const startOfMonth = dateObj.startOf('month').toSQL()
            const endOfMonth = dateObj.endOf('month').toSQL()

            if (startOfMonth && endOfMonth)
              sales.whereBetween('createdAt', [startOfMonth, endOfMonth])
          }

          sales.preload('product').orderBy('createdAt', 'desc')
        })

      return customer[0] || null
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error.')
    }
  }

  async create(data: ICustomer) {
    const trx = await db.transaction()

    try {
      const customer = await Customer.create(
        {
          fullName: data.fullName,
          cpf: data.cpf,
        },
        { client: trx }
      )

      if (data.address) {
        await customer.related('address').create(data.address, { client: trx })
      }
      if (data.phones && data.phones.length > 0) {
        await customer.related('phones').createMany(data.phones, { client: trx })
      }

      await trx.commit()

      await customer.load('address')
      await customer.load('phones')

      return customer
    } catch (error) {
      if (trx.isCompleted === false) {
        await trx.rollback()
      }
      console.error(error)
      throw new Error('Internal server error.')
    }
  }

  async update(id: number, data: DeepPartial<ICustomer>) {
    const trx = await db.transaction()

    try {
      const customer = await Customer.findOrFail(id, { client: trx })
      customer.merge(data)
      await customer.save()

      if (data.address) {
        const address = await customer.related('address').query().first()

        if (address) {
          address.merge(data.address)
          address.save()
        } else {
          await customer.related('address').create(data.address, { client: trx })
        }
      }

      if (data.phones) {
        await customer.related('phones').query().delete()
        await customer.related('phones').createMany(data.phones, { client: trx })
      }

      await trx.commit()

      await customer.load('address')
      await customer.load('phones')

      return customer
    } catch (error) {
      await trx.rollback()
      console.error(error)
      throw new Error('Internal server error.')
    }
  }

  async delete(id: number) {
    try {
      const customer = await Customer.findOrFail(id)
      await customer.delete()
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error.')
    }
  }
}
