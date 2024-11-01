const { ethers } = require('ethers');
require('dotenv').config();


const getFeesRPC = async (provider) => {     
    try{ 
        const feeData = await provider.getFeeData();
        let blockNumber = await provider.getBlockNumber();
        console.log('Blocknumber: ', blockNumber);

        const message = 'hello world';
        const messageHex = ethers.hexlify(ethers.toUtf8Bytes(message));
        let gasEstimation = await provider.estimateGas(
            //data can be the binary code of the function to execute
            {from: "0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97", to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567", data: messageHex}
        )
        console.log(`message "${message}" from 0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97 to 0xd46e8dd67c5d32be8058bb8eb970870f07244567:`)
        console.log('gasEstimation:', gasEstimation);
        let feeCost = feeData.gasPrice * gasEstimation 
        console.log('feeCost (ETH): ', ethers.toNumber(feeCost)/10**18);
        return feeData

    } catch (err){
        console.log("Error getting fee data: ", err);
    }
}

async function gasData() {
    
    const holeskyInfuraUrl = process.env.HOLESKY_INFURA_URL;
    provider = new ethers.JsonRpcProvider(holeskyInfuraUrl);

    let gasData = await getFeesRPC(provider);
    console.log(gasData);

}

gasData().catch(console.log);






