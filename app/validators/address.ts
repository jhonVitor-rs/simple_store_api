import vine from '@vinejs/vine'

export const createAddressValidator = vine.compile(
  vine.object({
    publicPlace: vine.string().trim().escape().minLength(5).maxLength(255),
    number: vine.string().trim().minLength(2).maxLength(7),
    neighborhood: vine.string().trim().minLength(4).maxLength(50),
    city: vine.string().trim().minLength(4).maxLength(50),
    state: vine.string().trim().minLength(4).maxLength(50),
    complement: vine.string().trim().maxLength(255).optional(),
    zipCode: vine.string().trim().minLength(3).maxLength(15),
  })
)
