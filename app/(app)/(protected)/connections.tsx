import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import { Search, MessageCircle, Users, UserPlus, Filter, X } from "lucide-react-native";

// Types
type Friend = {
  id: string;
  name: string;
  location: string;
  status: string;
  avatar?: string;
  mutualFriends?: number;
};

type Group = {
  id: string;
  name: string;
  members: number;
  lastActive: string;
  avatar?: string;
};

const ConnectionsScreen = () => {
  // States
  const [activeTab, setActiveTab] = useState<'friends' | 'groups'>('friends');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Mock Data
  const friends: Friend[] = [
    {
      id: '1',
      name: "Sarah Parker",
      location: "Paris, France",
      status: "Nearby",
      mutualFriends: 12,
    },
    {
      id: '2',
      name: "Mike Chen",
      location: "Tokyo, Japan",
      status: "Active Now",
      mutualFriends: 8,
    },
  ];

  const groups: Group[] = [
    {
      id: '1',
      name: "Paris Explorers",
      members: 128,
      lastActive: "Active now",
    },
    {
      id: '2',
      name: "Digital Nomads",
      members: 356,
      lastActive: "Active 2h ago",
    },
  ];

  // Filter options
  const filterOptions = {
    location: ["Nearby", "Same Country", "International"],
    activity: ["Active Now", "Today", "This Week"],
    connection: ["Direct", "Mutual Friends"],
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Top Section with Tabs */}
      <View className="flex-row px-4 py-2 border-b border-slate-200">
        <TouchableOpacity 
          onPress={() => setActiveTab('friends')}
          className={`flex-1 py-2 ${activeTab === 'friends' ? 'border-b-2 border-blue-500' : ''}`}
        >
          <Text className={`text-center ${activeTab === 'friends' ? 'text-blue-500 font-medium' : 'text-slate-600'}`}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setActiveTab('groups')}
          className={`flex-1 py-2 ${activeTab === 'groups' ? 'border-b-2 border-blue-500' : ''}`}
        >
          <Text className={`text-center ${activeTab === 'groups' ? 'text-blue-500 font-medium' : 'text-slate-600'}`}>Groups</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filter Bar */}
      <View className="p-4 flex-row gap-2">
        <View className="flex-1 relative">
          <TextInput
            placeholder={activeTab === 'friends' ? "Search friends..." : "Search groups..."}
            className="w-full p-3 pl-10 bg-slate-100 rounded-lg text-sm"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
        </View>
        <TouchableOpacity 
          onPress={() => setShowFilterModal(true)}
          className="p-3 bg-slate-100 rounded-lg"
        >
          <Filter className="w-5 h-5 text-slate-600" />
        </TouchableOpacity>
      </View>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="px-4 mb-2"
        >
          {activeFilters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => toggleFilter(filter)}
              className="flex-row items-center bg-blue-100 rounded-full px-3 py-1 mr-2"
            >
              <Text className="text-blue-600 text-sm mr-1">{filter}</Text>
              <X className="w-4 h-4 text-blue-600" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Main Content */}
      <ScrollView className="flex-1 px-4">
        {activeTab === 'friends' ? (
          // Friends List
          <View className="space-y-3">
            {friends.map((friend) => (
              <TouchableOpacity 
                key={friend.id}
                className="flex-row items-center p-4 bg-slate-50 rounded-xl border border-slate-200"
              >
                <View className="w-14 h-14 rounded-full bg-slate-200 mr-4" />
                <View className="flex-1">
                  <Text className="font-medium text-slate-900">{friend.name}</Text>
                  <Text className="text-sm text-slate-600">{friend.location}</Text>
                  <View className="flex-row items-center mt-1">
                    <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                    <Text className="text-sm text-slate-600">{friend.status}</Text>
                    {friend.mutualFriends && (
                      <Text className="text-sm text-slate-600 ml-2">· {friend.mutualFriends} mutual friends</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity className="p-2">
                  <MessageCircle className="w-5 h-5 text-slate-400" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          // Groups List
          <View className="space-y-3">
            {groups.map((group) => (
              <TouchableOpacity 
                key={group.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200"
              >
                <View className="flex-row items-center">
                  <View className="w-14 h-14 rounded-xl bg-slate-200 mr-4" />
                  <View className="flex-1">
                    <Text className="font-medium text-slate-900">{group.name}</Text>
                    <Text className="text-sm text-slate-600">{group.members} members</Text>
                    <View className="flex-row items-center mt-1">
                      <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                      <Text className="text-sm text-slate-600">{group.lastActive}</Text>
                    </View>
                  </View>
                  <TouchableOpacity className="p-2 bg-blue-500 rounded-full">
                    <UserPlus className="w-5 h-5 text-white" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      {showFilterModal && (
        <View className="absolute inset-0 bg-black/50">
          <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-medium">Filters</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <X className="w-6 h-6 text-slate-600" />
              </TouchableOpacity>
            </View>
            
            {Object.entries(filterOptions).map(([category, options]) => (
              <View key={category} className="mb-6">
                <Text className="text-sm font-medium text-slate-900 mb-3 capitalize">{category}</Text>
                <View className="flex-row flex-wrap gap-2">
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => toggleFilter(option)}
                      className={`px-4 py-2 rounded-full border ${
                        activeFilters.includes(option)
                          ? 'bg-blue-500 border-blue-500'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <Text className={activeFilters.includes(option) ? 'text-white' : 'text-slate-600'}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default ConnectionsScreen;
