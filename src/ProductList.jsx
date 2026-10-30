import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
export const plantsArray = [
  {
    category: 'Air-Purifying Plants',
    plants: [
      { id: 'snake-plant', name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'A sculptural, resilient favourite that brings a fresh feel to any room.', cost: '$15' },
      { id: 'spider-plant', name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Graceful arching leaves and easy care make this a cheerful hanging plant.', cost: '$12' },
      { id: 'peace-lily', name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Glossy leaves and elegant white blooms add calm to shady corners.', cost: '$18' },
      { id: 'boston-fern', name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Lush, feathery fronds bring soft texture to bright, humid spaces.', cost: '$20' },
      { id: 'rubber-plant', name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg', description: 'Bold, glossy leaves make a striking statement with little fuss.', cost: '$17' },
      { id: 'areca-palm', name: 'Areca Palm', image: 'https://images.unsplash.com/photo-1586093248293-08a140c0d8b6?auto=format&fit=crop&w=900&q=85', description: 'Feathery palm fronds give living rooms a relaxed, tropical look.', cost: '$24' },
    ],
  },
  {
    category: 'Aromatic & Fragrant Plants',
    plants: [
      { id: 'lavender', name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?auto=format&fit=crop&w=900&q=85', description: 'A fragrant classic with silvery foliage and purple flower spikes.', cost: '$20' },
      { id: 'jasmine', name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?auto=format&fit=crop&w=900&q=85', description: 'Delicate star-shaped flowers fill the air with a sweet scent.', cost: '$18' },
      { id: 'rosemary', name: 'Rosemary', image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg', description: 'A woody, sun-loving herb with wonderfully aromatic leaves.', cost: '$15' },
      { id: 'mint', name: 'Mint', image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg', description: 'Fresh, bright leaves are lovely in teas, desserts, and summer drinks.', cost: '$12' },
      { id: 'hyacinth', name: 'Hyacinth', image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg', description: 'Colourful spring flower spikes bring an unmistakable perfume indoors.', cost: '$22' },
      { id: 'gardenia', name: 'Gardenia', image: 'https://images.unsplash.com/photo-1597055181300-4c4c2b1b06e2?auto=format&fit=crop&w=900&q=85', description: 'Creamy blooms and deep green leaves reward a bright, sheltered spot.', cost: '$26' },
    ],
  },
  {
    category: 'Medicinal & Kitchen Herbs',
    plants: [
      { id: 'aloe-vera', name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'A sun-loving succulent with soothing gel inside its fleshy leaves.', cost: '$14' },
      { id: 'echinacea', name: 'Echinacea', image: 'https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg', description: 'A long-blooming garden perennial with vivid, daisy-like flowers.', cost: '$16' },
      { id: 'peppermint', name: 'Peppermint', image: 'https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg', description: 'Aromatic leaves make a refreshing addition to drinks and cooking.', cost: '$13' },
      { id: 'chamomile', name: 'Chamomile', image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg', description: 'Small, daisy-like flowers and delicate foliage suit a sunny windowsill.', cost: '$15' },
      { id: 'calendula', name: 'Calendula', image: 'https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg', description: 'Bright orange blooms add a cheerful splash to patios and garden beds.', cost: '$12' },
      { id: 'thyme', name: 'Thyme', image: 'https://images.unsplash.com/photo-1600326145359-3a44909d1a39?auto=format&fit=crop&w=900&q=85', description: 'A compact, fragrant herb that thrives in a sunny, well-drained pot.', cost: '$11' },
    ],
  },
  {
    category: 'Easy-Care Houseplants',
    plants: [
      { id: 'zz-plant', name: 'ZZ Plant', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=900&q=85', description: 'Glossy, upright leaves stay handsome through missed waterings.', cost: '$25' },
      { id: 'golden-pothos', name: 'Golden Pothos', image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg', description: 'Trailing heart-shaped leaves brighten shelves and hanging baskets.', cost: '$10' },
      { id: 'cast-iron-plant', name: 'Cast Iron Plant', image: 'https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg', description: 'A dependable leafy plant that handles lower light and busy weeks.', cost: '$20' },
      { id: 'succulent-mix', name: 'Succulent Mix', image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg', description: 'A varied little collection of sculptural, drought-tolerant succulents.', cost: '$18' },
      { id: 'aglaonema', name: 'Aglaonema', image: 'https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg', description: 'Colourful patterned foliage brings life to softly lit rooms.', cost: '$22' },
      { id: 'parlor-palm', name: 'Parlor Palm', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=900&q=85', description: 'A compact, graceful palm that suits desks, shelves, and corners.', cost: '$19' },
    ],
  },
];

const fallbackPlantImage = 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(true);
  const [addedToCart, setAddedToCart] = useState({});
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const cartQuantity = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  useEffect(() => {
    const currentItems = new Set(cartItems.map((item) => item.id));
    setAddedToCart(Object.fromEntries([...currentItems].map((id) => [id, true])));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((previous) => ({ ...previous, [product.id]: true }));
  };

  const handleHome = (event) => {
    event.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (event) => {
    event.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleCartClick = (event) => {
    event.preventDefault();
    setShowPlants(false);
    setShowCart(true);
  };

  const handleContinueShopping = (event) => {
    event.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  return (
    <div className="shop-shell">
      <header className="navbar">
        <a className="brand" href="#home" onClick={handleHome} aria-label="Paradise Nursery home">
          <span className="brand-mark" aria-hidden="true">✿</span>
          <span><strong>Paradise Nursery</strong><small>Where Green Meets Serenity</small></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#home" onClick={handleHome}>Home</a>
          <a href="#plants" onClick={handlePlantsClick} aria-current={showPlants ? 'page' : undefined}>Plants</a>
          <a className="cart-link" href="#cart" onClick={handleCartClick} aria-label={`Shopping cart, ${cartQuantity} items`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h2l2.2 11.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" /><circle cx="10" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" /></svg>
            <span>Cart</span><span className="cart-badge">{cartQuantity}</span>
          </a>
        </nav>
      </header>

      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : showPlants ? (
        <main className="catalog-page" id="plants">
          <section className="catalog-intro">
            <p className="eyebrow">A little nature goes a long way</p>
            <h1>Find your new favourite plant</h1>
            <p>Thoughtfully chosen greenery for every room, routine, and growing experience.</p>
          </section>
          {plantsArray.map((section) => (
            <section className="plant-section" key={section.category}>
              <div className="section-heading"><h2>{section.category}</h2><span>{section.plants.length} plants</span></div>
              <div className="product-grid">
                {section.plants.map((plant) => {
                  const added = Boolean(addedToCart[plant.id]);
                  return (
                    <article className="product-card" key={plant.id}>
                      <div className="product-image-wrap">
                        <img
                          className="product-image"
                          src={plant.image}
                          alt={plant.name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = fallbackPlantImage;
                          }}
                        />
                        <span className="product-tag">Indoor favourite</span>
                      </div>
                      <div className="product-info">
                        <h3>{plant.name}</h3>
                        <p className="product-description">{plant.description}</p>
                        <div className="product-card-footer"><strong className="product-price">{plant.cost}</strong>
                          <button className={`product-button${added ? ' added-to-cart' : ''}`} type="button" onClick={() => handleAddToCart(plant)} disabled={added}>
                            {added ? 'Added to Cart' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      ) : null}
    </div>
  );
}

export default ProductList;

ProductList.propTypes = {
  onHomeClick: PropTypes.func.isRequired,
};
