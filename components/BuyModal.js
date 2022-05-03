import React, { useContext, useEffect } from 'react'
import { AmazonContext } from '../context/AmazonContext'
import { IoIosClose } from 'react-icons/io'
import { HashLoader } from 'react-spinners'
import Link from 'next/link'

const BuyModal = ({ close }) => {

  const styles = {};

  const {
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
  } = useContext(AmazonContext);

  const calculatePrice = () => {
    const price = parseFloat(tokenAmount * 0.0001)
    price = price.toFixed(4);
    setAmountDue(price);
  }
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
              type={text}
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