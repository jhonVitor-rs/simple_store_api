import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().escape().minLength(4).maxLength(255),
    email: vine
      .string()
      .trim()
      .minLength(6)
      .maxLength(255)
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().trim().minLength(8).maxLength(50),
  })
)
