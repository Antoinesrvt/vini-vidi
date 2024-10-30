import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image, Heart } from "lucide-react-native";

const MemoriesScreen = () => {
  return (
    <ScrollView className="bg-white p-4 space-y-4">
      {/* Memory Types */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
        {["All", "Photos", "Stories", "Notes"].map((type) => (
          <TouchableOpacity key={type} className="px-4 py-2 bg-slate-100 rounded-full">
            <Text className="text-sm">{type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Memory Grid */}
      <View className="flex-row flex-wrap justify-between">
        {[1, 2, 3, 4].map((i) => (
          <View key={i} className="w-[48%] mb-4">
            <View className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative">
              <Image className="w-8 h-8 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <View className="absolute bottom-2 right-2">
                <Heart className="w-5 h-5 text-white" />
              </View>
            </View>
            <Text className="text-sm text-slate-600 mt-2">Paris, France</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MemoriesScreen;
