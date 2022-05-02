import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { ConnectButton } from 'web3uikit'
import logo from '../assets/amazon_logo.png';
import { FaBox } from 'react-icons/fa';
import { BsFillBookmarkFill, BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineHistory } from 'react-icons/ai';
import logoFull from '../assets/amazon_logo_full.png';

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
        setNickname: `text-lg font-bold flex flex-1 items-center mt-[10px] text-white`,
        menu: `flex flex-col w-full h-full px-10 gap-10`,
        menuItem: `flex items-center text-lg font-bold cursor-pointer gap-2`,
        companyName: `text-lg font-bold flex flex-1 pl-10 items-center mt-[20px]`,
        amazonLogo: `mr-4 flex object-cover`,
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
                <div className={styles.menu}>
                    <Link href="/">
                        <div className={styles.menuItem}>
                            <Image
                                alt='amazon'
                                src={logo}
                                height={30}
                                width={30}
                                className={styles.amazonLogo}
                            />
                            My Amazon <br /> Brand
                        </div>
                    </Link>
                    <div className={styles.menuItem}>
                        <FaBox /> Collections
                    </div>
                    <div className={styles.menuItem}>
                        <BsFillBookmarkFill /> Saved
                    </div>
                    <div className={styles.menuItem}>
                        <BsFillPersonFill />
                        Profile
                    </div>
                    <Link href={'/'}>
                        <div className={styles.menuItem}>
                            <AiOutlineHistory />
                            Transaction History
                        </div>
                    </Link>
                </div>
            </div>
            <div className={styles.companyName}>
                <Image
                    alt='logofull'
                    src={logoFull}
                    height={100}
                    width={100}
                />
            </div>
        </div>
    )
}

export default Sidebar