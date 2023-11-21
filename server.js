
const { createClient } = require('@layerzerolabs/scan-client')

const express = require('express')
const app = express()
const port = process.env.port

app.use(express.json());

const Store = process.env.store || "testnet"
const client = createClient(Store);

app.get('/api/v1/fromSource',  async (req, res) => {
    const { srcTxHash, chainId } = req.query   
    if (chainId == "" || chainId == undefined || srcTxHash == "" || srcTxHash ==undefined){
        res.status(400).json({ message: "Invalid Parameter" });
    }
    const { messages } = await client.getMessagesBySrcTxHash(chainId,srcTxHash);

    res.json({ messages });
    return
})

app.listen(port, () => {
    console.log(`Stargate app listening on port ${port}`)
})