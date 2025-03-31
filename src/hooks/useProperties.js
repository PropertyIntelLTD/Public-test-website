
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getProperties, subscribeToProperties } from '@/lib/supabase';

export function useProperties(filters = {}) {
  const [properties, setProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getProperties(filters);
        setProperties(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch properties. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToProperties((payload) => {
      if (payload.eventType === 'INSERT') {
        setProperties(prev => [...prev, payload.new]);
      } else if (payload.eventType === 'DELETE') {
        setProperties(prev => prev.filter(p => p.id !== payload.old.id));
      } else if (payload.eventType === 'UPDATE') {
        setProperties(prev => 
          prev.map(p => p.id === payload.new.id ? payload.new : p)
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, [JSON.stringify(filters)]);

  return { properties, loading };
}
