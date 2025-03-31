
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getInquiries, subscribeToInquiries } from '@/lib/supabase';

export function useInquiries(propertyId) {
  const [inquiries, setInquiries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);
        const data = await getInquiries(propertyId);
        setInquiries(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch inquiries. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToInquiries(propertyId, (payload) => {
      if (payload.eventType === 'INSERT') {
        setInquiries(prev => [...prev, payload.new]);
      } else if (payload.eventType === 'DELETE') {
        setInquiries(prev => prev.filter(i => i.id !== payload.old.id));
      } else if (payload.eventType === 'UPDATE') {
        setInquiries(prev => 
          prev.map(i => i.id === payload.new.id ? payload.new : i)
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, [propertyId]);

  return { inquiries, loading };
}
