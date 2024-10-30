import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, MapPin, } from 'lucide-react-native';
// import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '@/context/location-context';

type SuggestedLocation = {
  id: string;
  name: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export default function LocationPicker() {
  const { setCurrentLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const suggestedLocations: SuggestedLocation[] = [
    {
      id: '1',
      name: 'New York',
      country: 'United States',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    },
    // Add more suggestions
  ];

  const handleLocationSelect = (location: SuggestedLocation) => {
    setCurrentLocation({
      id: location.id,
      name: location.name,
      country: location.country,
    });
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4 border-b border-slate-200 flex-row items-center">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mr-3 p-2 -ml-2"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Choose Location</Text>
      </View>

      {/* Search */}
      <View className="p-4">
        <View className="relative">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search cities..."
            className="w-full p-3 pl-10 bg-slate-100 rounded-lg text-sm"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
        </View>
      </View>

      {/* Map Preview */}
      <View className="px-4 mb-4">
        <View className="h-48 rounded-xl overflow-hidden">
          {/* <MapView
            style={{ width: '100%', height: '100%' }}
            initialRegion={{
              latitude: 40.7128,
              longitude: -74.0060,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: 40.7128,
                longitude: -74.0060,
              }}
            />
          </MapView> */}
        </View>
      </View>

      {/* Suggested Locations */}
      <ScrollView className="flex-1 px-4">
        <Text className="text-sm font-medium text-slate-500 mb-2">
          Suggested Locations
        </Text>
        <View className="space-y-2">
          {suggestedLocations.map((location) => (
            <TouchableOpacity
              key={location.id}
              className="flex-row items-center p-3 bg-slate-50 rounded-lg"
              onPress={() => handleLocationSelect(location)}
            >
              <MapPin className="w-5 h-5 text-blue-500 mr-3" />
              <View>
                <Text className="font-medium text-slate-900">{location.name}</Text>
                <Text className="text-sm text-slate-600">{location.country}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
} 