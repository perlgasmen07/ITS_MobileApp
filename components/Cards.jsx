import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Card = ({ title, content, location, handlePress }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.card}
    >
      <LinearGradient
        colors={['#85EBFC', '#74ADFA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        {/* {location && <Text style={styles.location}>Location: {location}</Text>} */}
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
    color: '#222b3c',
  },
  content: {
    fontSize: 16,
    color: '#222b3c',
  },
  location: {
    fontSize: 16,
    color: '#222b3c',
    marginTop: 5,
  },
});

export default Card;
