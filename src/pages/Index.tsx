
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import SheildButton from '@/components/SheildButton';
import { Shield, MapPin, Users, Bell, ArrowRight } from 'lucide-react';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    // If logged in, redirect to home
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-sheild-purple" />,
      title: "SOS Emergency",
      description: "Immediate alerts to emergency contacts",
    },
    {
      icon: <MapPin className="h-8 w-8 text-sheild-purple" />,
      title: "Safe Navigation",
      description: "Find the safest routes to your destination",
    },
    {
      icon: <Users className="h-8 w-8 text-sheild-purple" />,
      title: "Travel Partners",
      description: "Connect with verified companions",
    },
    {
      icon: <Bell className="h-8 w-8 text-sheild-purple" />,
      title: "Safety Reports",
      description: "Check and report safety incidents",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sheild-darkblue to-black flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-10">
          <Logo size="lg" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Your Personal Safety Companion
        </h1>
        
        <p className="text-gray-300 text-lg mb-10 max-w-md">
          SHEild provides tools and features designed to keep women safe in any situation
        </p>
        
        <div className="space-y-4 w-full max-w-xs">
          <SheildButton 
            onClick={() => navigate('/login')}
            fullWidth
            size="lg"
          >
            Login
          </SheildButton>
          
          <SheildButton 
            onClick={() => navigate('/signup')}
            variant="secondary"
            fullWidth
            size="lg"
          >
            Sign Up
          </SheildButton>
          
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center justify-center text-sheild-lightpurple hover:text-white transition-colors"
          >
            Continue as Guest
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="mt-16 grid grid-cols-2 gap-6 max-w-sm">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-2">{feature.icon}</div>
              <h3 className="text-white font-medium mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="py-4 text-center">
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SHEild Safety App</p>
      </footer>
    </div>
  );
};

export default Index;
