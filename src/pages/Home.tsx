
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import SheildButton from '@/components/SheildButton';
import { Shield, MapPin, Users, Bell, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      // Call to your backend API
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
      });
      
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const features: Feature[] = [
    {
      icon: <Shield className="h-8 w-8 text-sheild-purple" />,
      title: "SOS Emergency",
      description: "Send immediate alerts to emergency contacts and authorities",
      path: "/sos"
    },
    {
      icon: <MapPin className="h-8 w-8 text-sheild-purple" />,
      title: "Safe Navigation",
      description: "Find and share the safest routes to your destination",
      path: "/locate-me"
    },
    {
      icon: <Users className="h-8 w-8 text-sheild-purple" />,
      title: "Travel Partners",
      description: "Connect with verified companions traveling in the same direction",
      path: "/collab"
    },
    {
      icon: <Bell className="h-8 w-8 text-sheild-purple" />,
      title: "Safety Reports",
      description: "Check and report safety incidents in your area",
      path: "/safe-places"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sheild-darkblue to-black">
      {/* Header */}
      <header className="py-6 px-4 flex justify-between items-center">
        <Logo size="md" />
        <div>
          {isLoggedIn ? (
            <div className="flex space-x-3">
              <Link to="/profile">
                <SheildButton variant="secondary" size="sm">Profile</SheildButton>
              </Link>
              <SheildButton variant="primary" size="sm" onClick={handleLogout}>
                Logout
              </SheildButton>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link to="/login">
                <SheildButton variant="secondary" size="sm">Login</SheildButton>
              </Link>
              <Link to="/signup">
                <SheildButton variant="primary" size="sm">Sign Up</SheildButton>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center my-12 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Your Personal Safety Companion
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            SHEild provides tools and features designed to keep women safe in any situation
          </p>
          
          {isLoggedIn ? (
            <Link to="/sos">
              <SheildButton variant="danger" size="lg">
                <div className="flex items-center">
                  <Phone className="mr-2" size={20} />
                  Emergency SOS
                </div>
              </SheildButton>
            </Link>
          ) : (
            <Link to="/signup">
              <SheildButton variant="primary" size="lg">Get Started Now</SheildButton>
            </Link>
          )}
        </section>

        {/* Features Grid */}
        <section className="my-16">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Our Safety Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-sheild-darkblue/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-sheild-darkblue/60 transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <Link to={feature.path}>
                  <SheildButton variant="primary" size="sm">
                    Access Feature
                  </SheildButton>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Trust & Safety */}
        <section className="my-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Trust & Safety</h2>
          <p className="text-gray-300 mb-8">
            SHEild prioritizes your privacy and safety. All user data is encrypted, and your location is only shared when you choose to do so. Our verification system ensures all users are authenticated for a secure community.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo size="sm" />
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SHEild. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
