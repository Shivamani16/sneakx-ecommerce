import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

function Footer() {

  return (

    <footer className="relative mt-20 border-t border-white/10 bg-white/5 backdrop-blur-xl">

      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-10 py-16">

        <motion.div

          initial={{
            opacity: 0,
            y: 50
          }}

          whileInView={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1
          }}

          className="flex flex-col md:flex-row justify-between items-center gap-10"

        >

          {/* BRAND */}

          <div>

            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">

              SneakX

            </h1>

            <p className="text-gray-300 mt-4 max-w-md">

              Premium futuristic sneaker shopping experience
              designed for modern streetwear culture.

            </p>

          </div>

          {/* SOCIALS */}

          <div className="flex gap-6 text-3xl">

            <motion.a

              whileHover={{
                scale: 1.2,
                rotate: 10
              }}

              href="https://instagram.com"

              className="text-pink-400"

            >
              <FaInstagram />
            </motion.a>

            <motion.a

              whileHover={{
                scale: 1.2,
                rotate: -10
              }}

              href="https://github.com"

              className="text-white"

            >
              <FaGithub />
            </motion.a>

            <motion.a

              whileHover={{
                scale: 1.2,
                rotate: 10
              }}

              href="https://linkedin.com"

              className="text-blue-400"

            >
              <FaLinkedin />
            </motion.a>

          </div>

        </motion.div>

        {/* COPYRIGHT */}

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">

          <p>
            © 2026 SneakX. All Rights Reserved.
          </p>

          <p className="mt-3 text-gray-500">
            Designed & Developed by Shivamani Kotagiri
          </p>

        </div>

      </div>

    </footer>

  )
}

export default Footer