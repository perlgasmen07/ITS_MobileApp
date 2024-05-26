import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import icons from '../constants/icons';

const HomeButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
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
        <Image
          source={icons.home} // assuming icons.qrCode holds the image source
          style={styles.logo}
          resizeMode='contain' 
        />

    </TouchableOpacity>
  );
};

export default HomeButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginLeft: 60,
    // backgroundColor:'yellow'
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
  logo: {
    width: 70, // Adjust the width of the icon as needed
    height: 70, // Adjust the height of the icon as needed
    marginBottom: 1, // Spacing between icon and text
    
  },
});
