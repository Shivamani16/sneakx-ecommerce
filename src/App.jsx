import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'

import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

import products from './data/products'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

function App() {

  const banners = [

    'https://images.unsplash.com/photo-1542291026-7eec264c27ff',

    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519',

    'https://images.unsplash.com/photo-1608231387042-66d1773070a5'

  ]

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  )

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('wishlist')) || []
  )

  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem('orders')) || []
  )

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const [selectedProduct, setSelectedProduct] = useState(null)

  const [cartOpen, setCartOpen] = useState(false)

  const [darkMode, setDarkMode] = useState(true)

  const [loading, setLoading] = useState(true)

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {

    const handleMouseMove = (e) => {

      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })

    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {

      window.removeEventListener('mousemove', handleMouseMove)

    }

  }, [])

  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false)

    }, 2000)

    return () => clearTimeout(timer)

  }, [])

  const addToCart = (product) => {

    const existingProduct = cart.find(
      (item) => item.id === product.id
    )

    let updatedCart

    if (existingProduct) {

      updatedCart = cart.map((item) =>

        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item

      )

    } else {

      updatedCart = [
        ...cart,
        { ...product, quantity: 1 }
      ]

    }

    setCart(updatedCart)

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    )

    toast.success(`${product.name} added to cart`)
  }

  const toggleWishlist = (product) => {

    const exists = wishlist.find(
      (item) => item.id === product.id
    )

    let updatedWishlist

    if (exists) {

      updatedWishlist = wishlist.filter(
        (item) => item.id !== product.id
      )

      toast.error('Removed from Wishlist')

    } else {

      updatedWishlist = [
        ...wishlist,
        product
      ]

      toast.success('Added to Wishlist')

    }

    setWishlist(updatedWishlist)

    localStorage.setItem(
      'wishlist',
      JSON.stringify(updatedWishlist)
    )

  }

  const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) =>

      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item

    )

    setCart(updatedCart)

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    )

  }

  const decreaseQuantity = (id) => {

    const updatedCart = cart
      .map((item) =>

        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item

      )
      .filter((item) => item.quantity > 0)

    setCart(updatedCart)

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    )

  }

  const removeFromCart = (id) => {

    const updatedCart = cart.filter(
      (item) => item.id !== id
    )

    setCart(updatedCart)

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    )

    toast.error('Item Removed')

  }

  const handleCheckout = () => {

    if (cart.length === 0) {

      toast.error('Cart is Empty')

      return

    }

    const updatedOrders = [

      ...orders,

      ...cart

    ]

    setOrders(updatedOrders)

    localStorage.setItem(
      'orders',
      JSON.stringify(updatedOrders)
    )

    setCart([])

    localStorage.removeItem('cart')

    setCartOpen(false)

    toast.success('Order Placed Successfully')

  }

  const filteredProducts = products.filter(

    (item) =>

      item.name
        .toLowerCase()
        .includes(search.toLowerCase())

      &&

      (
        category === 'All'
        ||
        item.category === category
      )

  )

  if (loading) {

    return (

      <div className="h-screen bg-black flex flex-col justify-center items-center overflow-hidden relative">

        <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[150px] rounded-full"></div>

        <motion.div

          animate={{
            rotate: 360
          }}

          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'linear'
          }}

          className="text-8xl mb-10"

        >

          👟

        </motion.div>

        <motion.h1

          initial={{
            opacity: 0,
            y: 30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1
          }}

          className="text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent text-center"

        >

          SneakX

        </motion.h1>

      </div>

    )

  }

  return (

    <div className={`

      ${darkMode
        ? 'bg-black text-white'
        : 'bg-white text-black'
      }

      min-h-screen overflow-hidden relative duration-500

    `}>

      <Toaster />

      {/* CURSOR GLOW */}

      <motion.div

        animate={{
          x: mousePosition.x - 100,
          y: mousePosition.y - 100
        }}

        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 20
        }}

        className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full bg-pink-500/20 blur-[100px] pointer-events-none z-0"

      />

      {/* NAVBAR */}

      <Navbar
        cartCount={cart.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setCartOpen={setCartOpen}
      />

      {/* CART DRAWER */}

      <CartDrawer

        cart={cart}

        cartOpen={cartOpen}

        setCartOpen={setCartOpen}

        darkMode={darkMode}

        increaseQuantity={increaseQuantity}

        decreaseQuantity={decreaseQuantity}

        removeFromCart={removeFromCart}

        handleCheckout={handleCheckout}

      />

      {/* HERO */}

      <div
        id="home"
        className={`

          min-h-screen flex flex-col justify-center items-center px-5 md:px-10 relative overflow-hidden duration-500

          ${darkMode
            ? 'bg-gradient-to-br from-purple-700 via-black to-pink-600 text-white'
            : 'bg-gradient-to-br from-pink-100 via-white to-purple-100 text-black'
          }

        `}
      >

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold leading-tight">

            NEXT GEN <br />

            <span className="text-pink-400">
              SNEAKERS
            </span>

          </h1>

          <p className="mt-8 text-base md:text-xl max-w-2xl mx-auto text-gray-300">

            Premium futuristic sneakers designed
            for comfort, luxury and streetwear culture.

          </p>

          <div className="flex gap-5 justify-center mt-10">

            <button

              onClick={() => {

                document
                  .getElementById('sneakers')
                  .scrollIntoView({
                    behavior: 'smooth'
                  })

              }}

              className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 md:px-10 py-4 rounded-full text-lg md:text-xl font-bold"

            >

              Shop Now

            </button>

          </div>

        </motion.div>

        {/* SWIPER */}

        <div className="mt-16 md:mt-20 w-full max-w-6xl z-10">

          <Swiper

            modules={[Autoplay, Pagination]}

            autoplay={{
              delay: 2500
            }}

            pagination={{
              clickable: true
            }}

            loop={true}

            className="rounded-[30px] md:rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(255,0,255,0.3)]"

          >

            {
              banners.map((image, index) => (

                <SwiperSlide key={index}>

                  <img
                    src={image}
                    alt="Sneaker Banner"
                    className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover"
                  />

                </SwiperSlide>

              ))
            }

          </Swiper>

        </div>

      </div>

      {/* PRODUCTS */}

      <div
        id="sneakers"
        className="p-5 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 relative z-10"
      >

        {
          filteredProducts.map((item) => (

            <ProductCard
              key={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              addToCart={() => addToCart(item)}
              showDetails={() => setSelectedProduct(item)}
              wishlist={wishlist}
              toggleWishlist={() => toggleWishlist(item)}
            />

          ))
        }

      </div>

      {/* PRODUCT MODAL */}

      {
        selectedProduct && (

          <motion.div

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            className="fixed inset-0 bg-black/70 backdrop-blur-xl flex justify-center items-center z-50 p-4 md:p-5"

          >

            <motion.div

              initial={{
                scale: 0.7,
                opacity: 0
              }}

              animate={{
                scale: 1,
                opacity: 1
              }}

              className={`

                rounded-[30px] md:rounded-[40px] p-5 md:p-8 max-w-2xl w-full relative border duration-500

                ${darkMode
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white border-black/10'
                }

              `}

            >

              <button

                onClick={() => setSelectedProduct(null)}

                className="absolute top-4 right-4 md:top-5 md:right-5 text-3xl md:text-4xl"

              >

                ×

              </button>

              <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">

                <motion.img

                  whileHover={{
                    scale: 1.05,
                    rotate: -5
                  }}

                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-60 md:h-80 object-contain"

                />

                <div>

                  <h1 className="text-3xl md:text-5xl font-extrabold">
                    {selectedProduct.name}
                  </h1>

                  <p className="mt-5 text-base md:text-lg text-gray-400">

                    Premium futuristic sneaker crafted
                    for comfort and luxury fashion.

                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold text-pink-400 mt-6">

                    ₹ {selectedProduct.price}

                  </h2>

                  <motion.button

                    whileHover={{
                      scale: 1.05
                    }}

                    whileTap={{
                      scale: 0.95
                    }}

                    onClick={() => addToCart(selectedProduct)}

                    className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-2xl text-lg md:text-xl font-bold mt-8 w-full text-white"

                  >

                    Add To Cart

                  </motion.button>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )
      }

      {/* WISHLIST SECTION */}

      <div
        id="wishlist"
        className="px-5 md:px-10 py-20 relative z-10"
      >

        <h1 className="text-4xl md:text-5xl font-extrabold mb-14 text-center">

          Your Wishlist ❤️

        </h1>

        {
          wishlist.length === 0 ? (

            <div className="text-center text-gray-400 text-xl md:text-2xl">

              Wishlist is Empty

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {
                wishlist.map((item) => (

                  <motion.div

                    key={item.id}

                    initial={{
                      opacity: 0,
                      y: 30
                    }}

                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}

                    className={`

                      rounded-[35px] overflow-hidden border p-5

                      ${darkMode
                        ? 'bg-white/5 border-white/10'
                        : 'bg-black/5 border-black/10'
                      }

                    `}

                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-60 md:h-72 object-contain"
                    />

                    <h2 className="text-2xl md:text-3xl font-bold mt-5">

                      {item.name}

                    </h2>

                    <p className="text-pink-400 text-xl md:text-2xl mt-3">

                      ₹ {item.price}

                    </p>

                    <div className="flex flex-col md:flex-row gap-4 mt-6">

                      <button

                        onClick={() => addToCart(item)}

                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 py-4 rounded-2xl text-lg font-bold"

                      >

                        Add To Cart

                      </button>

                      <button

                        onClick={() => toggleWishlist(item)}

                        className="px-5 py-3 rounded-2xl border border-red-500 text-red-500"

                      >

                        Remove

                      </button>

                    </div>

                  </motion.div>

                ))
              }

            </div>

          )
        }

      </div>

      {/* ORDERS SECTION */}

      <div
        id="orders"
        className="px-5 md:px-10 py-20 relative z-10"
      >

        <h1 className="text-4xl md:text-5xl font-extrabold mb-14 text-center">

          Your Orders

        </h1>

        {
          orders.length === 0 ? (

            <div className="text-center text-gray-400 text-xl md:text-2xl">

              No Orders Yet

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {
                orders.map((item, index) => (

                  <motion.div

                    key={index}

                    initial={{
                      opacity: 0,
                      y: 30
                    }}

                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}

                    className={`

                      p-5 md:p-6 rounded-3xl border flex gap-5 items-center

                      ${darkMode
                        ? 'bg-white/5 border-white/10'
                        : 'bg-black/5 border-black/10'
                      }

                    `}

                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-contain"
                    />

                    <div>

                      <h2 className="text-2xl md:text-3xl font-bold">

                        {item.name}

                      </h2>

                      <p className="text-pink-400 text-xl md:text-2xl mt-3">

                        ₹ {item.price}

                      </p>

                      <p className="text-gray-400 mt-2 text-sm md:text-base">

                        Order Confirmed ✅

                      </p>

                    </div>

                  </motion.div>

                ))
              }

            </div>

          )
        }

      </div>

      <Footer />

    </div>

  )
}

export default App