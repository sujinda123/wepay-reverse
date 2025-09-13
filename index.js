import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

// app.post('/', async (req, res) => {
//   console.log(req.body)
//   res.status(200).send('Welcome');
// });

app.post('/api/wepay/callback', async (req, res) => {
  console.log(req);
});

app.post('/api/wepay', async (req, res) => {
  const formData = new FormData();

  var raw = {
    username: process.env.WEPAY_USERNAME,
    password: process.env.WEPAY_PASSWORD,
    ...req.body,
  };

  for (const key in raw) {
    if (Object.prototype.hasOwnProperty.call(raw, key)) {
      formData.append(key, raw[key]);
    }
  }

  var requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow',
  };

  const response = await fetch(process.env.WEPAY_API, requestOptions);
  const result = await response.text();

  res.status(200).json(JSON.parse(result));
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on http://localhost:${process.env.SERVER_PORT}`);
});