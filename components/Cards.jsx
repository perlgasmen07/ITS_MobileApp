import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Card = ({ title, content, onPress, handlePress }) => {
  // const [isPressed, setIsPressed] = useState(false);

  // const handlePressIn = () => {
  //   setIsPressed(true);
  // };

  // const handlePressOut = () => {
  //   setIsPressed(false);
  // };

  return (
    <TouchableOpacity
      onPress={handlePress}
      // onPressIn={handlePressIn}
      // onPressOut={handlePressOut}
      activeOpacity={0.7} // Set the opacity when pressed
      style={styles.card}
    >
      <LinearGradient
        colors={['#85EBFC', '#74ADFA']} // Define your gradient colors here
        start={{ x: 0, y: 0 }} // Gradient starts from the left
        end={{ x: 1, y: 0 }}   // Gradient ends on the right
        style={styles.gradient}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  gradient: {
    borderRadius: 8,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#222b3c', // Set title color to white
  },
  content: {
    fontSize: 16,
    color: '#222b3c',
    fontFamily: "Poppins-Medium",
  },
});

export default Card;
