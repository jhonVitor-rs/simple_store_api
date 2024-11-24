import vine from '@vinejs/vine'

export const createSaleValidator = vine.compile(
  vine.object({
    amount: vine.number().min(0).withoutDecimals(),
    unitPrice: vine.number().positive().max(99999.99).decimal(2),
    customerId: vine.string().trim().uuid(),
    productId: vine.string().trim().uuid(),
  })
)
