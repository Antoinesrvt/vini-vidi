import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';

export default function LocationView() {
  const { latitude, longitude, location } = useLocalSearchParams();

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
        <Text className="text-lg font-semibold">{location}</Text>
      </View>

      {/* Map */}
      <View className="flex-1">
        <MapView
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: Number(latitude),
            longitude: Number(longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: Number(latitude),
              longitude: Number(longitude),
            }}
          />
        </MapView>
      </View>
    </View>
  );
} 