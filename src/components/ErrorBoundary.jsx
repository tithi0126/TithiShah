import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      isLocalStorageError: false
    };
  }

  static getDerivedStateFromError(error) {
    // Check if this is a localStorage-related error
    const isLocalStorageError = 
      error.message?.includes('localStorage') ||
      error.message?.includes('JSON.parse') ||
      error.message?.includes('Unexpected token') ||
      error.name === 'SyntaxError';
    
    return { 
      hasError: true, 
      error,
      isLocalStorageError
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // If it's a localStorage error, attempt to clear problematic data
    if (this.state.isLocalStorageError) {
      this.handleLocalStorageError();
    }
  }

  handleLocalStorageError = () => {
    try {
      // Clear potentially corrupted localStorage data
      const keysToCheck = ['theme', 'user-preferences', 'app-state'];
      keysToCheck.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            JSON.parse(value);
          } catch {
            console.warn(`Removing corrupted localStorage key: ${key}`);
            localStorage.removeItem(key);
          }
        }
      });
      
      console.info('localStorage cleanup completed');
    } catch (cleanupError) {
      console.error('Error during localStorage cleanup:', cleanupError);
    }
  };

  clearLocalStorageAndReload = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      const { isLocalStorageError, error } = this.state;
      
      return (
        <div className="error-boundary" style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ color: '#dc3545', marginBottom: '1rem' }}>
              {isLocalStorageError ? 'Configuration Error' : 'Something went wrong'}
            </h2>
            
            {isLocalStorageError ? (
              <div>
                <p style={{ marginBottom: '1rem', color: '#6c757d' }}>
                  There was an issue with your browser's local storage data. 
                  This usually happens when upgrading from an older version.
                </p>
                <p style={{ marginBottom: '2rem', color: '#6c757d' }}>
                  We can fix this by clearing your local preferences and restarting the application.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button 
                    onClick={this.clearLocalStorageAndReload}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    Clear Data & Restart
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    Just Refresh
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ marginBottom: '1rem', color: '#6c757d' }}>
                  We apologize for the inconvenience. Please refresh the page to try again.
                </p>
                {process.env.NODE_ENV === 'development' && (
                  <details style={{ marginBottom: '1rem', textAlign: 'left' }}>
                    <summary style={{ cursor: 'pointer', color: '#007bff' }}>Error Details</summary>
                    <pre style={{ 
                      backgroundColor: '#f8f9fa', 
                      padding: '1rem', 
                      borderRadius: '4px', 
                      overflow: 'auto',
                      fontSize: '0.875rem',
                      color: '#dc3545'
                    }}>
                      {error?.toString()}
                    </pre>
                  </details>
                )}
                <button 
                  onClick={() => window.location.reload()}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Refresh Page
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;