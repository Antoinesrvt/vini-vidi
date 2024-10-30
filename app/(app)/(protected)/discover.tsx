import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import { Search, MapPin, Users, Calendar, ChevronRight, Globe } from "lucide-react-native";
import { router } from 'expo-router';

// Types
type Location = {
  id: string;
  city: string;
  country: string;
  friendsCount: number;
  eventsCount: number;
  imageUrl?: string;
};

type Event = {
  id: string;
  title: string;
  datetime: string;
  location: string;
  attendees: number;
  friendsGoing: number;
  type: 'meetup' | 'activity' | 'social';
};

const DiscoverScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Data
  const friendLocations: Location[] = [
    {
      id: '1',
      city: "Paris",
      country: "France",
      friendsCount: 15,
      eventsCount: 3,
    },
    {
      id: '2',
      city: "Tokyo",
      country: "Japan",
      friendsCount: 8,
      eventsCount: 2,
    },
    {
      id: '3',
      city: "New York",
      country: "USA",
      friendsCount: 12,
      eventsCount: 5,
    },
    {
      id: '4',
      city: "London",
      country: "UK",
      friendsCount: 10,
      eventsCount: 4,
    },
  ];

  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: "Traveler's Meetup",
      datetime: "Tomorrow, 7 PM",
      location: "Central Park",
      attendees: 24,
      friendsGoing: 5,
      type: 'meetup',
    },
    {
      id: '2',
      title: "City Photography Walk",
      datetime: "Saturday, 10 AM",
      location: "Brooklyn Bridge",
      attendees: 18,
      friendsGoing: 3,
      type: 'activity',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Search Bar */}
      <View className="p-4">
        <View className="relative">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Explore cities, events, and friends..."
            className="w-full p-3 pl-10 bg-slate-100 rounded-lg text-sm"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
        </View>
      </View>

      {/* Friend Locations Section */}
      <View className="mb-6">
        <View className="px-4 flex-row justify-between items-center mb-3">
          <View>
            <Text className="text-lg font-semibold text-slate-800">Friends Around the World</Text>
            <Text className="text-sm text-slate-500">Discover where your friends are</Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.push({
              pathname: '/(app)/(protected)/locations',
              params: { from: 'discover' }
            })}
            className="flex-row items-center"
          >
            <Text className="text-sm text-blue-600 mr-1">See All</Text>
            <ChevronRight className="w-4 h-4 text-blue-600" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-4"
        >
          {friendLocations.map((location) => (
            <TouchableOpacity
              key={location.id}
              className="mr-3 w-40"
              onPress={() => router.push({
                pathname: '/(app)/(protected)/location/[id]',
                params: { id: location.id, from: 'discover' }
              })}
            >
              <View className="bg-slate-100 h-48 rounded-xl p-4 justify-between">
                <View className="flex-row items-center">
                  <MapPin className="w-4 h-4 text-slate-600 mr-1" />
                  <Text className="font-medium text-slate-800">{location.city}</Text>
                </View>
                
                <View className="space-y-2">
                  <View className="flex-row items-center">
                    <Users className="w-4 h-4 text-blue-500 mr-1" />
                    <Text className="text-sm text-slate-600">
                      {location.friendsCount} friends here
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Calendar className="w-4 h-4 text-blue-500 mr-1" />
                    <Text className="text-sm text-slate-600">
                      {location.eventsCount} events
                    </Text>
                  </View>
                </View>
              </View>
              <Text className="text-sm text-slate-600 mt-2">{location.country}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Events Section */}
      <View className="px-4 mb-6">
        <View className="flex-row justify-between items-center mb-3">
          <View>
            <Text className="text-lg font-semibold text-slate-800">Events Near You</Text>
            <Text className="text-sm text-slate-500">Join your friends at these events</Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.push({
              pathname: '/(app)/(protected)/events',
              params: { from: 'discover' }
            })}
            className="flex-row items-center"
          >
            <Text className="text-sm text-blue-600 mr-1">See All</Text>
            <ChevronRight className="w-4 h-4 text-blue-600" />
          </TouchableOpacity>
        </View>

        <View className="space-y-3">
          {upcomingEvents.map((event) => (
            <TouchableOpacity 
              key={event.id}
              className="p-4 bg-slate-50 rounded-xl border border-slate-200"
              onPress={() => router.push({
                pathname: '/(app)/(protected)/event/[id]',
                params: { id: event.id, from: 'discover' }
              })}
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="font-medium text-slate-900">{event.title}</Text>
                  <View className="flex-row items-center mt-1">
                    <Calendar className="w-4 h-4 text-slate-400 mr-1" />
                    <Text className="text-sm text-slate-600">{event.datetime}</Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <MapPin className="w-4 h-4 text-slate-400 mr-1" />
                    <Text className="text-sm text-slate-600">{event.location}</Text>
                  </View>
                  <View className="flex-row items-center mt-2">
                    <Users className="w-4 h-4 text-blue-500 mr-1" />
                    <Text className="text-sm text-blue-600">
                      {event.friendsGoing} friends going
                    </Text>
                  </View>
                </View>
                <View className="bg-blue-100 px-3 py-1 rounded-full">
                  <Text className="text-sm text-blue-600">{event.type}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DiscoverScreen;
