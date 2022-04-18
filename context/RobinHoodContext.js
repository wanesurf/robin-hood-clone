import {createContext, useEffect, useState} from 'react'
import {useMoralis} from "react-moralis";

//creer le context et stocker dans une var
//context -> creer un provider qui permet de rendre les variables accessible de maniere globale (dans _app.js)


import {
    dogeAbi,
    bitcoinAbi,
    solanaAbi,
    usdcAbi,
    dodgeAddress,
    bitcoinAddress,
    solanaAddress,
    usdcAddress
} from "../lib/constants";

export const RobinHoodContext = createContext()


export const RobinHoodProvider = ({children}) => {

   const  [currentAccount,setCurrentAccount] = useState('')
    const [formattedAccount,setFormattedAccount] = useState('')
    const {isAuthenticated, authenticate, user, logout, Moralis,enableWeb3}= useMoralis()
    const [coinSelect, setCoinSelect]  = useState('DODGE')
    const [toCoin, setToCoin] = useState(' ')
    const [balance, setBalance ] = useState('')
    const [amount, setAmount] = useState('')


    //check if user login sinon il ne peut pas utiliser l'application
    useEffect( async () => {
        if(isAuthenticated) {
            const account = user.get('ethAddress')
            let formatAccount = account.slice(0,4)+'...'+account.slice(-4)
            setFormattedAccount(formatAccount)
            setCurrentAccount(account)
            //using Moralis to get the current value of the wallet through MetaMask
            const currentBalance = await Moralis.Web3API.account.getNativeBalance({
                chain: 'rinkeby',
                address: currentAccount,
            })
            //more info about the function : https://docs.moralis.io/moralis-dapp/tools/moralis-units
            const balanceToEth = Moralis.Units.FromWei(currentBalance.balance)
            const formattedBalance = parseFloat(balanceToEth).toFixed(3)
            setBalance(formattedBalance)
        }
    },[isAuthenticated,enableWeb3])

    //si c'est la premiere fois que le user se connect on veut le creer dans notre bdd Sanity
    useEffect(() => {
        if (!currentAccount) return
            ;(async () => {
            const response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    walletAddress: currentAccount,
                }),
            })

            const data = await response.json()
        })()
    }, [currentAccount])


    const getContractAddress = () => {


       switch (coinSelect){

           case "DODGE": return dodgeAddress
           case "BTC": return bitcoinAddress
           case "SOL": return solanaAddress
           case "USDC": return usdcAddress


       }


    }
    const connectWallet = () => {
        authenticate()
    }
    const signOut = () => {

        logout()
    }
    return (
        <RobinHoodContext.Provider
            value={{
                connectWallet,
                signOut,
                currentAccount,
                isAuthenticated,
                formattedAccount,
            }}
        >
            {children}
        </RobinHoodContext.Provider>
    )

}
