import {createContext, useEffect, useState} from 'react'
import {useMoralis} from "react-moralis";

//creer le context et stocker dans une var
//context -> creer un provider qui permet de rendre les variables accessible de maniere globale (dans _app.js)

export const RobinHoodContext = createContext()


export const RobinHoodProvider = ({children}) => {

   const  [currentAccount,setCurrentAccount] = useState('')
    const [formattedAccount,setFormattedAccount] = useState('')
    const {isAuthenticated, authenticate, user, logout, Moralis,enableWeb3}= useMoralis()

    //check if user login sinon il ne peut pas utiliser l'application
    useEffect(()=> {
        if(isAuthenticated) {
            const account = user.get('ethAddress')
            let formatAccount = account.slice(0,4)+'...'+account.slice(-4)
            setFormattedAccount(formatAccount)
            setCurrentAccount(account)
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
