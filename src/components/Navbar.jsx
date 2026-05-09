import { useState } from 'react'
import { FaBars, FaTimes, FaShoppingBag } from 'react-icons/fa'
import { motion } from 'framer-motion'

function Navbar({

  cartCount,
  darkMode,
  setDarkMode,
  setCartOpen

}) {

  const [menuOpen, setMenuOpen] = useState(false)

  return (

    <motion.nav

      initial={{
        y: -100
      }}

      animate={{
        y: 0
      }}

      transition={{
        duration: 0.7
      }}

      className={`

        fixed top-0 left-0 w-full z-50 backdrop-blur-2xl border-b shadow-lg duration-500

        ${darkMode
          ? 'bg-black/30 border-white/10'
          : 'bg-white/70 border-black/10'
        }

      `}

    >

      <div className={`

        flex justify-between items-center px-6 md:px-12 py-5 duration-500

        ${darkMode
          ? 'text-white'
          : 'text-black'
        }

      `}>

        {/* LOGO */}

        <motion.h1

          whileHover={{
            scale: 1.05
          }}

          className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent cursor-pointer"

        >

          SneakX

        </motion.h1>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex gap-8 items-center text-lg font-medium">

          <a
            href="#home"
            className="hover:text-pink-400 transition duration-300"
          >

            Home

          </a>

          <a
            href="#sneakers"
            className="hover:text-pink-400 transition duration-300"
          >

            Sneakers

          </a>

          <a
            href="#orders"
            className="hover:text-pink-400 transition duration-300"
          
          >
            <a
  href="#wishlist"
  className="hover:text-pink-400 transition duration-300"
>

  Wishlist

</a>
            Orders

          </a>

          {/* CART BUTTON */}

          <motion.button

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={() => setCartOpen(true)}

            className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-full shadow-lg text-white flex items-center gap-3"

          >

            <FaShoppingBag />

            Cart ({cartCount})

          </motion.button>

          {/* DARK MODE BUTTON */}

          <motion.button

            whileTap={{
              rotate: 180,
              scale: 0.9
            }}

            onClick={() => setDarkMode(!darkMode)}

            className={`

              px-5 py-3 rounded-xl border duration-500

              ${darkMode
                ? 'bg-white/10 border-white/20 text-yellow-300'
                : 'bg-black/10 border-black/20 text-black'
              }

            `}

          >

            {darkMode ? '☀️ Light' : '🌙 Dark'}

          </motion.button>

        </div>

        {/* MOBILE MENU BUTTON */}

        <button

          className="md:hidden text-3xl"

          onClick={() => setMenuOpen(!menuOpen)}

        >

          {
            menuOpen ? <FaTimes /> : <FaBars />
          }

        </button>

      </div>

      {/* MOBILE MENU */}

      {
        menuOpen && (

          <motion.div

            initial={{
              opacity: 0,
              y: -20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.3
            }}

            className={`

              md:hidden flex flex-col gap-5 px-6 pb-6 backdrop-blur-xl duration-500

              ${darkMode
                ? 'text-white'
                : 'text-black'
              }

            `}

          >

            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
            >

              Home

            </a>

            <a
              href="#sneakers"
              onClick={() => setMenuOpen(false)}
            >

              Sneakers

            </a>

            <a
              href="#orders"
              onClick={() => setMenuOpen(false)}
            >

              Orders

            </a>

            {/* MOBILE CART */}

            <motion.button

              whileTap={{
                scale: 0.95
              }}

              onClick={() => {

                setCartOpen(true)
                setMenuOpen(false)

              }}

              className="bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-4 rounded-2xl text-white text-left flex items-center gap-3"

            >

              <FaShoppingBag />

              Cart ({cartCount})

            </motion.button>

            {/* DARK MODE */}

            <button

              onClick={() => setDarkMode(!darkMode)}

              className={`

                px-5 py-3 rounded-xl w-fit border duration-500

                ${darkMode
                  ? 'bg-white/10 border-white/20 text-yellow-300'
                  : 'bg-black/10 border-black/20 text-black'
                }

              `}

            >

              {darkMode ? '☀️ Light' : '🌙 Dark'}

            </button>

          </motion.div>

        )
      }

    </motion.nav>

  )
}

export default Navbar