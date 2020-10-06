const { assert } = require("chai")

const TakkToken = artifacts.require('./TakkToken.sol')

contract('TakkToken', (acccounts) => {
    before(async () => {
        this.takkToken = await TakkToken.deployed()
    })

    it('deploys successfully', async () => {
        const address = await this.takkToken.address
        assert.notEqual(address, 0x0) // if address is not 0x0 then contract delopyed with address
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    // checking to see if contructor works as expected
    it('shows contructor properly', async () => {
        const gratitudeCount = await this.takkToken.gratitudeCount()
        const gratitude = await this.takkToken.tokens(gratitudeCount)
        assert.equal(gratitude.gratitudeMessage, "Welcome Takk Token") 
    })
})