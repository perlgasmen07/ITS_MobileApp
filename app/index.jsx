import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import images from "../constants/images"; // Corrected import statement
import CustomButton from '../components/SignButton';

export default function Home() {
  // const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image
            source={images.logo3}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Sign-in"
            handlePress={() => router.push('/sign-in')}
            // handlePress={() => navigation.navigate('Sign-in')}
            containerStyles={styles.button}
          />
        </View>
        <StatusBar backgroundColor="bg-primary" style='light'/>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222b3c',
  },
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.7, // 80% of the screen width
    aspectRatio: width * 0.5 * 1.5 / height, // Adjust aspect ratio dynamically
    marginBottom: height * 0.15, // 10% of the screen height
    marginTop: height * 0.01, // 20% of the screen height
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: height * 0.05, // 5% of the screen height
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
});
