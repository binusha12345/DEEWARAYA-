import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminEmergencies = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch emergencies (placeholder)
    setTimeout(() => {
      setEmergencies([
        {
          id: 1,
          boatName: 'Sea Star',
          owner: 'Kamal Perera',
          type: 'Engine Failure',
          location: 'Negombo Coast',
          status: 'active',
          time: '2 hours ago'
        },
        {
          id: 2,
          boatName: 'Ocean Rider',
          owner: 'Nimal Silva',
          type: 'Medical Emergency',
          location: 'Galle Harbor',
          status: 'active',
          time: '30 minutes ago'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/dw-admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading emergencies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/dw-admin/dashboard')}
                className="text-gray-600 hover:text-indigo-600"
              >
                ← Back
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                🚨 Emergency Management
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Alert Banner */}
        <div className="bg-red-500 text-white rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="text-4xl animate-pulse">🚨</div>
            <div>
              <h2 className="text-2xl font-bold">
                {emergencies.filter(e => e.status === 'active').length} Active Emergencies
              </h2>
              <p className="text-red-100">
                Immediate action required
              </p>
            </div>
          </div>
        </div>

        {/* Emergencies List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold text-gray-800">
              Active Emergencies
            </h3>
          </div>

          {emergencies.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-gray-500 text-lg">No active emergencies</p>
              <p className="text-gray-400 text-sm mt-2">All boats are safe!</p>
            </div>
          ) : (
            <div className="divide-y">
              {emergencies.map((emergency) => (
                <div 
                  key={emergency.id} 
                  className="p-6 hover:bg-red-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">🚤</span>
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">
                            {emergency.boatName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Owner: {emergency.owner}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Emergency Type</p>
                          <p className="font-semibold text-red-600">
                            ⚠️ {emergency.type}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="font-semibold">
                            📍 {emergency.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Reported</p>
                          <p className="font-semibold">
                            🕐 {emergency.time}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                        📞 Contact
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                        📍 Track
                      </button>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm">
                        ✅ Resolve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-3xl mb-3">🚁</div>
            <h4 className="font-bold text-gray-800">Dispatch Rescue</h4>
            <p className="text-sm text-gray-500 mt-1">
              Send rescue team to emergency location
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-3xl mb-3">📢</div>
            <h4 className="font-bold text-gray-800">Broadcast Alert</h4>
            <p className="text-sm text-gray-500 mt-1">
              Notify all boats in the area
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-3xl mb-3">🌊</div>
            <h4 className="font-bold text-gray-800">Weather Check</h4>
            <p className="text-sm text-gray-500 mt-1">
              View current weather conditions
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEmergencies;