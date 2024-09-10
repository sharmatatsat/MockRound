import React, { useState } from 'react';
import { FaRocket, FaGraduationCap, FaLaptop, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import '../index.css';

const LandingPage = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const smoothScroll = (e, targetId) => {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    };

    const handleSignupClick = (path) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <div className="font-sans">
            {/* Navigation */}
            <nav className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">VidyarthiMitra</h1>
                    <ul className="flex space-x-4 items-center">
                        <li>
                            <a href="#features" onClick={(e) => smoothScroll(e, '#features')} className="hover:text-blue-200 transition duration-300">Features</a>
                        </li>
                        <li>
                            <a href="#about" onClick={(e) => smoothScroll(e, '#about')} className="hover:text-blue-200 transition duration-300">About</a>
                        </li>
                        <li>
                            <a href="#contact" onClick={(e) => smoothScroll(e, '#contact')} className="hover:text-blue-200 transition duration-300">Contact</a>
                        </li>
                        <li className="relative">
                            <button onClick={toggleDropdown} className="hover:text-blue-200 transition duration-300 focus:outline-none">
                                Sign in
                            </button>
                            {dropdownOpen && (
                                <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                                    <li className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                                        <button onClick={() => handleSignupClick('/student/login')} className="w-full text-left">Student</button>
                                    </li>
                                    <li className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                                        <button onClick={() => handleSignupClick('/student/login')} className="w-full text-left">College</button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Welcome to VidyarthiMitra</h1>
                    <p className="text-xl mb-8">Empowering students with cutting-edge educational technology</p>
                    <button className="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition duration-300 transform hover:scale-105">
                        Get Started
                    </button>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-100">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard icon={<FaRocket className="text-4xl text-blue-500" />} title="Fast Learning" description="Accelerate your learning with our innovative methods" />
                        <FeatureCard icon={<FaGraduationCap className="text-4xl text-green-500" />} title="Expert Tutors" description="Learn from industry professionals and academics" />
                        <FeatureCard icon={<FaLaptop className="text-4xl text-purple-500" />} title="Online Access" description="Study anytime, anywhere with our platform" />
                        <FeatureCard icon={<FaUsers className="text-4xl text-orange-500" />} title="Community" description="Join a vibrant community of learners" />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20">
                <div className="container mx-auto flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Students collaborating" className="rounded-lg shadow-lg" />
                    </div>
                    <div className="md:w-1/2 md:pl-12">
                        <h2 className="text-3xl font-bold mb-4">About VidyarthiMitra</h2>
                        <p className="text-gray-600 mb-6">
                            VidyarthiMitra is a cutting-edge edtech platform designed to revolutionize the way students learn. Our mission is to make quality education accessible to all, leveraging technology to create engaging and effective learning experiences.
                        </p>
                        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gray-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                    <form className="max-w-lg mx-auto">
                        <input type="text" placeholder="Your Name" className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />
                        <input type="email" placeholder="Your Email" className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />
                        <textarea placeholder="Your Message" rows="4" className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"></textarea>
                        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition duration-300">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 VidyarthiMitra. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="text-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
            <p className="text-gray-600 text-center">{description}</p>
        </div>
    );
};

export default LandingPage;
