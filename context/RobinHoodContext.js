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
    const updateCurrentBalance = async () => {

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
    useEffect(  () => {
        if(isAuthenticated) {
            const account = user.get('ethAddress')
            let formatAccount = account.slice(0,4)+'...'+account.slice(-4)
            setFormattedAccount(formatAccount)
            setCurrentAccount(account)

            updateCurrentBalance();


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

    const getToAddress = () => {
        switch (toCoin){
            case "DODGE": return dodgeAddress
            case "BTC": return bitcoinAddress
            case "SOL": return solanaAddress
            case "USDC": return usdcAddress
        }
    }

    const getToAbi = () => {
        switch (toCoin){
            case "DODGE": return dogeAbi
            case "BTC": return bitcoinAbi
            case "SOL": return solanaAbi
            case "USDC": return usdcAbi
        }
    }

    //Mint function for the token with send ether to the contract
    const mint = async () => {
        try {
            if (coinSelect === 'ETH') {
                if (!isAuthenticated) return
                await Moralis.enableWeb3()
                const contractAddress = getToAddress()
                const abi = getToAbi()

                let options = {
                    contractAddress: contractAddress,
                    functionName: 'mint',
                    abi: abi,
                    params: {
                        to: currentAccount,
                        amount: Moralis.Units.Token('50', '18'),
                    },
                }
                sendEth()
                const transaction = await Moralis.executeFunction(options)
                const receipt = await transaction.wait(4)
                console.log(receipt)
                saveTransaction(receipt.transactionHash, amount, receipt.to)
            }
            else
                {

                await Moralis.enableWeb3()
                const contractAddress = getToAddress()
                const abi = getToAbi()

                let options = {
                    contractAddress: contractAddress,
                    functionName: 'mint',
                    abi: abi,
                    params: {
                        to: currentAccount,
                        amount: Moralis.Units.Token('50', '18'),
                    },
                }

                swapTokens()
                const transaction = await Moralis.executeFunction(options)
                const receipt = await transaction.wait(4)
                console.log(receipt)
                saveTransaction(receipt.transactionHash, amount, receipt.to)

                }
        } catch (error) {
            console.error(error.message)
        }
    }

    const swapTokens = async () => {
        try {
            if (!isAuthenticated) return
            await Moralis.enableWeb3()

            if (coinSelect === toCoin) return

            const fromOptions = {
                type: 'erc20',
                amount: Moralis.Units.Token(amount, '18'),
                receiver: getContractAddress(),
                contractAddress: getContractAddress(),
            }
            const toMintOptions = {
                contractAddress: getToAddress(),
                functionName: 'mint',
                abi: getToAbi(),
                params: {
                    to: currentAccount,
                    amount: Moralis.Units.Token(amount, '18'),
                },
            }
            let fromTransaction = await Moralis.transfer(fromOptions)
            let toMintTransaction = await Moralis.executeFunction(toMintOptions)
            let fromReceipt = await fromTransaction.wait()
            let toReceipt = await toMintTransaction.wait()
            console.log(fromReceipt)
            console.log(toReceipt)
        } catch (error) {
            console.error(error.message)
        }
    }
    const sendEth = async ()=> {
        if(!isAuthenticated) return

        const contractAdress = getToAddress()

        let options = {
            type: 'native',
            //price to mint the contracts
            amount: Moralis.Units.ETH('0.01'),
            receiver: contractAdress
        }

        const transaction = await Moralis.transfer(options)
        const receipt = await transaction.wait()
        console.log(receipt)
        saveTransaction(receipt.transactionHash, '0.01', receipt.to)

    }

    const saveTransaction = async (txHash,amount,toAdress) => {
       await  fetch('/api/swapTokens', {
           method: 'POST',
           headers: {
               'Content-Type':'application-json',

           },
           body: JSON.stringify({
               textHash:txHash,
               from:currentAccount,
               to:toAdress,
               amount: parseFloat(amount)
           })
       })
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
                setCoinSelect,
                coinSelect,
                setAmount,
                amount,
                mint,
                swapTokens,
                setToCoin,
                toCoin,
                balance

            }}
        >
            {children}
        </RobinHoodContext.Provider>
    )

}
