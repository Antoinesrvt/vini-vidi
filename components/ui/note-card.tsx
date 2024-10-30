import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { router } from 'expo-router';

type NoteCardProps = {
  note: {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    location: string;
    timestamp: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
};

export const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <View className="p-4 bg-slate-50 rounded-xl border border-slate-200">
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

      {/* Interactive Location */}
      <TouchableOpacity 
        onPress={() => router.push({
          pathname: '/(app)/(protected)/location-view',
          params: { 
            latitude: note.coordinates?.latitude || 40.7128,
            longitude: note.coordinates?.longitude || -74.0060,
            location: note.location 
          }
        })}
        className="flex-row items-center py-2 px-3 bg-blue-50 rounded-lg self-start"
      >
        <MapPin className="w-4 h-4 text-blue-500 mr-2" />
        <Text className="text-sm text-blue-600">{note.location}</Text>
      </TouchableOpacity>
    </View>
  );
}; 