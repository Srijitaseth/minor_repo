
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { toast } from 'sonner';
import { ArrowLeft, Phone, Map, Bell, User, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const SOSPage = () => {
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const handleSOSTrigger = async () => {
    if (isSending) return;
    
    setIsSending(true);
    toast.info('SOS signal activated');
    
    try {
      // Call to your backend API
      const response = await fetch('http://localhost:8080/api/sos/trigger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send SOS');
      }
      
      toast.success('SOS signal sent successfully. Help is on the way.');
    } catch (error) {
      console.error('SOS error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send SOS');
    } finally {
      setIsSending(false);
    }
  };

  const handleEmergencyCall = async () => {
    toast.info('Initiating emergency call...');
    
    try {
      // Call to your backend API
      await fetch('http://localhost:8080/api/sos/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
      });
      
      // In a real app, this would trigger a phone call
      toast.success('Connecting to emergency services...');
    } catch (error) {
      console.error('Emergency call error:', error);
      toast.error('Failed to connect emergency call');
    }
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
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {/* Side Navigation */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 space-y-6">
          <Link to="/profile">
            <button className="w-12 h-12 bg-sheild-darkblue rounded-full flex items-center justify-center text-white shadow-lg hover:bg-sheild-purple transition-colors">
              <User size={24} />
            </button>
          </Link>
          <Link to="/locate-me">
            <button className="w-12 h-12 bg-sheild-darkblue rounded-full flex items-center justify-center text-white shadow-lg hover:bg-sheild-purple transition-colors">
              <Map size={24} />
            </button>
          </Link>
          <Link to="/safe-places">
            <button className="w-12 h-12 bg-sheild-darkblue rounded-full flex items-center justify-center text-white shadow-lg hover:bg-sheild-purple transition-colors">
              <Shield size={24} />
            </button>
          </Link>
          <Link to="/collab">
            <button className="w-12 h-12 bg-sheild-darkblue rounded-full flex items-center justify-center text-white shadow-lg hover:bg-sheild-purple transition-colors">
              <Bell size={24} />
            </button>
          </Link>
          <button 
            onClick={handleEmergencyCall}
            className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition-colors"
          >
            <Phone size={24} />
          </button>
        </div>
        
        {/* SOS Button */}
        <button
          onClick={handleSOSTrigger}
          disabled={isSending}
          className={`w-36 h-36 md:w-48 md:h-48 rounded-full flex items-center justify-center text-white text-3xl font-bold ${isSending ? 'animate-pulse-slow bg-red-500' : 'bg-gradient-to-br from-red-500 to-purple-700 hover:from-red-600 hover:to-purple-800'} transition-all duration-300 shadow-xl`}
        >
          <div className="sos-pulse">SOS</div>
        </button>
        
        <p className="mt-6 text-gray-300 text-center max-w-sm">
          Press the SOS button to send an alert with your location to your emergency contacts and nearby authorities
        </p>
      </div>
    </div>
  );
};

export default SOSPage;
