import express from 'express';
import { decrypt, encrypt } from '../services/encryption.service';
import { HttpOptions, postRequest } from '../services/http.service';

const spotifyRouter = express.Router();

// init spotify config
const spotifyEndpoint = 'https://accounts.spotify.com/api/token';

const generateHttpOptions = (data: any) => {
  const authString = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
  ).toString('base64');

  const httpOptions: HttpOptions = {
    data,
    headers: {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return httpOptions;
};

spotifyRouter.post('/swap', async (req, res) => {
  try {
    const spotifyClientCallback = process.env.SPOTIFY_CLIENT_CALLBACK;

    const data = {
      grant_type: 'authorization_code',
      redirect_uri: spotifyClientCallback,
      code: req.body.code,
    };
    const httpOptions = generateHttpOptions(data);
    const { response, result } = await postRequest(spotifyEndpoint, httpOptions);

    if (result.refresh_token) {
      result.refresh_token = encrypt(result.refresh_token);
    }

    res.status(response.statusCode || 500).json(result);
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.statusCode);
    } else {
      res.status(500);
    }
    if (error.data) {
      res.send(error.data);
    } else {
      res.send('');
    }
  }
});

spotifyRouter.post('/refresh', async (req, res) => {
  try {
    if (!req.body.refresh_token) {
      res.status(400).json({ error: 'Refresh token is missing from body' });
      return;
    }

    const data = {
      grant_type: 'refresh_token',
      refresh_token: decrypt(req.body.refresh_token),
    };
    const httpOptions = generateHttpOptions(data);
    const { response, result } = await postRequest(spotifyEndpoint, httpOptions);

    // encrypt refresh_token
    if (result.refresh_token) {
      result.refresh_token = encrypt(result.refresh_token);
    }

    // send response
    res.status(response.statusCode || 500).json(result);
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.statusCode);
    } else {
      res.status(500);
    }
    if (error.data) {
      res.send(error.data);
    } else {
      res.send('');
    }
  }
});

export default spotifyRouter;
