const hre = require('hardhat');

async function main() {
    const amazonCoinFactory = await hre.ether.getContractFactory('Amazon Coin')
    const amazonCoin = await amazonCoinFactory.deploy("Amazon Coin");

    await amazonCoin.deployed();

    console.log('Amazon Coin deployed Successfully to: ', amazonCoin.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })