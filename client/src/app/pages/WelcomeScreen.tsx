import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { motion } from "framer-motion";
import { GoogleOutlined, DownOutlined } from "@ant-design/icons";

export default function WelcomeScreen() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 1000); // Show buttons after 1 sec
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-black px-4">
            {/* Animated Logo and Title */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 1 }}
                className="flex flex-col items-center"
            >
                <img 
                    src="/weboptim.png" 
                    alt="Company Logo" 
                    className="w-32 md:w-48 mb-4"
                />
            </motion.div>

            {/* Animated Buttons */}
            {isVisible && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col items-center gap-3 w-full max-w-xs"
                >
                    <Button 
                        type="primary" 
                        size="large"
                        className="w-full"
                        style={{ backgroundColor: "white", color: "black", borderColor: "white" }} 
                        onClick={() => navigate("/home")}
                    >
                        Get Started
                    </Button>

                    {/* Google Sign-In Button */}
                    <Button 
                        type="default"
                        size="large"
                        className="flex items-center justify-center gap-2 w-full"
                        style={{ backgroundColor: "white", color: "black", borderColor: "white" }}
                        onClick={() => alert("Sign in with Google clicked")} // Replace with actual Google Auth
                    >
                        <GoogleOutlined />
                        Sign in with Google
                    </Button>

                    {/* More Options Button */}
                    <Button 
                        type="default"
                        size="large"
                        className="flex items-center justify-center gap-2 w-full"
                        style={{ backgroundColor: "white", color: "black", borderColor: "white" }}
                        onClick={() => navigate("/more-options")} // Replace with actual more options page
                    >
                        More options
                        <DownOutlined />
                    </Button>
                </motion.div>
            )}
        </div>
    );
}
