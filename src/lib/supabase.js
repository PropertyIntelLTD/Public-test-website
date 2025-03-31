
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cueqivujzvdghjgyqlak.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1ZXFpdnVqenZkZ2hqZ3lxbGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjkyMDksImV4cCI6MjA1ODc0NTIwOX0.5ttwFSlW4_4FKQCFjz--B2wu8JLMg8aWPGJvONBFfS0';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Properties
export const getProperties = async (filters = {}) => {
  let query = supabase
    .from('properties')
    .select('*');

  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  if (filters.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getPropertyById = async (id) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const createProperty = async (propertyData) => {
  const { data, error } = await supabase
    .from('properties')
    .insert([{ ...propertyData, updated_at: new Date() }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProperty = async (id, propertyData) => {
  const { data, error } = await supabase
    .from('properties')
    .update({ ...propertyData, updated_at: new Date() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteProperty = async (id) => {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

// Inquiries
export const createInquiry = async (inquiryData) => {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([inquiryData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getInquiries = async (propertyId) => {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('property_id', propertyId);

  if (error) throw error;
  return data;
};

// Real-time subscriptions
export const subscribeToProperties = (callback) => {
  const subscription = supabase
    .channel('properties')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'properties'
    }, callback)
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};

export const subscribeToInquiries = (propertyId, callback) => {
  const subscription = supabase
    .channel(`inquiries:${propertyId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'inquiries',
      filter: `property_id=eq.${propertyId}`
    }, callback)
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};
