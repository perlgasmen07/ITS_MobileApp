import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import icons from '../../constants/icons';
import images from "../../constants/images";
import AddSubButton from '../../components/AddSubButton';
import HomeButton from '../../components/HomeButton';
import SaveButton from '../../components/SaveButton';
import EditButton from '../../components/EditButton';

const storageMed = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.flex1} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.centeredContent}>
            <View style={styles.logoContainer}>
              <Image 
                source={images.logo2}
                style={styles.logoPic}
                resizeMode='contain' 
              />
              <HomeButton
                style={styles.homeButton}
                handlePress={() => router.push('/home')}
              />
            </View>
            <Text style={styles.title}>Existing Storage Medium</Text>
            <View style={styles.photoContainer}>
              <Image 
                source={icons.box}
                style={styles.itemImg}
                resizeMode='contain' 
              />
            </View>
            
            <View style={styles.infoContainer}>
              <Text style={styles.header}>Storage Name: </Text>
              <View style={styles.infoDeets}>
                <Text style={styles.info}>Storage ID: </Text>
                <Text style={styles.info}>Parent Storage ID: </Text>
                <Text style={styles.info}>Description: </Text>
                <Text style={styles.info}>Code: </Text>
              </View>

              <View style={styles.infoDeets}>
                <Text style={styles.infoType}>Date Created: </Text>
              </View>

              <View style={styles.actionRow}>
                <View style={styles.numberEditContainer}>
                  <View style={styles.lastModifiedDate}>
                    <Text style={styles.dateMod}>
                      Last Date Modified:
                    </Text>
                  </View>
                </View>
                <EditButton
                  handlePress={() => router.push('/storageEdit')}
                />
              </View>

              
            </View>
          </View>
        </ScrollView>
        <StatusBar backgroundColor="bg-primary" style='light'/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: height / 50,
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
  flex1: {
    flex: 1,
  },
  logoContainer: {
    height: height * 0.16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: height / 50,
    marginLeft: 50,
  },
  photoContainer: {
    width: 350,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height / 50,
    backgroundColor:'orange',
    marginTop: -10
  },
  logoPic: {
    resizeMode: 'contain',
    width: '90%',
    height: '90%',
    marginLeft: -90,
    marginRight: -50,
  },
  homeButton:{
    marginLeft: 500,
  },
  itemImg:{
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  header:{
    color: '#ffff',
    fontFamily: "Poppins-SemiBold",
    fontSize: 25,
    marginBottom: 10,
  },
  infoContainer:{
    width: width/1.3, 
    color: '#ffff',
    fontFamily:"Poppins-Regular",
    fontSize: 15,
  },
  info:{
    color: '#ffff',
    fontFamily:"Poppins-Regular",
    fontSize: 20
  },
  infoLoc:{
    color: '#ffff',
    fontFamily:"Poppins-Regular",
    fontSize: 20
  },
  infoType:{
    color: '#ffff',
    fontFamily:"Poppins-Regular",
    fontSize: 20
  },
  infoDeets:{
    justifyContent:'space-evenly',
    marginBottom: 15,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
    marginTop: 20,
  },
  numberEditContainer: {
    flexDirection: 'column',
  },
  numberEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    // backgroundColor: 'yellow'
  },
  textInput: {
    height: 40, 
    width: 150, 
    borderColor: '#fff', 
    borderWidth: 2, 
    borderRadius: 10, 
    color: '#fff', 
    fontSize: 20, 
    textAlign: 'center',
    
  },
  lastModifiedDate: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  dateMod:{
    color: '#fff',
    fontSize: 15,
    fontStyle: 'italic',
    marginRight: 5,
  },
  saveButtonContainer: {
    marginTop: 5,
    alignItems: 'center',
  }
})

export default storageMed;
