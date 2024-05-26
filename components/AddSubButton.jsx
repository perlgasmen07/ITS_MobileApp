import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';


const AddSubButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.container,
        containerStyles,
        isLoading ? { opacity: 0.5 } : null
      ]}
      disabled={isLoading}
    >
        <Text style={[styles.buttonText, textStyles]}>
          {title}
        </Text>
    </TouchableOpacity>
  );
};

export default AddSubButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    minHeight: 40,
    flexDirection: 'column', // Ensure icon and text stack vertically
    // marginBottom: 10,
    // marginTop: 10,
    margin:5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A3447', // Text color
  },
});
