
const { ethers } = require("hardhat");
const main = async () => {
        const dogeFactory = await ethers.getContractFactory('Dodge')
        const dogeContract = await dogeFactory.deploy()
        await dogeContract.deployed()
        console.log('Dogecoin deployed to:', dogeContract.address)

        const btcFactory = await ethers.getContractFactory('BTC')
        const btcContract = await btcFactory.deploy()
        await btcContract.deployed()
        console.log('Btc deployed to:', btcContract.address)

        const solanaFactory = await ethers.getContractFactory('Solana')
        const solanaContract = await solanaFactory.deploy()
        await solanaContract.deployed()
        console.log('Solana deployed to:', solanaContract.address)

        const usdcFactory = await ethers.getContractFactory('Usdc')
        const usdcContract = await usdcFactory.deploy()
        await usdcContract.deployed()
        console.log('UsdcToken deployed to:', usdcContract.address)
    }
    //addresses of the smart contracts on the rinkeby blockchain ! :
// Dogecoin deployed to: 0xE1965489616631C2a3298EeBb949002ecFa7C771
// Btc deployed to: 0xcBCB6D35fE0A7fe500d9d41e8865d59E881318FA
// Solana deployed to: 0xE777486C56134AFC84b09bD80A0615333e72F297
// UsdcToken deployed to: 0x107EF01Ae2f2480Db20A2BD5cA01bfF55Dd5ba9F

;(async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})()