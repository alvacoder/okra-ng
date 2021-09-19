const axios = require("axios");
//company ID: 484929849
//customer ID: 573839293

function refundCustomer(company, user, amount) {
    // console.log('Hello, World');
  let wallet;
  axios.post('https://api.okra.ng/v2/mock-api/fetch-wallet', { id: user }).then(result => {
    wallet = result.data.data.wallet;
    console.log('User\'s wallet before refund: ', wallet);

    axios.post('https://api.okra.ng/v2/mock-api/pay', { from_id: company, to_id: user, amount }).then(result => {
      wallet = result.data.data.wallets.to;
      console.log('User\'s wallet after refund: ', wallet);
    }).catch(error => {
    console.log(error);
  })
  }).catch(error => {
    console.log(error);
  })
  }
  
refundCustomer('484929849', '573839293', 2003.0)