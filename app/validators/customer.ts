import vine from '@vinejs/vine'

export const createCustomerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().maxLength(255).minLength(6),
    cpf: vine
      .string()
      .trim()
      .maxLength(15)
      .minLength(11)
      .unique(async (db, value) => {
        const valueReplace = value.replace(/\D/g, '')
        const customer = await db.from('customers').where('cpf', valueReplace).first()
        return !customer
      })
      .transform((value) => value.replace(/\D/g, '')),
    phones: vine.array(
      vine.object({
        number: vine
          .string()
          .trim()
          .minLength(11)
          .maxLength(15)
          .transform((value) => value.replace(/\D/g, '')),
        description: vine.string().trim().maxLength(50).optional(),
      })
    ),
    address: vine.object({
      publicPlace: vine.string().trim().escape().minLength(5).maxLength(255),
      number: vine.string().trim().minLength(2).maxLength(7),
      neighborhood: vine.string().trim().minLength(4).maxLength(50),
      city: vine.string().trim().minLength(4).maxLength(50),
      state: vine.string().trim().minLength(2).maxLength(50),
      complement: vine.string().trim().maxLength(255).optional(),
      zipCode: vine
        .string()
        .trim()
        .minLength(3)
        .maxLength(15)
        .transform((value) => value.replace(/\D/g, '')),
    }),
  })
)

export const updateCustomerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().maxLength(255).optional(),
    cpf: vine
      .string()
      .trim()
      .maxLength(15)
      .unique(async (db, value, meta) => {
        const valueReplace = value.replace(/\D/g, '')
        const customer = await db
          .from('customers')
          .where('cpf', valueReplace)
          .whereNot('id', meta.data.params.id)
          .first()
        return !customer
      })
      .transform((value) => value.replace(/\D/g, ''))
      .optional(),
    phones: vine
      .array(
        vine.object({
          number: vine
            .string()
            .trim()
            .minLength(11)
            .maxLength(15)
            .transform((value) => value.replace(/\D/g, '')),
          description: vine.string().trim().maxLength(50).optional(),
        })
      )
      .optional(),
    address: vine
      .object({
        publicPlace: vine.string().trim().escape().maxLength(255).optional(),
        number: vine.string().trim().maxLength(7).optional(),
        neighborhood: vine.string().trim().maxLength(50).optional(),
        city: vine.string().trim().maxLength(50).optional(),
        state: vine.string().trim().maxLength(50).optional(),
        complement: vine.string().trim().maxLength(255).optional(),
        zipCode: vine
          .string()
          .trim()
          .maxLength(15)
          .transform((value) => value.replace(/\D/g, ''))
          .optional(),
      })
      .optional(),
  })
)
