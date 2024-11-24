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
  })
)
