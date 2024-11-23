import vine from '@vinejs/vine'

export const createPhoneValudate = vine.compile(
  vine.object({
    number: vine
      .string()
      .trim()
      .minLength(11)
      .maxLength(11)
      .transform((value) => value.replace(/\D/g, '')),
    complement: vine.string().trim().maxLength(50).optional(),
  })
)
