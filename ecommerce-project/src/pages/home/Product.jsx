import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/formatMoney";
import CheckMark from "../../assets/images/icons/checkmark.png";

export function Product({ product, loadCart }) {
  const [productQuantity, setProductQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity: productQuantity,
    });
    setShowAdded(true);

    setTimeout(() => {
      setShowAdded(false);
    }, 2000);

    await loadCart();
  };

  const quantitySelected = (event) => {
    const selectedQuantity = Number(event.target.value);

    setProductQuantity(selectedQuantity);
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={product.image}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price"></div>
      {formatMoney(product.priceCents)}
      <div className="product-quantity-container">
        <select value={productQuantity} onChange={quantitySelected}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{ opacity: showAdded ? 1 : 0 }}>
        <img src={CheckMark} />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        //To update cart items
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
