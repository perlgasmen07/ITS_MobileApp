import { TouchableOpacity, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const LogoutButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[containerStyles, { alignSelf: 'center' }, isLoading ? { opacity: 0.5 } : null]} // Align button to center horizontally
        disabled={isLoading}
      >
        <LinearGradient
          colors={['#85EBFC', '#74ADFA']} // Example gradient colors
          start={{ x: 0, y: 0 }} // Gradient start point (left)
          end={{ x: 1, y: 0 }} // Gradient end point (right)
          style={{
            borderRadius: 8, // Adjust as needed
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%', // Adjust width to fill the parent container
            minWidth: 144, // Adjust minimum width to ensure button is usable
            minHeight: 42, // Adjust as needed
          }}
        >
          <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutButton;
