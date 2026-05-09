import { motion, AnimatePresence } from 'framer-motion'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'

function CartDrawer({

  cart,
  cartOpen,
  setCartOpen,
  darkMode,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart

}) {

  const total = cart.reduce(

    (acc, item) =>

      acc + item.price * item.quantity,

    0

  )

  return (

    <AnimatePresence>

      {

        cartOpen && (

          <>

            {/* BACKDROP */}

            <motion.div

              initial={{
                opacity: 0
              }}

              animate={{
                opacity: 1
              }}

              exit={{
                opacity: 0
              }}

              transition={{
                duration: 0.2
              }}

              onClick={() => setCartOpen(false)}

              className="fixed inset-0 bg-black/50 z-40"

            />

            {/* DRAWER */}

            <motion.div

              initial={{
                x: '100%'
              }}

              animate={{
                x: 0
              }}

              exit={{
                x: '100%'
              }}

              transition={{
                duration: 0.35,
                ease: 'easeOut'
              }}

              className={`

                fixed top-0 right-0 h-screen w-full md:w-[420px] z-50 shadow-2xl p-6 overflow-y-auto

                ${darkMode
                  ? 'bg-[#0f0f0f] text-white'
                  : 'bg-white text-black'
                }

              `}

            >

              {/* HEADER */}

              <div className="flex justify-between items-center mb-10">

                <h1 className="text-4xl font-extrabold">

                  Your Cart

                </h1>

                <button

                  onClick={() => setCartOpen(false)}

                  className="text-4xl hover:rotate-90 transition duration-300"

                >

                  ×

                </button>

              </div>

              {/* EMPTY */}

              {
                cart.length === 0 && (

                  <div className="h-[70vh] flex justify-center items-center text-gray-400 text-2xl">

                    Cart is Empty

                  </div>

                )
              }

              {/* ITEMS */}

              <div className="space-y-6">

                {
                  cart.map((item) => (

                    <motion.div

                      key={item.id}

                      layout

                      initial={{
                        opacity: 0,
                        y: 30
                      }}

                      animate={{
                        opacity: 1,
                        y: 0
                      }}

                      className={`

                        flex gap-5 p-5 rounded-3xl border

                        ${darkMode
                          ? 'bg-white/5 border-white/10'
                          : 'bg-black/5 border-black/10'
                        }

                      `}

                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-28 h-28 object-contain"
                      />

                      <div className="flex-1">

                        <h2 className="text-2xl font-bold">
                          {item.name}
                        </h2>

                        <p className="text-pink-400 text-xl mt-2">
                          ₹ {item.price}
                        </p>

                        {/* QUANTITY */}

                        <div className="flex items-center gap-4 mt-5">

                          <button

                            onClick={() => decreaseQuantity(item.id)}

                            className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition"

                          >

                            <FaMinus />

                          </button>

                          <span className="text-xl font-bold">

                            {item.quantity}

                          </span>

                          <button

                            onClick={() => increaseQuantity(item.id)}

                            className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition"

                          >

                            <FaPlus />

                          </button>

                        </div>

                      </div>

                      {/* DELETE */}

                      <button

                        onClick={() => removeFromCart(item.id)}

                        className="text-red-500 text-2xl hover:scale-110 transition"

                      >

                        <FaTrash />

                      </button>

                    </motion.div>

                  ))
                }

              </div>

              {/* TOTAL */}

              {
                cart.length > 0 && (

                  <div className="mt-10 border-t border-white/10 pt-8">

                    <div className="flex justify-between text-3xl font-extrabold">

                      <span>Total</span>

                      <span className="text-pink-400">

                        ₹ {total}

                      </span>

                    </div>

                    <button

                      className="w-full mt-8 bg-gradient-to-r from-pink-500 to-purple-600 py-5 rounded-2xl text-2xl font-bold hover:scale-[1.02] transition"

                    >

                      Checkout

                    </button>

                  </div>

                )
              }

            </motion.div>

          </>

        )

      }

    </AnimatePresence>

  )
}

export default CartDrawer