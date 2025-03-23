import { FC } from "react";
import { Button } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Hero: FC = () => {
  return (
    <section className="h-screen bg-black flex flex-col items-center justify-center text-white text-center px-6">
      <motion.img
        src="/weboptim.png"
        alt="App Logo"
        className="w-40 h-50 "
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Welcome to WebOptim
      </motion.h1>
      <motion.p
        className="text-lg max-w-xl mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        WebOptim is your AI-powered website analyzer that helps you optimize
        performance, SEO, and accessibility in just a few clicks.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        {/* ScrollLink Button */}
        <Link to="main-section" smooth={true} duration={800}>
          <Button type="primary" size="large">
            Analyze My Website
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
