import axios from 'axios';

export type RefreshTokenResponse = {
  expires_in: string;
  token_type: 'Bearer';
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
};

export default axios.create({
  url: 'https://securetoken.googleapis.com/v1/token?key=AIzaSyDBasCUXhdhZTn4zf9rVSs0bHbmiCeskHw',
});
