import React, { useContext } from 'react';
import logo from '../assets/amazon_logo_full.png';
import Image from 'next/image';
import { CgMenuGridO } from 'react-icons/cg'
import { IoMdSearch } from 'react-icons/io'
import { FaCoins } from 'react-icons/fa';
import {
    ModalProvider,
    Modal,
    useModal,
    ModalTransition,
} from 'react-simple-hook-modal';
import 'react-simple-hook-modal/dist/styles.css'

const balance = '99'

const Header = () => {
    const styles = {
        container: `h-p[60px] w-full flex items-center gap-5 px-16`,
        logo: `flex items-center ml-[20px] cursor-pointer flex-1`,
        search: `p-[25px] mr-[30px] w-[400px] h-[40px] bg-white rounded-full shadow-lg flex flex items-center border border-black`,
        searchInput: `bg-transparent focus: outline-none border-none flex-1 items-center flex`,
        menuItem: `flex items-center text-md font-bold cursor-pointer`,
        menu: `flex items-center gap-5`,
        coins: `ml-[10px]`
    };

    const { openModal, isModalOpen } = useModal()
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image
                    src={logo}
                    alt="amazonlogo"
                    height={100}
                    width={100}
                    className="object-cover"
                />
            </div>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Search Your Assets here..."
                    className={styles.searchInput}
                    />
                    <IoMdSearch fontSize={20} />
            </div>
            <div className={styles.menu}>
                <div className={styles.menuItem}>New Releases</div>
                <div className={styles.menuItem}>Featured</div>
                { balance ? (
                    <div className={(styles.balance, styles.menuItem)} onClick={openModal}>
                        {balance}
                        <FaCoins className={styles.coins} />
                        <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                            {/* <BuyModal close={closeModal} buyTokens = {buyToken} /> */}
                        </Modal>
                    </div>
                ) : (
                    <div className={(styles.balance, styles.menuItem)}
                    onClick={openModal}
                    >
                        0 AC <FaCoins className={styles.coins} />
                        <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                            {/* <BuyModal close={closeModal} buyTokens = {buyToken} /> */}
                        </Modal>
                    </div>
                )}
                <CgMenuGridO fontSize={30} className={styles.menuItem} />
            </div>
        </div>
    )
}

export default Header