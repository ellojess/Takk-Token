App = {

    solidityContracts: {},
    
    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
      },

      // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider
          web3 = new Web3(web3.currentProvider)
        } else {
          window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
          window.web3 = new Web3(ethereum)
          try {
            // Request account access if needed
            await ethereum.enable()
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */})
          } catch (error) {
            // User denied account access...
          }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
          App.web3Provider = web3.currentProvider
          window.web3 = new Web3(web3.currentProvider)
          // Acccounts always exposed
          web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      },



    // To load the account
    loadAccount: async () => {
        // Set the current blockchain account
        App.accountME = web3.eth.accounts[0]
        $('#account').html(App.accountME) 
        console.log(App.accountME)
      },

    // Load contract
    loadContract: async () => {
        // Create a JavaScript of smart contnract
        const contract = await $.getJSON('TakkToken.json')
        App.solidityContracts.TakkToken = TruffleContract(contract)
        App.solidityContracts.TakkToken.setProvider(App.web3Provider)

        App.deployedContract = await App.solidityContracts.TakkToken.deployed()
        console.log(App.deployedContract)
    },


}

$(() => {
    $(window).load(() => {
      App.load()
    })
  })
  