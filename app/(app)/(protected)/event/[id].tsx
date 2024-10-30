import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Users, Calendar, Share2, Heart } from "lucide-react-native";

type EventDetails = {
  id: string;
  title: string;
  datetime: string;
  location: string;
  city: string;
  description: string;
  attendees: number;
  friendsGoing: Array<{
    id: string;
    name: string;
    status: string;
  }>;
  type: 'meetup' | 'activity' | 'social';
  organizer: {
    name: string;
    role: string;
  };
};

export default function EventScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data - In real app, fetch based on id
  const event: EventDetails = {
    id: id as string,
    title: "Traveler's Meetup",
    datetime: "Tomorrow, 7 PM",
    location: "Central Park",
    city: "New York",
    description: "Join fellow travelers for an evening of sharing stories and experiences. We'll meet near the fountain and then find a nice spot to sit and chat.",
    attendees: 24,
    friendsGoing: [
      { id: '1', name: 'Sarah Parker', status: 'Going' },
      { id: '2', name: 'Mike Chen', status: 'Maybe' },
    ],
    type: 'meetup',
    organizer: {
      name: "John Smith",
      role: "Event Host",
    },
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4 border-b border-slate-200 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Share2 className="w-6 h-6 text-slate-600" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Event Header */}
        <View className="p-4 space-y-2">
          <View className="flex-row justify-between items-start">
            <Text className="text-2xl font-semibold flex-1">{event.title}</Text>
            <View className="bg-blue-100 px-3 py-1 rounded-full">
              <Text className="text-sm text-blue-600 capitalize">{event.type}</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Calendar className="w-4 h-4 text-slate-400 mr-2" />
            <Text className="text-slate-600">{event.datetime}</Text>
          </View>

          <View className="flex-row items-center">
            <MapPin className="w-4 h-4 text-slate-400 mr-2" />
            <Text className="text-slate-600">{event.location}, {event.city}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row px-4 gap-2 mb-4">
          <TouchableOpacity className="flex-1 bg-blue-500 p-3 rounded-lg items-center">
            <Text className="text-white font-medium">Join Event</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-12 bg-slate-100 rounded-lg items-center justify-center">
            <Heart className="w-6 h-6 text-slate-600" />
          </TouchableOpacity>
        </View>

        {/* Content Sections */}
        <View className="p-4 space-y-6">
          {/* Description */}
          <View>
            <Text className="text-lg font-semibold mb-2">About</Text>
            <Text className="text-slate-600 leading-5">{event.description}</Text>
          </View>

          {/* Organizer */}
          <View>
            <Text className="text-lg font-semibold mb-3">Organizer</Text>
            <View className="flex-row items-center p-3 bg-slate-50 rounded-lg">
              <View className="w-12 h-12 rounded-full bg-slate-200 mr-3" />
              <View>
                <Text className="font-medium">{event.organizer.name}</Text>
                <Text className="text-sm text-slate-600">{event.organizer.role}</Text>
              </View>
            </View>
          </View>

          {/* Friends Going */}
          <View>
            <Text className="text-lg font-semibold mb-3">Friends Going</Text>
            <View className="space-y-3">
              {event.friendsGoing.map((friend) => (
                <View key={friend.id} className="flex-row items-center p-3 bg-slate-50 rounded-lg">
                  <View className="w-12 h-12 rounded-full bg-slate-200 mr-3" />
                  <View className="flex-1">
                    <Text className="font-medium">{friend.name}</Text>
                    <Text className="text-sm text-slate-600">{friend.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Attendees Count */}
          <View className="flex-row items-center p-4 bg-slate-50 rounded-lg">
            <Users className="w-6 h-6 text-blue-500 mr-3" />
            <Text className="text-slate-600">
              <Text className="font-medium text-slate-900">{event.attendees} people</Text> are going to this event
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 