let auth0 = null;

const createClient = async () => {
  auth0 = await createAuth0Client({
    domain: 'kunigogo-dev-public.us.auth0.com',
    client_id: '0gs9YSsO4Bku00fzgke6jd7mi4AANhTj'
  });
}

const login = async () => {
  const options = {
    redirect_uri: window.location.origin
  };

  await auth0.loginWithRedirect(options);

  //logged in. you can get the user profile like this:
  const user = await auth0.getUser();
  return user;
}

const getAccessToken = async() => {
  const accessToken = await auth0.getTokenSilently();
  return accessToken;
}

const logout = async (auth0) => {
  auth0.logout();
}

// after DOM contents are loaded
window.addEventListener( "DOMContentLoaded", async function() {
  auth0 = createClient();

  // Login Click
  const loginClick = async ( event ) => {
    await loginWithPopup(auth0);
  };
  const btnLogin = document.getElementById( "login" ); 
  btnLogin.addEventListener( "click", login, false );

  // Logout Click
  const logoutClick = async ( event ) => {
    await loginWithPopup(auth0);
  };
  const btnLogout = document.getElementById( "logout" ); 
  btnLogout.addEventListener( "click", logout, false );
});
