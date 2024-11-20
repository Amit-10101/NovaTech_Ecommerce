import React from 'react';
import {facebook, twitter, instagram} from '../assets/icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto flex flex-wrap justify-between items-start gap-10">
                <div className="flex flex-col items-start">
                    <a href="/">
                        {/*<img*/}
                        {/*    src={footerLogo}*/}
                        {/*    alt="NovaTech Footer Logo"*/}
                        {/*    width={200}*/}
                        {/*    height={60}*/}
                        {/*/>*/}
                        <div className="text-4xl font-bold text-white overflow-hidden" style={{width: 200, height: 60}}>
                            {/*NovaTech*/}
                            <img src={"/nova2.png"} alt={"NovaTech logo"} className={"object-cover h-full w-full"}/>
                        </div>
                    </a>
                    <p className="mt-6 leading-7 text-gray-400 max-w-sm">
                        Discover the latest in electronic & smart appliance technology with NovaTech. Shop for a wide
                        range of electronics, from smartphones to home appliances.
                    </p>
                    <div className="flex items-center gap-5 mt-8">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <img src={facebook} alt="Facebook" width={24} height={24}/>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <img src={twitter} alt="Twitter" width={24} height={24}/>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <img src={instagram} alt="Instagram" width={24} height={24}/>
                        </a>
                    </div>
                </div>
                <div className="flex flex-wrap gap-10">
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Company</h4>
                        <ul>
                            <li className="mb-2"><a href="/about" className="text-gray-400 hover:text-white">About
                                Us</a></li>
                            <li className="mb-2"><a href="/careers"
                                                    className="text-gray-400 hover:text-white">Careers</a></li>
                            <li className="mb-2"><a href="/contact" className="text-gray-400 hover:text-white">Contact
                                Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Support</h4>
                        <ul>
                            <li className="mb-2"><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
                            <li className="mb-2"><a href="/support" className="text-gray-400 hover:text-white">Customer
                                Support</a></li>
                            <li className="mb-2"><a href="/warranty"
                                                    className="text-gray-400 hover:text-white">Warranty</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Legal</h4>
                        <ul>
                            <li className="mb-2"><a href="/terms" className="text-gray-400 hover:text-white">Terms &
                                Conditions</a></li>
                            <li className="mb-2"><a href="/privacy" className="text-gray-400 hover:text-white">Privacy
                                Policy</a></li>
                            <li className="mb-2"><a href="/cookies" className="text-gray-400 hover:text-white">Cookie
                                Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-12 flex justify-between items-center text-gray-400">
                <p>&copy; 2024 NovaTech. All rights reserved.</p>
                <a href="/terms" className="hover:text-white">Terms & Conditions</a>
            </div>
        </footer>
    );
};

export default Footer;
