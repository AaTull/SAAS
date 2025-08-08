import React from "react";

function Header({ hotel }) {
    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-3 py-3 sm:px-4 sm:py-4 flex items-center justify-between">
                {/* Hotel Info */}
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900 leading-tight">
                        {hotel.name}
                    </span>
                    <span className="text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        {hotel.location}
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        ⭐ {hotel.rating}
                    </span>
                </div>

                {/* HungryScan Logo */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-green-50 px-4 py-2 rounded-full border border-amber-100">
                    <img
                        src="/images/hungryscan.png"
                        alt="HungryScan"
                        className="w-8 h-8 object-contain"
                    />
                    <span className="text-xs font-semibold text-gray-700 hidden sm:block">
                        Powered by HungryScan
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Header;
