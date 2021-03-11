const createClient = async () => {
  const auth0 = await createAuth0Client({
    domain: 'kunigogo-dev-public.us.auth0.com',
    client_id: '0gs9YSsO4Bku00fzgke6jd7mi4AANhTj'
  });
  return auth0;
}

const loginWithPopup = async () => {
  await auth0.loginWithPopup();
  //logged in. you can get the user profile like this:
  const user = await auth0.getUser();
  return user;
}

const getAccessToken = async() => {
  const accessToken = await auth0.getTokenSilently();
  return accessToken;
}

const logout = async () => {
  auth0.logout();
}

const auth0 = createClient();
