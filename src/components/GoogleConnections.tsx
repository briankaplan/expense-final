import { useEffect, useState } from 'react';
import { GoogleAuthButton } from './GoogleAuthButton';
import { useToast } from './ui/use-toast';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';

interface ConnectionStatus {
  gmail?: {
    connected: boolean;
    email?: string;
  };
  photos?: {
    connected: boolean;
    email?: string;
  };
}

export function GoogleConnections() {
  const [status, setStatus] = useState<ConnectionStatus>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check connection status on mount and when URL params change
  useEffect(() => {
    const checkStatus = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams(window.location.search);
        const service = params.get('service');
        const error = params.get('error');
        const authStatus = params.get('status');

        // Clear URL params
        if (service || error || authStatus) {
          window.history.replaceState({}, '', window.location.pathname);
        }

        // Show error toast if auth failed
        if (error) {
          toast({
            title: 'Authentication Failed',
            description: 'Failed to connect to Google service. Please try again.',
            variant: 'destructive'
          });
        }

        // Show success toast if auth succeeded
        if (service && authStatus === 'success') {
          toast({
            title: 'Connection Successful',
            description: `Successfully connected to ${service === 'gmail' ? 'Gmail' : 'Google Photos'}.`,
            variant: 'default'
          });
        }

        // Check Gmail status
        const gmailResponse = await fetch('/api/auth/tokens?service=gmail&email=me');
        const gmailData = await gmailResponse.json();
        
        // Check Photos status
        const photosResponse = await fetch('/api/auth/tokens?service=photos&email=me');
        const photosData = await photosResponse.json();

        setStatus({
          gmail: {
            connected: gmailResponse.ok,
            email: gmailData.email
          },
          photos: {
            connected: photosResponse.ok,
            email: photosData.email
          }
        });
      } catch (error) {
        console.error('Error checking status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, [toast]);

  const handleDisconnect = async (service: 'gmail' | 'photos') => {
    try {
      const response = await fetch('/api/auth/tokens', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service,
          email: status[service]?.email
        })
      });

      if (!response.ok) {
        throw new Error('Failed to disconnect');
      }

      setStatus(prev => ({
        ...prev,
        [service]: { connected: false }
      }));

      toast({
        title: 'Disconnected',
        description: `Successfully disconnected from ${service === 'gmail' ? 'Gmail' : 'Google Photos'}.`,
        variant: 'default'
      });
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast({
        title: 'Error',
        description: 'Failed to disconnect. Please try again.',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Gmail Connection</h3>
        <div className="flex items-center gap-4">
          {status.gmail?.connected ? (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Connected as {status.gmail.email}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDisconnect('gmail')}
              >
                Disconnect
              </Button>
            </>
          ) : (
            <GoogleAuthButton
              service="gmail"
              onError={(error) => {
                toast({
                  title: 'Error',
                  description: error,
                  variant: 'destructive'
                });
              }}
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Google Photos Connection</h3>
        <div className="flex items-center gap-4">
          {status.photos?.connected ? (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Connected as {status.photos.email}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDisconnect('photos')}
              >
                Disconnect
              </Button>
            </>
          ) : (
            <GoogleAuthButton
              service="photos"
              onError={(error) => {
                toast({
                  title: 'Error',
                  description: error,
                  variant: 'destructive'
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
} 