import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { motion } from 'framer-motion'

function ProductCard({
  image,
  name,
  price,
  addToCart,
  showDetails,
  wishlist,
  toggleWishlist
}) {

  const isWishlisted = wishlist.some(
    (item) => item.name === name
  )

  return (

    <motion.div

      whileHover={{
        y: -12,
        scale: 1.03
      }}

      transition={{
        duration: 0.3
      }}

      onClick={showDetails}

      className="cursor-pointer backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[35px] overflow-hidden shadow-[0_10px_50px_rgba(255,0,255,0.2)] relative group"

    >

      {/* BACKGROUND GLOW */}

      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

      {/* WISHLIST BUTTON */}

      <motion.button

        whileTap={{
          scale: 0.8
        }}

        onClick={(e) => {

          e.stopPropagation()
          toggleWishlist()

        }}

        className="absolute top-5 right-5 z-20 text-2xl bg-black/30 backdrop-blur-xl p-3 rounded-full"

      >

        <FaHeart
          className={
            isWishlisted
              ? 'text-pink-500'
              : 'text-white'
          }
        />

      </motion.button>

      {/* PRODUCT IMAGE */}

      <div className="overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">

        <motion.img

          whileHover={{
            scale: 1.1,
            rotate: -6
          }}

          transition={{
            duration: 0.5
          }}

          src={image}
          alt={name}
          className="w-full h-80 object-contain p-8"

        />

      </div>

      {/* PRODUCT DETAILS */}

      <div className="p-7 text-white relative z-10">

        <h2 className="text-3xl font-extrabold">
          {name}
        </h2>

        <p className="text-pink-300 text-2xl mt-4 font-bold">
          ₹ {price}
        </p>

        <div className="flex gap-4 mt-7">

          {/* QUICK VIEW */}

          <motion.button

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={(e) => {

              e.stopPropagation()
              showDetails()

            }}

            className="flex-1 border border-white/20 py-4 rounded-2xl text-lg font-bold hover:bg-white hover:text-black transition"

          >

            Quick View

          </motion.button>

          {/* ADD TO CART */}

          <motion.button

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={(e) => {

              e.stopPropagation()
              addToCart()

            }}

            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 py-4 rounded-2xl text-lg font-bold shadow-[0_10px_30px_rgba(255,0,255,0.4)] flex justify-center items-center gap-3"

          >

            <FaShoppingCart />

            Add

          </motion.button>

        </div>

      </div>

    </motion.div>

  )
}

export default ProductCard