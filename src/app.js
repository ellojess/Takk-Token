App = {
    loading: false,
    // Store the contracts
    contracts: {},

    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
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
    // retrieve the account
    loadAccount: async () => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]
        // Check imported Metamask ganache account id
        console.log(App.account)
        // $('#account').html(App.account)
    },

    // Kento: Load smart contract from the blockchain
    loadContract: async () => {
    // Create Javascript version of the smart contract -> allows us to call functions on it
        // pulling the TakkToken.json file
        const takkToken = await $.getJSON('TakkToken.json')
        // pass in the TakkToken.json file -> create a wrapper around json file created by truffle allowing us to interact with it
        App.contracts.TakkToken = TruffleContract(takkToken)
        // set the provider -> give copy of the smart contract in Javascript telling us where it is on the blockchain
        // Can do things like call all the functions in the contract.
        App.contracts.TakkToken.setProvider(App.web3Provider)
        console.log(takkToken)

        // Get a deployed copy of the smart contract
        App.takkToken = await App.contracts.TakkToken.deployed()
        console.log(App.takkToken)
    },

    createToken: async () => {
        const content = $('#newToken').val()
        await App.takkToken.createToken(content)
        window.location.reload()
    },

    // Render out the account that we are connected with.
    render: async () => {
        // Prevent double rendering => "If loading, stop calling this function"
        if (App.loading) {
            return
        }
        // While this function is running...:
        // Update loading status
        App.setLoading(true)

        // Render account -> put the account inside of the id="account" in index.html
        $('#account').html(App.account)

        // Render gratitude (good deeds)
        await App.renderGratitude()

        // Update loading status
        App.setLoading(false)
    },

    renderGratitude: async () => {
        // Load total gratitude count from blockchain
        const gratitudeCount = await App.takkToken.gratitudeCount()
        const $gratitudeTemplate = $('.gratitudeTemplate')
        // Render each gratitude with a new gratitude template
        for (var i = 1; i <= gratitudeCount; i++) {
            const gratitude = await App.takkToken.tokens(i)
            const gratitudeId = gratitude[0].toNumber()
            const gratitudeContent = gratitude[1]
            
            // Create the html for the gratitude
            const $newGratitudeTemplate = $gratitudeTemplate.clone()
            $newGratitudeTemplate.find('.content').html(gratitudeContent)
            $newGratitudeTemplate.find('input')
                            .prop('name', gratitudeId)
            
            // Put gratitude in list
            $('#gratitudeList').append($newGratitudeTemplate)

            // Show Gratitude
            $newGratitudeTemplate.show()
        }
    },
    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    }
}



$(() => {
    $(window).load(() => {
        App.load()
    })
})
  