import vine from '@vinejs/vine'

export const createSaleValidator = vine.compile(
  vine.object({
    amount: vine.number().min(0).withoutDecimals(),
    unitPrice: vine.number().positive().max(99999.99).decimal(2),
    customerId: vine.number().withoutDecimals(),
    productId: vine.number().withoutDecimals(),
  })
)
