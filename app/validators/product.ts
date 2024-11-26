import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(100),
    description: vine.string().maxLength(255).optional(),
    imageUrl: vine.string().maxLength(255).optional(),
    sku: vine
      .string()
      .minLength(4)
      .maxLength(50)
      .unique(async (db, value) => {
        const product = await db.from('products').where('sku', value).first()
        return !product
      }),
    price: vine.number().positive().max(99999.99).decimal([0, 2]),
    amount: vine.number().min(0).withoutDecimals(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(100).optional(),
    description: vine.string().maxLength(255).optional(),
    imageUrl: vine.string().maxLength(255).optional(),
    sku: vine
      .string()
      .maxLength(50)
      .unique(async (db, value, meta) => {
        const product = await db
          .from('products')
          .where('sku', value)
          .whereNot('id', meta.data.params.id)
          .first()
        return !product
      })
      .optional(),
    price: vine.number().positive().max(99999.99).decimal([0, 2]).optional(),
    amount: vine.number().min(0).withoutDecimals().optional(),
  })
)
