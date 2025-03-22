"use client";

import { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Drawer } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Toggle Drawer
  const toggleDrawer = () => setOpen(!open);

  // FAQ Dropdown Menu
  const faqMenu = (
    <Menu className="bg-black text-white">
      <Menu.Item key="1">
        <Link href="/faq#question1">What is SEO?</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href="/faq#question2">How does AI optimize websites?</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link href="/faq#question3">How to improve my website ranking?</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 w-full bg-black text-white flex items-center justify-between px-6 py-4 z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          WebOptim
        </Link>

        {/* Center Menu (Hidden in Mobile) */}
        <div className="hidden md:flex space-x-8 text-sm">
          <Link href="/evaluate" className="hover:text-gray-200">
            Evaluate
          </Link>
          <Link href="/ask-ai" className="hover:text-gray-200">
            Ask AI
          </Link>
          <Link href="/contact" className="hover:text-gray-200">
            Contact Us
          </Link>
          {/* FAQ with Dropdown */}
          <Dropdown overlay={faqMenu} trigger={["hover"]}>
            <span className="cursor-pointer hover:text-gray-200">FAQ</span>
          </Dropdown>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleDrawer}
          className="md:hidden text-sm"
          animate={{ rotate: open ? 180 : 0 }}
        >
          {open ? <CloseOutlined /> : <MenuOutlined />}
        </motion.button>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        closable={false}
        onClose={toggleDrawer}
        open={open}
        className="bg-black text-white"
      >
        <div className="flex flex-col space-y-4 text-lg">
          <Link href="/evaluate" onClick={toggleDrawer}>
            Evaluate
          </Link>
          <Link href="/ask-ai" onClick={toggleDrawer}>
            Ask AI
          </Link>
          <Link href="/contact" onClick={toggleDrawer}>
            Contact Us
          </Link>
          {/* FAQ Dropdown inside Drawer */}
          <Dropdown overlay={faqMenu} trigger={["click"]}>
            <span className="cursor-pointer hover:text-gray-400">FAQ</span>
          </Dropdown>
        </div>
      </Drawer>
    </>
  );
}
