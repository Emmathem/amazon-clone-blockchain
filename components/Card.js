import React from 'react'
import Image from 'next/image'
import { FaCoins } from 'react-icons/fa'

const Card = ({ item }) => {
    const styles = {
        cardContainer: `flex flex-col`,
        card: `h-[250px] w-[190px] rounded 3xl flex cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl 
                overflow-hidden border border-black shadow-xl border-4 border=[fb9701]`,
        cartTitle: `text-xl font-bold text-center w-full flex-1 justify-center mt-[10px]`,
        price: `text-md font-bold flex justify-center`,
        coins: `ml-[10px]`
    };
    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <Image
                    src={item.src}
                    className='object-cover object-center'
                    width={190}
                    height={250}
                    alt='product'
                />
            </div>
            <div>
                <div className={styles.cartTitle}>{item.name}</div>
                <div className={styles.price}>
                    {item.price} AC <FaCoins className={styles.coins} />
                </div>
            </div>
        </div>
    )
}

export default Card