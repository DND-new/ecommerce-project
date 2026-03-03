import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/formatMoney";

export function CartItemDetails({ cartItem, loadCart }) {
  const [showQuantityTextbox, setShowQuantityTextbox] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateProductQuantity = () => {
    setShowQuantityTextbox(true);

    if (showQuantityTextbox === true) {
      const updateQuantity = async () => {
        await axios.put(`api/cart-items/${cartItem.productId}`, {
          quantity: quantity,
        });
        await loadCart();
        setShowQuantityTextbox(false);
      };
      updateQuantity();
    }
  };

  const updateQuantity = (event) => {
    const selectedQuantity = Number(event.target.value);

    setQuantity(selectedQuantity);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const updateQuantity = async () => {
        await axios.put(`api/cart-items/${cartItem.productId}`, {
          quantity: quantity,
        });
        await loadCart();
        setShowQuantityTextbox(false);
      };
      updateQuantity();
    } else if (event.key === "Escape") {
      const updateQuantity = async () => {
        await axios.put(`api/cart-items/${cartItem.productId}`, {
          quantity: quantity,
        });
        await loadCart();
        setShowQuantityTextbox(false);
      };
      updateQuantity();
    }
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {showQuantityTextbox ? (
              <input
                type="text"
                className="quantity-textbox"
                value={quantity}
                onChange={updateQuantity}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <span className="quantity-label"> {cartItem.quantity} </span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateProductQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
