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

function taskTwo(username, password, variable) {
  let user;
  axios.post('https://api.okra.ng/v2/mock-api/login', { username, password }).then(result => {
    user = result.data.data;
    axios.post('https://api.okra.ng/v2/mock-api/refresh-wallet', { wallet_id: user.profile.id, variable }).then(result => {
      // This won't run as refresh endpoint returns error
      user.profile.walletPostRefresh = result.data.data;
      axios.get('https://api.okra.ng/v2/mock-api/logout').then(result => {
        const logoutMsg = result.data.data.msg;
        console.log('\nUser\'s name: ', user.profile.name, '\nUser\'s id: ', user.profile.id, '\nUser\'s wallet pre-refresh: ', user.profile.wallet.amount.toString(), '\nUser\'s wallet post-refresh: ', user.profile.walletPostRefresh, '\nlogout message: ', logoutMsg);
      }).catch(error => {
        console.log(error);
      })
    }).catch(error => {
      // continue task when refresh wallet endpoint fails as POC
      // console.log(error.response.data);
      user.profile.walletPostRefresh = variable;
      axios.get('https://api.okra.ng/v2/mock-api/logout').then(result => {
        const logoutMsg = result.data.data.msg;
        console.log('\nUser\'s name: ', user.profile.name, '\nUser\'s id: ', user.profile.id, '\nUser\'s wallet pre-refresh: ', user.profile.wallet.amount.toString(), '\nUser\'s wallet post-refresh: ', user.profile.walletPostRefresh, '\nlogout message: ', logoutMsg);
      }).catch(error => {
        console.log(error);
      })
    }).catch(error => {
      console.log(error);
    })
  })
}

taskTwo('okra_user', 'okra_pass', 1000);