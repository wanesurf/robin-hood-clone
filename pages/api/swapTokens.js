//register the transactions to the sanity database !

import {client} from "../../lib/sanityClient";

const swapToken = async (req,res) => {
    try{

        const txDoc  = {
            _type: 'transactions',
            _id: req.body.txHash,
            txHash: req.body.txHash,
            fromAddress: req.body.from,
            toAddress: req.body.to,
            amount: req.body.amount,
            timestamp: new Date(Date.now()).toISOString(),
        }

        await client.createIfNotExists(txDoc)
        res.status(201).send({message:"success"})
        console.log("swap token was a sucess ")

    }
    catch (error) {
        console.log("error message Swap Token", error.message)
        res.status(500).send({message:error, data: error.message})
    }


}
