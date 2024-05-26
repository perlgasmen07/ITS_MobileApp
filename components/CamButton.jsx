import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';


import icons from '../constants/icons';

const CamButton = ({ title, handlePress, containerStyles, textStyles, isLoading, iconname }) => {
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
      <LinearGradient
        colors={['#85EBFC', '#74ADFA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.buttonContainer,
          { minWidth: 320 }
        ]}
      >
        <Image
          source={icons[iconname]} // assuming icons.qrCode holds the image source
          style={styles.logo}
          resizeMode='contain' 
        />
        <Text style={[styles.buttonText, textStyles]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CamButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    minHeight: 150,
    flexDirection: 'column', // Ensure icon and text stack vertically
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // Text color
  },
  logo: {
    width: 100, // Adjust the width of the icon as needed
    height: 100, // Adjust the height of the icon as needed
    marginBottom: 1, // Spacing between icon and text
  },
});
