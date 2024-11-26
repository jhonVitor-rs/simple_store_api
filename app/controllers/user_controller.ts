import { UserService } from '#services/user_service'
import { createUserValidator, signinUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { errors as vineErrors } from '@vinejs/vine'
import { errors as authErrors } from '@adonisjs/auth'

@inject()
export default class UserController {
  constructor(private userService: UserService) {}

  async signup({ request, response, auth }: HttpContext) {
    try {
      const user = await request.validateUsing(createUserValidator)
      const newUser = await this.userService.create(user)
      const token = await auth.use('jwt').generate(newUser)

      response.ok(token)
    } catch (error) {
      console.log(error)
      if (error instanceof vineErrors.E_VALIDATION_ERROR)
        response.unprocessableEntity({ errors: error.messages })
      else response.internalServerError({ error: 'Something went wrong.' })
    }
  }

  async signin({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(signinUserValidator)
      const user = await this.userService.verifyUser(email, password)
      const token = await auth.use('jwt').generate(user)

      response.ok(token)
    } catch (error) {
      console.log(error)
      if (error instanceof vineErrors.E_VALIDATION_ERROR)
        response.unprocessableEntity({ errors: error.messages })
      else if (error instanceof authErrors.E_INVALID_CREDENTIALS)
        response.unauthorized({ error: error.message })
      else response.internalServerError({ error: 'Something went wrong.' })
    }
  }
}
