const hre = require('hardhat');

async function main() {
    console.log('ether', hre.ether);
    const amazonCoinFactory = await hre.ether.getContractFactory('AmazonCoin')
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