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
})