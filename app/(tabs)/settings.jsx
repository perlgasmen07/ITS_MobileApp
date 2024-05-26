import { StyleSheet, View, Text, SafeAreaView, Dimensions, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import images from "../../constants/images";
import LogoutButton from '../../components/LogoutButton';
import { router } from 'expo-router';

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.logoContainer}>
          <Image
            source={images.logo2}
            style={styles.logo}
            resizeMode='contain' 
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.header}>Settings</Text>
          <Text style={styles.info}>
          Created by: Ron, Currie, and Roey
          </Text>
          <Text style={styles.info}>
          Version 1.0.0
          </Text>
          <Text style={styles.info}>
          Created May 2024
          </Text>
        </View>

      </View>

      <LogoutButton
          style={styles.button}
          title="Logout"
          handlePress={() => router.push('/sign-in')}
          containerStyles={styles.button}
      />
        
      <StatusBar backgroundColor="bg-primary" style='light'/>
    </SafeAreaView>
  )
}

export default Settings

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#222b3c',
    justifyContent: 'space-between', // Align children with space between
  },
  infoContainer:{
    marginTop: height*0.09,
    marginLeft: width*0.15,
    // backgroundColor: '#ffff',
    width: width *0.92,
  },
  header:{
    color: '#ffff',
    fontFamily: "Poppins-SemiBold",
    fontSize: 30,
    marginBottom: 10,
  },
  info:{
    color: '#ffff',
    fontFamily:"Poppins-Regular",
    fontSize: 15
  },
  button:{
    width: 200,
    height: 50, // Adjust button height as needed
    // backgroundColor:'#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Center the button horizontally
    marginBottom: height / 50, // Add some margin at the bottom
  },
  logoContainer: {
    width: '100%',
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height / 50,
    // backgroundColor: '#fefefe',
  },
  logo: {
    resizeMode: 'contain',
    width: '80%',
    height: '80%',
  }
});
