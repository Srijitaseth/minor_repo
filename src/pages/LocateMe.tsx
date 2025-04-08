
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import SheildButton from '@/components/SheildButton';
import { ArrowLeft, Search, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { type Map } from 'mapbox-gl';

// Replace with your mapbox key when using this component
const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN';  // You'll need to enter your token here or use env variables

interface ThreatSpot {
  id: string;
  location: string;
  riskLevel: string;
  details: string;
  incidents: number;
  timestamp: string;
}

const LocateMe = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedThreat, setSelectedThreat] = useState<ThreatSpot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (mapContainer.current) {
      // This would be the actual implementation with Mapbox
      // For this demo, we'll just simulate loading the map
      setIsLoading(false);
      
      // Get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            toast.error('Unable to get your location. Please enable location services.');
          }
        );
      } else {
        toast.error('Geolocation is not supported by your browser');
      }
    }
    
    // Cleanup function
    return () => {
      if (map.current) {
        // map.current.remove();
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    toast.info(`Searching for: ${searchQuery}`);
    // This would call your backend API to search for a location
  };

  const mockThreatSpot: ThreatSpot = {
    id: "1",
    location: "DC State Bar/Junkie",
    riskLevel: "High",
    details: "Recent incidents (Last 21 hours)",
    incidents: 3,
    timestamp: "2 hours ago"
  };

  const handleAnalyzeSafety = () => {
    setSelectedThreat(mockThreatSpot);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sheild-darkblue to-black flex flex-col">
      {/* Navigation */}
      <div className="flex justify-between items-center p-4">
        <Link to="/">
          <button className="text-white p-2 rounded-full hover:bg-white/10">
            <ArrowLeft size={20} />
          </button>
        </Link>
        <div className="flex items-center">
          <Logo size="sm" showText={false} />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4">
        {/* Location Search */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location..."
              className="w-full py-2 px-4 pl-10 bg-opacity-20 bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sheild-purple"
            />
            <Search size={18} className="text-gray-400 absolute left-3 top-2.5" />
          </div>
        </form>
        
        {/* Map */}
        <div className="flex-1 bg-slate-700 rounded-lg overflow-hidden relative mb-4">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sheild-purple"></div>
            </div>
          ) : (
            <>
              <div className="absolute top-2 right-2 z-10 flex space-x-2">
                <button className="bg-white text-black text-xs px-2 py-1 rounded flex items-center">
                  <Shield size={12} className="mr-1" /> Safe Spots
                </button>
                <button className="bg-white text-black text-xs px-2 py-1 rounded flex items-center">
                  <AlertTriangle size={12} className="mr-1" /> Risk Analyzer
                </button>
              </div>
              <div ref={mapContainer} className="w-full h-full">
                {/* This would be filled with the actual map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white bg-black bg-opacity-50 p-4 rounded-lg">
                    Map would display here with Mapbox integration.<br />
                    Current location: {currentLocation ? `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}` : 'Loading...'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Threat Information */}
        {selectedThreat && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedThreat.location}</h2>
                <div className="flex items-center mt-1">
                  <span className="text-red-400 mr-2">Risk Level: {selectedThreat.riskLevel}</span>
                  <span className="text-gray-300 text-sm">{selectedThreat.timestamp}</span>
                </div>
                <p className="text-gray-300 mt-2">{selectedThreat.details}</p>
                <p className="text-red-300 mt-1">Reported incidents: {selectedThreat.incidents}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Buttons */}
        <div className="flex space-x-3">
          <SheildButton onClick={handleAnalyzeSafety} fullWidth>
            Analyze Safety
          </SheildButton>
          <Link to="/safe-places" className="flex-1">
            <SheildButton variant="secondary" fullWidth>
              Find Safe Places
            </SheildButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocateMe;
