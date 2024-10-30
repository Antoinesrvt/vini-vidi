import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Users, Calendar, Image as ImageIcon } from "lucide-react-native";

type LocationDetails = {
  id: string;
  city: string;
  country: string;
  friendsCount: number;
  eventsCount: number;
  postsCount: number;
  description: string;
  friends: Array<{
    id: string;
    name: string;
    status: string;
  }>;
  events: Array<{
    id: string;
    title: string;
    datetime: string;
  }>;
  posts: Array<{
    id: string;
    type: 'photo' | 'story';
    date: string;
  }>;
};

export default function LocationScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data - In real app, fetch based on id
  const location: LocationDetails = {
    id: id as string,
    city: "Paris",
    country: "France",
    friendsCount: 15,
    eventsCount: 3,
    postsCount: 45,
    description: "The City of Light, known for its stunning architecture and rich culture.",
    friends: [
      { id: '1', name: 'Sarah Parker', status: 'Living here' },
      { id: '2', name: 'John Doe', status: 'Visiting' },
    ],
    events: [
      { id: '1', title: "Eiffel Tower Meetup", datetime: "Tomorrow, 7 PM" },
      { id: '2', title: "Seine River Walk", datetime: "Saturday, 3 PM" },
    ],
    posts: [
      { id: '1', type: 'photo', date: '2 days ago' },
      { id: '2', type: 'story', date: 'Yesterday' },
    ],
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4 border-b border-slate-200 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </TouchableOpacity>
        <View>
          <Text className="text-xl font-semibold">{location.city}</Text>
          <Text className="text-sm text-slate-600">{location.country}</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Location Image/Map Placeholder */}
        <View className="h-48 bg-slate-100 items-center justify-center">
          <MapPin className="w-8 h-8 text-slate-400" />
        </View>

        {/* Stats */}
        <View className="flex-row justify-around py-4 border-b border-slate-200">
          <View className="items-center">
            <Text className="text-lg font-semibold text-blue-600">{location.friendsCount}</Text>
            <Text className="text-sm text-slate-600">Friends</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-semibold text-blue-600">{location.eventsCount}</Text>
            <Text className="text-sm text-slate-600">Events</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-semibold text-blue-600">{location.postsCount}</Text>
            <Text className="text-sm text-slate-600">Posts</Text>
          </View>
        </View>

        {/* Content Sections */}
        <View className="p-4 space-y-6">
          {/* Description */}
          <View>
            <Text className="text-sm text-slate-600">{location.description}</Text>
          </View>

          {/* Friends Section */}
          <View>
            <Text className="text-lg font-semibold mb-3">Friends Here</Text>
            <View className="space-y-3">
              {location.friends.map((friend) => (
                <TouchableOpacity 
                  key={friend.id}
                  className="flex-row items-center p-3 bg-slate-50 rounded-lg"
                >
                  <View className="w-12 h-12 rounded-full bg-slate-200 mr-3" />
                  <View>
                    <Text className="font-medium">{friend.name}</Text>
                    <Text className="text-sm text-slate-600">{friend.status}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Events Section */}
          <View>
            <Text className="text-lg font-semibold mb-3">Upcoming Events</Text>
            <View className="space-y-3">
              {location.events.map((event) => (
                <TouchableOpacity 
                  key={event.id}
                  className="flex-row items-center p-3 bg-slate-50 rounded-lg"
                >
                  <Calendar className="w-6 h-6 text-blue-500 mr-3" />
                  <View>
                    <Text className="font-medium">{event.title}</Text>
                    <Text className="text-sm text-slate-600">{event.datetime}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Posts Grid */}
          <View>
            <Text className="text-lg font-semibold mb-3">Recent Posts</Text>
            <View className="flex-row flex-wrap gap-2">
              {location.posts.map((post) => (
                <TouchableOpacity 
                  key={post.id}
                  className="w-[32%] aspect-square bg-slate-100 rounded-lg items-center justify-center"
                >
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 