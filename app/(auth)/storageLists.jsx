import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import icons from '../../constants/icons';
import images from "../../constants/images";
import HomeButton from '../../components/HomeButton';
import Card from '../../components/Cards';
import { router } from 'expo-router';

const storageList = () => {
  const handlePress = () => {
    // Handle press action here
    console.log('Card pressed');
  };

  return (
    
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View>
            <View style={styles.logoContainer}>
              <Image 
                source={images.logo2}
                style={styles.logoPic}
                resizeMode='contain' 
              />
              <HomeButton
              style={styles.homeButton}
              handlePress={() => router.push('/home')}/>
            </View>
            {/* <Text>Some Other Component</Text> */}
            <View style={styles.titleArea}>
              <Text style={styles.title}>Storage Medium</Text>
            </View>

            <Card
                title="Storage"
                content="Storage ID"
                // onPress={handlePress}
                handlePress={() => router.push('/newItem')}
                style={styles.card1}
            />

        </View>
        </ScrollView>
    </SafeAreaView>

  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  titleArea:{
    marginLeft: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
  },
    container:{
        flex:1,
        backgroundColor:'#222b3c',
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        // width: '100%',
        // width:'60%',
        height: height * 0.16,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: height / 50,
        marginLeft: 50,
        // backgroundColor:'red'
      },
    logoPic: {
        resizeMode: 'contain',
        width: '90%',
        height: '90%',
        marginLeft: -90,
        marginRight: -50,
        // backgroundColor:'red'
    },
    homeButton:{
        marginLeft: 500,
      },

    });

export default storageList;
