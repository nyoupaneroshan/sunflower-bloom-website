import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

const DatabaseStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error' | 'partial'>('checking');
  const [details, setDetails] = useState<string>('');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkDatabaseConnection = async () => {
    setStatus('checking');
    try {
      console.log('Checking MySQL database connection...');
      
      // Test multiple endpoints to see which ones work
      const endpoints = [
        { name: 'Notifications', path: '/api/notifications' },
        { name: 'Gallery', path: '/api/gallery' },
        { name: 'Hero', path: '/api/hero' },
        { name: 'Contact', path: '/api/contact' },
        { name: 'About', path: '/api/about' },
        { name: 'Facilities', path: '/api/facilities' },
        { name: 'Activities', path: '/api/activities' }
      ];
      
      const results = await Promise.allSettled(
        endpoints.map(async (endpoint) => {
          const response = await fetch(endpoint.path);
          const data = await response.json();
          return { ...endpoint, success: response.ok, data };
        })
      );
      
      const successful = results.filter(result => 
        result.status === 'fulfilled' && result.value.success
      ).length;
      
      const failed = results.filter(result => 
        result.status === 'rejected' || 
        (result.status === 'fulfilled' && !result.value.success)
      );
      
      if (successful === endpoints.length) {
        setStatus('connected');
        setDetails(`All ${endpoints.length} MySQL API endpoints working correctly`);
      } else if (successful > 0) {
        setStatus('partial');
        setDetails(`${successful}/${endpoints.length} endpoints working. Issues with: ${
          failed.map(f => f.status === 'fulfilled' ? f.value.name : 'Unknown').join(', ')
        }`);
      } else {
        setStatus('error');
        const firstError = failed[0];
        if (firstError.status === 'fulfilled') {
          setDetails(`MySQL database connection failed: ${firstError.value.data?.error || 'Unknown error'}`);
        } else {
          setDetails(`Network error: ${firstError.reason?.message || 'Cannot reach MySQL API'}`);
        }
      }
      
      setLastChecked(new Date());
      
    } catch (error) {
      console.error('MySQL database connection check failed:', error);
      setStatus('error');
      setDetails(`Connection check failed: ${error.message}`);
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    checkDatabaseConnection();
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />;
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'partial':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'checking':
        return 'border-blue-200 bg-blue-50';
      case 'connected':
        return 'border-green-200 bg-green-50';
      case 'partial':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'checking':
        return 'Checking MySQL Connection...';
      case 'connected':
        return 'MySQL Database Connected';
      case 'partial':
        return 'Partial MySQL Connection';
      case 'error':
        return 'MySQL Connection Failed';
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-gray-600" />
          <div>
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className="font-medium text-gray-800">{getStatusText()}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{details}</p>
            {lastChecked && (
              <p className="text-xs text-gray-500 mt-1">
                Last checked: {lastChecked.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={checkDatabaseConnection}
          disabled={status === 'checking'}
          className="p-2 text-gray-600 hover:bg-white rounded-lg transition-colors disabled:opacity-50"
          title="Refresh MySQL connection status"
        >
          <RefreshCw className={`w-4 h-4 ${status === 'checking' ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {status === 'connected' && (
        <div className="mt-3 text-xs text-green-700 bg-green-100 p-2 rounded">
          ✅ MySQL Database: {process.env.DB_DATABASE || 'sunflower'} @ {process.env.DB_HOST || 'localhost'}
        </div>
      )}
    </div>
  );
};

export default DatabaseStatus;