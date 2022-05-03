import { useState, useEffect, createContext } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { amazonAbi, amazonCoinAddress } from "../lib/constants";
import { ethers } from "ethers";
export const AmazonContext = createContext();

export const AmazonProvider = ({ children }) => {

    const [nickname, setNickname] = useState('');
    const [username, setUsername] = useState('');
    const [assets, setAssets] = useState([]);
    const [currentAccount, setCurrentAccount] = useState('')
    const [tokenAmount, setTokenAmount] = useState('')
    const [amountDue, setAmountDue] = useState('')
    const [etherscanLink, setEtherscanLink] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [balance, setBalance] = useState('')

    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled
    } = useMoralis()

    const {
        data: assetsData,
        error: assetsDataError,
        isLoading: userDetailsLoading,
    } = useMoralisQuery('assets')

    useEffect(() => {
        ;(async() => {
            if (isAuthenticated) {
                await getBalance();
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername);
                const account = await user?.get('ethAddress');
                setCurrentAccount(account);
            }
        })()
    }, [isAuthenticated, user, username, currentAccount])

    const handleSubmit = () => {
        if (user) {
            if (nickname) {
                user.set('nickname', nickname)
                user.save()
            } else console.log('Can\'t set nickname')
        } else console.log('no user')
    }

    const getBalance = () => {
        try {
            if (!isAuthenticated || !currentAccount) return
            const options = {
                contractAddress: amazonCoinAddress,
                functionName: 'balanceOf',
                abi: amazonAbi,
                params: {
                    account: currentAccount
                }
            }
            if (isWeb3Enabled) {
                const response =  await Moralis.executeFunction(options)
                setBalance(response.toString())
            }
        } catch(e) {
            console.log(e)
        }
    }

    const buyTokens = async () => {
        if (!isAuthenticated) {
            await authenticate()
        }
        const amount = ethers.BigNumber.from(tokenAmount)
        const price = ethers.BigNumber.from(10000000000000)
        const calcPrice = amount.mul(price)

        let options = {
            contractAddress: amazonCoinAddress,
            functionName: 'mint',
            abi: amazonAbi,
            msgValue: calcPrice,
            params: {
                amount,
            },
        }

        const transaction = await Moralis.executeFunction(options);
        const receipt = transaction.wait(4);
        setIsLoading(false);
        console.log(receipt);
        setEtherscanLink(`https://rinkeby.etherscan.io/tx${receipt.transactionHash}`)
    };
    const getAssets = async() => {
        try {
            await enableWeb3();
            console.log('RUNNING');
            setAssets(assetsData);
        } catch(error) {}
    };

    useEffect(() => {
        ;(async() => {
            if (isWeb3Enabled) {
               await getAssets()
            }
        })()
    }, [isWeb3Enabled, assetsData])

    return (
        <AmazonContext.Provider
            value={{
                isAuthenticated,
                setNickname,
                username,
                nickname,
                setUsername,
                handleSubmit,
                assets,
                balance,
                setTokenAmount,
                tokenAmount,
                setIsLoading,
                amountDue,
                setAmountDue,
                isLoading,
                setEtherscanLink,
                etherscanLink,
                currentAccount,
                setCurrentAccount,
                buyTokens,
            }}
        > 
            {children}
        </AmazonContext.Provider>
    )
}