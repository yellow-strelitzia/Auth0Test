let auth0 = null;
let isAuthenticated  = null;

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
  //await auth0.loginWithPopup();
}

const getAccessToken = async() => {
  const accessToken = await auth0.getTokenSilently();
  return accessToken;
}

const logout = async () => {
  auth0.logout();
}

const apiCall = async () => {
  auth0.logout();
}

// after DOM contents are loaded
window.addEventListener( "DOMContentLoaded", async function() {
  await createClient();

  const query = window.location.search;
  const shouldParseResult = query.includes("code=") && query.includes("state=");

  if (shouldParseResult) {
    try {
      const result = await auth0.handleRedirectCallback();

      if (result.appState && result.appState.targetUrl) {
        showContentFromUrl(result.appState.targetUrl);
      }
    } catch (err) {
      console.log("Error parsing redirect:", err);
    }

    window.history.replaceState({}, document.title, "/");
  }

  isAuthenticated = await auth0.isAuthenticated();
  const user = await auth0.getUser();
  console.log(user);

  const authStatus = document.getElementById( "authStatus" ); 
  if ( isAuthenticated ) {
    authStatus.textContent = "Logged in.";
    window.history.replaceState({}, document.title, window.location.pathname);
  } else {
    authStatus.textContent = "Not Logged in."
  }

  // Event Listener : Login Click
  const loginClick = async ( event ) => {
    await login();
  };
  const btnLogin = document.getElementById( "login" ); 
  btnLogin.addEventListener( "click", loginClick, false );

  // Event Listener : Logout Click
  const logoutClick = async ( event ) => {
    await logout();
  };
  const btnLogout = document.getElementById( "logout" ); 
  btnLogout.addEventListener( "click", logoutClick, false );

  // Event Listener : API Call Click
  const apiCallClick = async ( event ) => {
    await apiCall();
  };
  const btnLogout = document.getElementById( "logout" ); 
  btnLogout.addEventListener( "click", apiCallClick, false );
});
