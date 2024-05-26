import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import icons from "../constants/icons";

const SaveButton = ({ title, onPress,handlePress, isLoading }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.container,
        isLoading ? { opacity: 0.5 } : null
      ]}>

      <LinearGradient
        colors={['#85EBFC', '#74ADFA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Image 
        source={icons.save}
        style={styles.save}
        resizeMode='contain' 
        />
        {/* <Text style={styles.buttonText}>{title}</Text> */}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden', // Ensure that the gradient doesn't overflow
    justifyContent: 'center',
    alignItems: 'center',
    // width: 100,
    // minHeight: 70,
    flexDirection: 'row', // Ensure icon and text stack vertically
    // marginBottom: 10,
    // marginTop: 10,
    margin:5,
  },
  gradient: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight:'bold',
    textAlign: 'center',
  },
  save:{
    width: 320,
    height: 50,
    padding: 10,
  }
});

export default SaveButton;
