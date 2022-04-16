import {client} from '../../lib/sanityClient'

const createUser = (req,res) => {
    try  {
        const userDoc = {
            _type: 'users',
            _id: req.body.walletAdress,
            _userName: 'Unnamed',
            _adress: req.body.walletAdress,
             }

    }catch (error) {
        res.status(500).send({message:'error',data:error.message})
    }
}

export default createUser();