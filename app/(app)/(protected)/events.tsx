import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Search, MapPin, Users, Calendar, ArrowLeft, Filter } from "lucide-react-native";
import { router, useLocalSearchParams } from 'expo-router';

type Event = {
  id: string;
  title: string;
  datetime: string;
  location: string;
  city: string;
  attendees: number;
  friendsGoing: number;
  type: 'meetup' | 'activity' | 'social';
  description?: string;
};

const EventsScreen = () => {
  const { from } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState<string>('all');

  // Mock Data
  const events: Event[] = [
    {
      id: '1',
      title: "Traveler's Meetup",
      datetime: "Tomorrow, 7 PM",
      location: "Central Park",
      city: "New York",
      attendees: 24,
      friendsGoing: 5,
      type: 'meetup',
      description: "Join fellow travelers for an evening of sharing stories and experiences.",
    },
    // Add more events...
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
        <Text className="text-lg font-semibold">Events</Text>
      </View>

      {/* Search and Filter */}
      <View className="p-4 flex-row gap-2">
        <View className="flex-1 relative">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search events..."
            className="w-full p-3 pl-10 bg-slate-100 rounded-lg text-sm"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
        </View>
        <TouchableOpacity className="p-3 bg-slate-100 rounded-lg">
          <Filter className="w-5 h-5 text-slate-600" />
        </TouchableOpacity>
      </View>

      {/* Event Types - More compact and aesthetic */}
      <View className="px-4 mb-4">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="gap-2"
        >
          {['all', 'meetup', 'activity', 'social'].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setActiveType(type)}
              className={`py-1.5 px-3 rounded-full border ${
                activeType === type 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'border-slate-200'
              }`}
            >
              <Text 
                className={`text-sm capitalize ${
                  activeType === type 
                    ? 'text-blue-600' 
                    : 'text-slate-600'
                }`}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Events List */}
      <ScrollView className="flex-1 px-4">
        <View className="space-y-3 pb-4">
          {events.map((event) => (
            <TouchableOpacity
              key={event.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              onPress={() => router.push({
                pathname: '/(app)/(protected)/event/[id]',
                params: { id: event.id, from: 'events' }
              })}
            >
              {/* Event Image Placeholder */}
              <View className="h-32 bg-slate-100" />
              
              <View className="p-4">
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-1">
                    <Text className="text-lg font-medium text-slate-900">{event.title}</Text>
                    <View className="flex-row items-center mt-1">
                      <MapPin className="w-4 h-4 text-slate-400 mr-1" />
                      <Text className="text-sm text-slate-600">{event.location}, {event.city}</Text>
                    </View>
                  </View>
                  <View className="bg-blue-50 px-2 py-1 rounded-full">
                    <Text className="text-xs text-blue-600 capitalize">{event.type}</Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-slate-100">
                  <View className="flex-row items-center">
                    <Calendar className="w-4 h-4 text-slate-400 mr-1" />
                    <Text className="text-sm text-slate-600">{event.datetime}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Users className="w-4 h-4 text-blue-500 mr-1" />
                    <Text className="text-sm text-blue-600">
                      {event.friendsGoing} friends going
                    </Text>
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

export default EventsScreen; 