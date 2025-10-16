'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { enableNetwork } from 'firebase/firestore';

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'failed'>('checking');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Simple connection test - just enable network
        await enableNetwork(db);
        setConnectionStatus('connected');
        console.log('✅ Firebase connection established');
      } catch (error: any) {
        setConnectionStatus('failed');
        setError(error.message);
        console.error('❌ Failed to connect to Firebase:', error);
      }
    };

    testConnection();
  }, []);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'checking': return 'text-yellow-500';
      case 'connected': return 'text-green-500';
      case 'failed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'checking': return '🔄';
      case 'connected': return '✅';
      case 'failed': return '❌';
      default: return '⚪';
    }
  };

  const getStatusMessage = () => {
    switch (connectionStatus) {
      case 'checking': return 'Testing Firebase connection...';
      case 'connected': return 'Firebase connection successful!';
      case 'failed': return `Connection failed: ${error}`;
      default: return 'Unknown status';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Full Court Analytics</h1>
        
        {/* Database Connection Status */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Firebase Connection Test</h2>
          <div className={`text-lg ${getStatusColor()}`}>
            <span className="text-2xl mr-2">{getStatusIcon()}</span>
            {getStatusMessage()}
          </div>
          {connectionStatus === 'failed' && (
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry Connection
            </button>
          )}
        </div>

        {/* Next Steps */}
        {connectionStatus === 'connected' && (
          <div className="bg-green-900 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-2 text-green-300">✅ Ready for Next Steps</h3>
            <p className="text-sm text-green-200">
              Firebase is connected! You can now set up authentication and security rules.
            </p>
          </div>
        )}

        {/* Firebase Config Check */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Firebase Configuration</h2>
          <div className="text-sm text-left space-y-2">
            <div>
              <span className="text-gray-400">API Key:</span> 
              <span className={process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'text-green-500' : 'text-red-500'}>
                {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? ' ✅ Set' : ' ❌ Missing'}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Project ID:</span> 
              <span className={process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'text-green-500' : 'text-red-500'}>
                {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? ' ✅ Set' : ' ❌ Missing'}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Auth Domain:</span> 
              <span className={process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'text-green-500' : 'text-red-500'}>
                {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? ' ✅ Set' : ' ❌ Missing'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <div className="space-x-4">
            <Link href="/sign-in" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </Link>
            <Link href="/sign-up" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}