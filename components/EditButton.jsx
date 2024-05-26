import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import icons from '../constants/icons';

const EditButton = ({ title, handlePress, containerStyles, textStyles, isLoading, iconname }) => {
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
        //   { minWidth: 320 }
        ]}
      >
        <Image
          source={icons.edit} // assuming icons.qrCode holds the image source
          style={styles.editImg}
          resizeMode='contain' 
        />
        {/* <Text style={[styles.buttonText, textStyles]}>
          {title}
        </Text> */}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 63,
    flexDirection: 'column', // Ensure icon and text stack vertically
    // marginBottom: 10,
    // marginTop: 10,
  },
  editImg: {
    width: 30, // Adjust the width of the icon as needed
    height: 30, // Adjust the height of the icon as needed
    alignItems: 'center',
  },
});
