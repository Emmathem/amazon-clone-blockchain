import Image from 'next/image';
import React from 'react'
import { ConnectButton } from 'web3uikit'

const Sidebar = () => {
    const isAuthenticated = true;
    const username = 'Lance';
    // Lance
    const styles = {
        container: `h-full w-[300px] flex flex-col static bg-[#fff]`,
        profile: `w-full py-16 flex flex-col justify-center items-center rounded-r-3xl bg-gradient-to-t from-[#0d141c] to-[#42667e] mt-[40px] mb-[50px] border-2 border-[#fb9701]`,
        profilePicContainer: `flex rounded-xl items-center justify-center `,
        profilePic: `rounded-3xl object-cover`,
        welcome: `text-md mb-2 font-bold text-2xl text-white`,
        usernameInput: `bg-transparent border-white border-2 rounded-lg w-[80%] text-white py-2 px-4 text-lg mt-[20px] focus:outline-none placeholder:text-white`,
        username: `flex items-center w-full justify-center`,
        setNickname: `text-lg font-bold flex flex-1 items-center mt-[10px] text-white`
    };
    return (
        <div>
            {/* <ConnectButton /> */}
            <div className={styles.container}>
                <div className={styles.profile}>
                    {
                        isAuthenticated && (
                            <>
                                <div className={styles.profilePicContainer}>
                                    <Image
                                        src={`https://avatars.dicebear.com/api/pixel-art/${username}.svg`}
                                        alt='profile'
                                        width={100}
                                        height={100}
                                        className={styles.profilePic}
                                    />
                                </div>
                                {!username ? (
                                    <>
                                        <div className={styles.username}>
                                            <input
                                                type="text"
                                                placeholder="Username..."
                                                className={styles.usernameInput}
                                            // value={nickname}
                                            // onChange={e => setNickname(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            className={styles.setNickname}
                                        // onClick={handleSubmit}
                                        >Set Nickname</button>
                                    </>
                                ) : (
                                    <div>
                                        <div className={styles.welcome}>
                                            Welcome, {username}
                                        </div>
                                    </div>
                                )}
                            </>
                        )
                    }
                    <div style={styles.connectButton}>
                        <ConnectButton />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar