const express = require('express');
const app = express();
const request = require('request');

function getBitcoinBalance(address) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.fathomx.com/api/v1/address/btc:${address}/balance`;

    request(apiUrl, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        const data = JSON.parse(body);
        const balance = data.address.balance; // Updated line to access the balance field
        resolve(balance);
      }
    });
  });
}

app.get('/balance/:address', async (req, res) => {
  const address = req.params.address;

  try {
    const balance = await getBitcoinBalance(address);
    res.json({ address, balance });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the balance.' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

