import vine from '@vinejs/vine'

export const createSaleValidator = vine.compile(
  vine.object({
    amount: vine.number().min(0).withoutDecimals(),
    customerId: vine.number().withoutDecimals(),
    productId: vine.number().withoutDecimals(),
  })
)
