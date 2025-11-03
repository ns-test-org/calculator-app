import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          🎮 Game Hub 🎮
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Choose your adventure! Play games and use tools.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ludo Game Card */}
          <Link href="/ludo" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <div className="text-6xl mb-4">🎲</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Ludo Game</h2>
              <p className="text-gray-600 mb-4">
                Classic board game for 2-4 players. Roll the dice, move your pieces, and race to the center!
              </p>
              <div className="flex justify-center space-x-2 mb-4">
                <span className="text-2xl">🔴</span>
                <span className="text-2xl">🔵</span>
                <span className="text-2xl">🟢</span>
                <span className="text-2xl">🟡</span>
              </div>
              <div className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold group-hover:bg-blue-600 transition-colors">
                Play Ludo
              </div>
            </div>
          </Link>

          {/* Calculator Card */}
          <Link href="/calculator" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <div className="text-6xl mb-4">🧮</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Calculator</h2>
              <p className="text-gray-600 mb-4">
                A sleek, modern calculator for all your mathematical needs. Perfect for quick calculations!
              </p>
              <div className="flex justify-center space-x-2 mb-4">
                <span className="text-lg">➕ ➖ ✖️ ➗</span>
              </div>
              <div className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold group-hover:bg-green-600 transition-colors">
                Use Calculator
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-gray-500">
          <p>More games and tools coming soon! 🚀</p>
        </div>
      </div>
    </div>
  );
}
