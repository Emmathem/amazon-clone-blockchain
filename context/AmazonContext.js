import { useState, useEffect, createContext } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";

export const AmazonContext = createContext();

export const AmazonProvider = ({ children }) => {

    const [nickname, setNickname] = useState('');
    const [username, setUsername] = useState('');
    const [assets, setAssets] = useState([]);

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
                const currentUsername = await user?.get('nickname')
                console.log(currentUsername, 'currentUsername');
                setUsername(currentUsername);
            }
        })()
    }, [isAuthenticated, user, username])

    const handleSubmit = () => {
        if (user) {
            if (nickname) {
                user.set('nickname', nickname)
                user.save()
            } else console.log('Can\'t set nickname')
        } else console.log('no user')
    }

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
            }}
        > 
            {children}
        </AmazonContext.Provider>
    )
}