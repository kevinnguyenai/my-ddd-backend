/**
 * this file will hold all the get use-case for user domain
 */
const Token = require('src/domain/token')

/**
  * function for getter user.
  */
module.exports = ({ usersRepository, webToken }) => {
  // code for getting all the items
  const validate = ({ body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = Token(body)
        const userCredentials = await usersRepository.getById({
          attributes: [
            'id', 'user_id', 'name', 'first_name', 'last_name', 'email', 'password'
          ],
          where: {
            email: credentials.email
          }
        })

        const validatePass = usersRepository.validatePassword(userCredentials.password)

        if (!validatePass(credentials.password)) {
          throw new Error('Invalid Credentials')
        }
        const signIn = webToken.signin()

        resolve({
          token: signIn({
            id: userCredentials.id,
            user_id: userCredentials.user_id,
            name: userCredentials.name,
            first_name: userCredentials.first_name,
            last_name: userCredentials.last_name,
            email: userCredentials.email
          })
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    validate
  }
}
