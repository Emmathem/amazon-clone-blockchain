import React, { useContext, useEffect } from 'react'
import { AmazonContext } from '../context/AmazonContext'
import { IoIosClose } from 'react-icons/io'
import { HashLoader } from 'react-spinners'
import Link from 'next/link'

const BuyModal = ({ close }) => {

  const styles = {
    container: `h-full w-full flex flex-col`,
    loaderContainer: `w-full h-full flex items-center justify-center`,
    closeX: `h-[50px] w-full flex items-center justify-end mb-[20px]`,
    title: `text-3xl font-bold flex flex-1 items-center mt-[20px] justify-center mb-[20px]`,
    content: `flex w-full mb-[30px] text-xl justify-center`,
    inputBox: `w-full h-full flex items-center justify-center bg-[#f7f6f2] focus:outline-none`,
    input: `w-[350px] h-[50px] bg-[#f7f6f2] rounded-lg p-[10px] flex mx-auto`,
    price: `w-full h-full flex justify-center items-center mt-[20px] font-bold text-3xl`,
    buyBtn: `w-[20%] h-[50px] bg-[#000] mt-[40px] rounded-lg p-[10px] flex mx-auto text-white justify-center cursor-pointer`,
    success: `w-full h-full flex items-center justify-center font-bolder text-xl mt-[20px]`,
    etherscan: `w-ful h-full flex justify-center items-center text-green-500 text-2xl mt-[20px] font-bold cursor-pointer`
  };

  const {
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
  } = useContext(AmazonContext);

  const calculatePrice = () => {
    const price = parseFloat(tokenAmount * 0.0001)
    price = price.toFixed(4);
    setAmountDue(price);
  }
  useEffect(() => {
    calculatePrice()
  }, [tokenAmount])
  
  return (
    <div className={styles.container}>
      {isLoading ? (
        <>
          <div className={styles.loaderContainer}>
            <HashLoader size={80} />
          </div>
        </>
      ) : (
        <>
          <div className={styles.closeX}>
            <IoIosClose
              onClick={() => {
                close()
                setAmountDue('')
                setTokenAmount('')
                setEtherscanLink('')
              }}
              fontSize={50}
              className='cursor-pointer'
            />
          </div>
          <div className={styles.title}>Buy More Amazon Coin Here!</div>
          <div className={styles.content}>
            Select how many tokens would you like to buy
          </div>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Amount..."
              className={styles.inputBox}
              onChange={e => setTokenAmount(e.target.value)}
              value={tokenAmount}
            />
          </div>
          <div className={styles.price}>
            Total Due: {' '}
            {tokenAmount && tokenAmount > 0 ? amountDue + 'ETH' : '0 ETH'}
          </div>
          <button
            className={styles.buyBtn}
            disabled={!tokenAmount || tokenAmount < 0}
            onClick={() => {
              setIsLoading(true)
              buyTokens()
            }}
          >
            Buy
          </button>
          {etherscanLink && (
            <>
              <div className={styles.success}>
                Transaction Successful! Check out your receipt for yout transaction
              </div>
              <Link href={`${etherscanLink}`} className={styles.etherscan}>
                <a className={styles.etherscan} target="_blank">
                  Transaction Receipt
                </a>
              </Link>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default BuyModal