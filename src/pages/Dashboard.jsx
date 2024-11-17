import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaEye,
  FaShoppingCart,
  FaStar,
  FaUsers,
  FaComments,
} from "react-icons/fa";

const DashboardScreen = () => {
  const navigate = useNavigate();
  const menuItems = [
    {
      title: "Manage Plants",
      icon: <FaLeaf size={40} />,
      screen: "/manage-plants",
      color: "bg-green-500",
    },
    {
      title: "View Plants",
      icon: <FaEye size={40} />,
      screen: "/view-plants",
      color: "bg-blue-500",
    },
    {
      title: "Orders",
      icon: <FaShoppingCart size={40} />,
      screen: "/order-details",
      color: "bg-orange-500",
    },
    {
      title: "Reviews",
      icon: <FaStar size={40} />,
      screen: "/reviews",
      color: "bg-yellow-500",
    },
    {
      title: "Customers",
      icon: <FaUsers size={40} />,
      screen: "/customers",
      color: "bg-purple-500",
    },
    {
      title: "Chat with Gemini",
      icon: <FaComments size={40} />,
      screen: "/chat-bot",
      color: "bg-green-400",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white py-6 px-4">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="text-3xl font-bold text-green-800 mb-5 text-center"
      >
        Dashboard
      </motion.h1>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
      >
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
            className={`flex flex-col items-center p-6 rounded-xl shadow-lg cursor-pointer ${item.color}`}
            onClick={() => navigate(item.screen)}
          >
            <motion.div
              className="mb-4 text-black"
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              {item.icon}
            </motion.div>
            <p className="text-white font-semibold text-lg">{item.title}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DashboardScreen;
