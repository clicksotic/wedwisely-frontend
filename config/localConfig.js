// Local development configuration
// Update this file with your computer's IP address when developing

export const LOCAL_CONFIG = {
  // Set this to your computer's IP address
  // You can find this by running 'ipconfig' on Windows or 'ifconfig' on Mac/Linux
  LOCAL_IP: '192.168.1.100', // Change this to your actual IP
  
  // Port where your backend server is running
  PORT: 3000,
  
  // Enable/disable local development mode
  USE_LOCAL_IP: true,
};

// Helper function to get the full local URL
export const getLocalURL = () => {
  if (!LOCAL_CONFIG.USE_LOCAL_IP) {
    return 'http://localhost:3000';
  }
  return `http://${LOCAL_CONFIG.LOCAL_IP}:${LOCAL_CONFIG.PORT}`;
}; 