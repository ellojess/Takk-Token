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
        // console.log(takkToken)

        // Get a deployed copy of the smart contract
        App.takkToken = await App.contracts.TakkToken.deployed()
        // console.log(App.takkToken)
    },

    createToken: async () => {
        const address = $('#recipientAddress').val()
        const content = $('#newToken').val()
        console.log("address", address)
        console.log("App.account", App.account)

        // Check if the address is the same as the current user's address
        // We don't want the user to be able to create tokens on their own account
        if (address.toLowerCase() != App.account.toLowerCase()) {
            // For testing purposes
            // const address = "0xef797217c1f6e681501B5a7dA1C14E159E68C5E2"
            await App.takkToken.createToken(address, content)
            window.location.reload()
        }
        // If the address is equal to the user's address
        // Don't allow token creation
        else {
            window.alert("You are not allowed to create a gratitude token for yourself.")
        }
        
    },

    transferToken: async () => {
        // Get the toAddress user input
        const toAddress = $('#toAddress').val()
        // Get the tokenID user input
        const tokenID = $('#tokenId').val()
        console.log(toAddress)
        console.log(tokenID)
        // Run Smart contract transfer function to transfer the token to the account associated
        // with toAddress
        await App.takkToken.transfer(App.account, toAddress, parseInt(tokenID))
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
        // For testing purposes
        // const address = "0x7097B2aFBCdf971A887E5f52bafbf5e7f5dEac67"
        // var userTokenIds = await App.takkToken.showTokensOfAnyone(address)
        const $gratitudeTemplate = $('.gratitudeTemplate')

        // Render each gratitude with a new gratitude template
        for (var i = 1; i <= gratitudeCount; i++) {
            // const tokenId = userTokenIds[i]["c"][0]

            // Check if the current user's account ID matches the token owner's ID
            if (App.account == await App.takkToken.ownerOf(i)) {
                const gratitude = await App.takkToken.tokens(i)
                // console.log("gratitidue", gratitude)
                const gratitudeId = gratitude[0].toNumber()
                // console.log("grad id", gratitudeId)
                const gratitudeContent = gratitude[1]
                // console.log("gratidue content", gratitudeContent)
                
                // Create the html for the gratitude
                const $newGratitudeTemplate = $gratitudeTemplate.clone()
                // Show the gratitude message and the token ID of that message
                $newGratitudeTemplate.find('.content').html("Token ID: " + i + " | " + gratitudeContent)
                $newGratitudeTemplate.find('input')
                                .prop('name', gratitudeId)
                
                // Put gratitude in list
                $('#gratitudeList').append($newGratitudeTemplate)

                // Show Gratitude
                $newGratitudeTemplate.show()
            }

        }
    },
    // Show/hide the loader/list of gratitude messages based on the boolean status of the loading attribute
    // ==> If loading is true: hide the content + display loader
    // ==> If loading is false: hide the loader + display content
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
  