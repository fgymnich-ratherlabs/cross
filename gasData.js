const { ethers } = require('ethers');
require('dotenv').config();

const getFeesRPC = async (provider) => {     
    try{ 
        const feeData = await provider.getFeeData();
        let blockNumber = await provider.getBlockNumber();
        console.log('Blocknumber: ', blockNumber);
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




