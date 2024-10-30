import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Search, MapPin, Users, Calendar, ArrowLeft } from "lucide-react-native";
import { router, useLocalSearchParams } from 'expo-router';

type LocationWithDetails = {
  id: string;
  city: string;
  country: string;
  friendsCount: number;
  eventsCount: number;
  postsCount: number;
  friends: Array<{ id: string; name: string; }>;
};

const LocationsScreen = () => {
  const { from } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<'all' | 'friends' | 'events' | 'posts'>('all');

  // Mock Data
  const locations: LocationWithDetails[] = [
    {
      id: '1',
      city: "Paris",
      country: "France",
      friendsCount: 15,
      eventsCount: 3,
      postsCount: 45,
      friends: [
        { id: '1', name: 'Sarah Parker' },
        { id: '2', name: 'John Doe' },
      ],
    },
    // Add more locations...
  ];

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
        <Text className="text-lg font-semibold">Locations</Text>
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

      {/* Filters - More compact and aesthetic */}
      <View className="px-4 mb-4">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="gap-2"
        >
          {['all', 'friends', 'events', 'posts'].map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter as typeof activeFilter)}
              className={`py-1.5 px-3 rounded-full border ${
                activeFilter === filter 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'border-slate-200'
              }`}
            >
              <Text 
                className={`text-sm capitalize ${
                  activeFilter === filter 
                    ? 'text-blue-600' 
                    : 'text-slate-600'
                }`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Locations Grid */}
      <ScrollView className="flex-1 px-4">
        <View className="flex-row flex-wrap justify-between pb-4">
          {locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              className="w-[48%] mb-4"
              onPress={() => router.push({
                pathname: '/(app)/(protected)/location/[id]',
                params: { id: location.id, from: 'locations' }
              })}
            >
              {/* Location Image Placeholder */}
              <View className="h-32 bg-slate-100 rounded-t-xl" />
              
              <View className="p-3 bg-white border-x border-b border-slate-200 rounded-b-xl">
                <Text className="font-medium text-slate-900">{location.city}</Text>
                <Text className="text-xs text-slate-600 mb-2">{location.country}</Text>
                
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Users className="w-3 h-3 text-blue-500 mr-1" />
                    <Text className="text-xs text-slate-600">{location.friendsCount}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Calendar className="w-3 h-3 text-blue-500 mr-1" />
                    <Text className="text-xs text-slate-600">{location.eventsCount}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default LocationsScreen; 