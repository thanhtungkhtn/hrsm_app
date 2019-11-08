
const InvalidAccessException = use('App/Exceptions/InvalidAccessException');
const ResourceNotExistException = use('App/Exceptions/ResourceNotExistException');
const UserNoActivatedException = use('App/Exceptions/UserNoActivatedException');

class AuthorizationService {
  verifyPermission(resource, licensed, check_action) {

    // console.log(check_action)
    if (!resource) {
      throw new ResourceNotExistException();
    }

    if (licensed === 1){
      console.log('User activated');

      if(check_action !== 1){
        console.log('Invalid access');
        throw new InvalidAccessException();
      } else {
        console.log('Valid access');
      }
    } else {
      console.log('User no activated');
      throw new UserNoActivatedException(); // invalid access exeption
    }
  }
}

module.exports = new AuthorizationService();
