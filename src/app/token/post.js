/**
 * this file will hold all the get use-case for user domain
 */
const Token = require('src/domain/token')
/**
  * function for getter user.
  */
module.exports = ({ usersRepository, config, webToken }) => {
  // code for getting all the items
  const validate = ({ body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        if(body.email!=config.AdministratorEmail) { throw new Error()}
        const credentials = Token(body)
        const userCredentials = await usersRepository.authentication(credentials.email, credentials.password)
        /*
        const userCredentials = await userRepository.authentication({
          attributes: [
            'id', 'firstName', 'lastName', 'middleName', 'email', 'password', 'roleId', 'isDeleted', 'createdBy'
          ],
          where: {
            email: credentials.email,
            isDeleted: 0
          }
        })
        */
        //console.log(credentials.password, userCredentials.password)
        const validatePass = await usersRepository.validatePassword(credentials.password, userCredentials.password)

        if (!validatePass) {
          throw new Error('Invalid Credentials')
        }
        const signIn = webToken.signin()
        
        resolve({
          token: signIn({
            id: userCredentials.id,
            firstName: userCredentials.firstName,
            lastName: userCredentials.lastName,
            middleName: userCredentials.middleName,
            email: userCredentials.email
          })
        })
      } catch (error) {
          const err = new Error(error)
          err.details = error

          reject(err)
      }
    })
  }

  return {
    validate
  }
}
