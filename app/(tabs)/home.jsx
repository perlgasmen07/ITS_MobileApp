import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { StyleSheet, SafeAreaView, View, Image, Dimensions, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import images from "../../constants/images";
import CamButton from '../../components/CamButton';

const Home = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <View style={styles.logoContainer}>
            <Image 
              source={images.logo2}
              style={styles.logo}
              resizeMode='contain' 
            />
          </View>

          <View style={styles.container1}>
            <CamButton
              title="Scan QR Code"
              iconname="qrcode"
              handlePress={() => router.push('/camScreen?scanType=qr')}
              containerStyles="mt-7"
            />

            <CamButton
              title="Scan Barcode"
              iconname="barcode"
              handlePress={() => router.push('/camScreen?scanType=barcode')}
              containerStyles="mt-100"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="bg-primary" style='light'/>
    </SafeAreaView>
  )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222b3c',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: height * 0.5,
  },
  logoContainer: {
    width: '100%',
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height / 50,
  },
  logo: {
    resizeMode: 'contain',
    width: '80%',
    height: '80%',
  }
});

export default Home;
