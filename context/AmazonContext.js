import { useState, useEffect, createContext } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";

export const AmazonContext = createContext();

export const AmazonProvider = ({ children }) => {

    const [nickname, setNickname] = useState('');
    const [username, setUsername] = useState('');

    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled
    } = useMoralis()

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
    return (
        <AmazonContext.Provider
            value={{
                isAuthenticated,
                setNickname,
                username,
                nickname,
                setUsername,
                handleSubmit,
            }}
        > 
            {children}
        </AmazonContext.Provider>
    )
}