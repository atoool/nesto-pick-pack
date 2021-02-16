const mockEmailLogin = async (email, password) => {
  try {
    const access_token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const currentTimeObject = new Date();
    const access_token_timestamp = currentTimeObject.toISOString();
    console.log(email);
    switch (email) {
      case 'basilarackal@riafy.me':
        console.log('user Picker');
        return { userType: 'Picker', access_token, access_token_timestamp };
      case 'athulmohan@riafy.me':
        console.log('user Packer');
        return { userType: 'Packer', access_token, access_token_timestamp };
      default:
        console.log('user None');
        return { userType: '', access_token: '', access_token_timestamp: '' };
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export { mockEmailLogin };
