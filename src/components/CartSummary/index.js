import {useState} from 'react'

import Popup from 'reactjs-popup'

import './index.css'

import CartContext from '../../context/CartContext'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

const CartSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState(true)
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const onClickPayment = () => setPaymentMethod(false)

  const onPlaceOrder = () => setIsOrderPlaced(true)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachItem => {
          total += eachItem.price * eachItem.quantity
        })
        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}
              </h1>
              <p className="total-items">{cartList.length} items in cart</p>

              <Popup
                trigger={
                  <button type="button" className="checkout-btn">
                    Checkout
                  </button>
                }
                modal
              >
                {close => (
                  <div className="payments-container">
                    {isOrderPlaced ? (
                      <>
                        <p className="success-message">
                          Your order has been placed successfully
                        </p>
                        <div className="closeButtonFlex">
                          <button
                            className="CloseButton"
                            type="button"
                            onClick={() => {
                              close()
                            }}
                          >
                            close
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h1 className="payments-heading">Payments Details</h1>
                        <p className="payments-sub-heading">Payment Method</p>
                        <ul className="payment-method-inputs">
                          {paymentOptionsList.map(each => (
                            <li
                              key={each.id}
                              className="payment-method-input-container"
                            >
                              <input
                                type="radio"
                                name="payment"
                                id={each.id}
                                disabled={each.isDisabled}
                                onChange={onClickPayment}
                                className="payment-method-input"
                              />
                              <label
                                className={`payment-method-label ${
                                  each.isDisabled ? 'disabled-label' : ''
                                }`}
                                htmlFor={each.id}
                              >
                                {each.displayText}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="order-details">
                          <p className="payments-sub-heading">Order details:</p>
                          <p>Quantity: {cartList.length}</p>
                          <p>Total Price: RS {total}/-</p>
                        </div>
                        <button
                          type="button"
                          disabled={paymentMethod}
                          onClick={onPlaceOrder}
                          className="confirm-order-button"
                        >
                          Confirm Order
                        </button>
                        <div className="closeButtonFlex">
                          <button
                            className="CloseButton"
                            type="button"
                            onClick={() => {
                              close()
                              setIsOrderPlaced(false)
                              setPaymentMethod(true)
                            }}
                          >
                            close
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartSummary
