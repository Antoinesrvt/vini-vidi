import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Image } from "react-native";
import { Globe, Plus, Calendar, MapPin, Users, MessageCircle, Heart, X, Video, PenLine } from "lucide-react-native";
import { router } from 'expo-router';
import { useLocation } from "@/context/location-context";
import { AnimatePresence, MotiView } from 'moti';

// Types
type Story = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: 'story' | 'memory';
  timestamp: string;
};

type Note = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  location: string;
  timestamp: string;
  likes: number;
  comments: number;
  hasLiked?: boolean;
};

type FeedEvent = {
  id: string;
  title: string;
  datetime: string;
  location: string;
  attendees: number;
  friendsGoing: number;
  type: 'meetup' | 'activity' | 'social';
};

type CreateOption = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
};

const MapScreen = () => {
  const { currentLocation } = useLocation();
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'notes' | 'events'>('all');
  const [feedData, setFeedData] = useState<{
    stories: Story[];
    notes: Note[];
    events: FeedEvent[];
  }>({
    stories: [],
    notes: [],
    events: [],
  });
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

  const createOptions: CreateOption[] = [
    {
      id: 'story',
      title: 'Create Story',
      description: 'Share a moment with your friends',
      icon: <Video className="w-5 h-5 text-white" />,
      action: () => {
        // Handle story creation
        setIsCreateMenuOpen(false);
      },
    },
    {
      id: 'event',
      title: 'Create Event',
      description: 'Plan a meetup or activity',
      icon: <Calendar className="w-5 h-5 text-white" />,
      action: () => {
        // Handle event creation
        setIsCreateMenuOpen(false);
      },
    },
    {
      id: 'note',
      title: 'Write Note',
      description: 'Share your thoughts or tips',
      icon: <PenLine className="w-5 h-5 text-white" />,
      action: () => {
        // Handle note creation
        setIsCreateMenuOpen(false);
      },
    },
  ];

  // Mock fetch data function
  const fetchFeedData = async () => {
    // Simulate API call
    const mockStories: Story[] = [
      {
        id: '1',
        userId: '1',
        userName: 'Sarah Parker',
        type: 'story',
        timestamp: '2h ago',
      },
      // Add more stories...
    ];

    const mockNotes: Note[] = [
      {
        id: '1',
        userId: '1',
        userName: 'Mike Chen',
        content: 'Found this amazing coffee shop in downtown! Must visit if you\'re around.',
        location: 'Central Park',
        timestamp: '3h ago',
        likes: 12,
        comments: 4,
        hasLiked: false,
      },
      {
        id: '2',
        userId: '2',
        userName: 'Emma Wilson',
        content: 'Perfect spot for sunset views of the city skyline.',
        location: 'Brooklyn Bridge Park',
        timestamp: '5h ago',
        likes: 24,
        comments: 8,
        hasLiked: true,
      },
    ];

    const mockEvents: FeedEvent[] = [
      {
        id: '1',
        title: "Weekend City Walk",
        datetime: "Tomorrow, 3 PM",
        location: "Central Park",
        attendees: 15,
        friendsGoing: 3,
        type: 'activity',
      },
    ];

    setFeedData({
      stories: mockStories,
      notes: mockNotes,
      events: mockEvents,
    });
  };

  useEffect(() => {
    fetchFeedData();
  }, [currentLocation]); // Refetch when location changes

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchFeedData().finally(() => setRefreshing(false));
  }, []);

  return (
    <View className="flex-1 bg-white">
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="space-y-4">
          {/* Stories Section - Improved Design */}
          <View className="pt-4">
            <Text className="px-4 text-lg font-semibold text-slate-800 mb-3">
              Stories
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              className="px-4"
            >
              {feedData.stories.map((story, index) => (
                <TouchableOpacity
                  key={story.id}
                  className="mr-4 relative"
                  style={{ width: 85 }}
                >
                  {/* Story Container */}
                  <View className="relative">
                    <View className="w-[85px] h-[85px] rounded-xl bg-slate-200 overflow-hidden">
                      {story.userAvatar ? (
                        <Image 
                          source={{ uri: story.userAvatar }} 
                          className="w-full h-full"
                          style={{ resizeMode: 'cover' }}
                        />
                      ) : (
                        <View className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600" />
                      )}
                    </View>
                    {/* Gradient Overlay */}
                    <View className="absolute inset-0 bg-black/20 rounded-xl" />
                    {/* User Avatar */}
                    <View className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                      {story.userAvatar ? (
                        <Image 
                          source={{ uri: story.userAvatar }} 
                          className="w-full h-full"
                        />
                      ) : (
                        <View className="w-full h-full bg-slate-300" />
                      )}
                    </View>
                  </View>
                  {/* Username */}
                  <Text className="text-xs text-slate-600 mt-2 font-medium">
                    {story.userName}
                  </Text>
                  <Text className="text-xs text-slate-400">
                    {story.timestamp}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Map View */}
          <View className="px-4">
            <View className="bg-slate-100 h-64 rounded-xl items-center justify-center relative">
              <Globe className="w-12 h-12 text-slate-400" />
              {/* Quick Filters */}
              <View className="absolute bottom-4 left-4 right-4 flex-row gap-2">
                {['all', 'notes', 'events'].map((filter) => (
                  <TouchableOpacity 
                    key={filter}
                    onPress={() => setActiveFilter(filter as typeof activeFilter)}
                    className={`px-4 py-2 rounded-full ${
                      activeFilter === filter 
                        ? 'bg-blue-500' 
                        : 'bg-white'
                    } shadow-sm`}
                  >
                    <Text 
                      className={`text-sm capitalize ${
                        activeFilter === filter 
                          ? 'text-white' 
                          : 'text-slate-600'
                      }`}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Feed Section */}
          <View className="px-4 space-y-4">
            {/* Location Header */}
            <View className="flex-row items-center">
              <MapPin className="w-5 h-5 text-blue-500 mr-2" />
              <Text className="text-lg font-medium text-slate-800">
                Feed from {currentLocation.name}
              </Text>
            </View>

            {/* Notes */}
            {(activeFilter === 'all' || activeFilter === 'notes') && (
              <View className="space-y-4">
                {feedData.notes.map((note) => (
                  <View 
                    key={note.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200"
                  >
                    {/* Note Header */}
                    <View className="flex-row items-center mb-3">
                      <View className="w-10 h-10 rounded-full bg-slate-200 mr-3" />
                      <View className="flex-1">
                        <Text className="font-medium">{note.userName}</Text>
                        <Text className="text-xs text-slate-600">{note.timestamp}</Text>
                      </View>
                    </View>

                    {/* Note Content */}
                    <Text className="text-slate-800 mb-3">{note.content}</Text>

                    {/* Note Location */}
                    <View className="flex-row items-center mb-3">
                      <MapPin className="w-4 h-4 text-slate-400 mr-1" />
                      <Text className="text-sm text-slate-600">{note.location}</Text>
                    </View>

                    {/* Note Actions */}
                    <View className="flex-row items-center justify-between pt-3 border-t border-slate-200">
                      <TouchableOpacity 
                        className="flex-row items-center"
                        onPress={() => {/* Handle like */}}
                      >
                        <Heart 
                          className={`w-5 h-5 mr-1 ${note.hasLiked ? 'text-red-500' : 'text-slate-400'}`}
                          fill={note.hasLiked ? '#ef4444' : 'none'}
                        />
                        <Text className="text-sm text-slate-600">{note.likes}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-row items-center">
                        <MessageCircle className="w-5 h-5 text-slate-400 mr-1" />
                        <Text className="text-sm text-slate-600">{note.comments}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Events */}
            {(activeFilter === 'all' || activeFilter === 'events') && (
              <View className="space-y-4">
                {feedData.events.map((event) => (
                  <TouchableOpacity
                    key={event.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200"
                    onPress={() => router.push({
                      pathname: '/(app)/(protected)/event/[id]',
                      params: { id: event.id }
                    })}
                  >
                    <View className="flex-row justify-between items-start mb-2">
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
                      <View className="bg-blue-50 px-2 py-1 rounded-full">
                        <Text className="text-xs text-blue-600 capitalize">{event.type}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button and Menu */}
      <View className="absolute right-0 bottom-0 p-4">
        <AnimatePresence>
          {isCreateMenuOpen && (
            <View className="absolute right-4 bottom-20 w-64">
              <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-xl p-2"
              >
                {createOptions.map((option, index) => (
                  <TouchableOpacity
                    key={option.id}
                    onPress={option.action}
                    className="flex-row items-center p-3 rounded-xl active:bg-slate-100"
                  >
                    <View className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center mr-3">
                      {option.icon}
                    </View>
                    <View className="flex-1">
                      <Text className="font-medium text-slate-900">
                        {option.title}
                      </Text>
                      <Text className="text-xs text-slate-500">
                        {option.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </MotiView>
            </View>
          )}
        </AnimatePresence>

        <TouchableOpacity
          onPress={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
          className={`w-14 h-14 rounded-full shadow-lg items-center justify-center ${
            isCreateMenuOpen ? 'bg-slate-800' : 'bg-blue-500'
          }`}
        >
          {isCreateMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Plus className="w-6 h-6 text-white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen;
