import React, { useState } from 'react'; // Import useState
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import icons from '../../constants/icons';
import images from "../../constants/images";
import AddSubButton from '../../components/AddSubButton';
import HomeButton from '../../components/HomeButton';
import SaveButton from '../../components/SaveButton';
import DateField from '../../components/DateField';

const etr = () => {
  // Declare state variables for date
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
              handlePress={() => router.push('/home')}/>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.header}>Item Name</Text>
              <TextInput
                style={styles.inputInfo}
              />
              <View style={styles.infoDeets}>
                <Text style={styles.info}>Item ID</Text>
                <TextInput
                style={styles.inputInfo}
                />
                <Text style={styles.info}>Brand</Text>
                <TextInput
                style={styles.inputInfo}
                />
                <Text style={styles.info}>Description</Text>
                <TextInput
                style={styles.inputInfo}
                />
                {/* <Text style={styles.info}>Code</Text>
                <TextInput
                style={styles.inputInfo}
                /> */}
              </View>

              <View style={styles.infoDeets}>
                <Text style={styles.infoLoc}>Medium</Text>
                <Text style={styles.infoLoc}>Medium ID</Text>
              </View>

              <View style={styles.infoDeets}>
                <Text style={styles.infoType}>Date Created: </Text>
                <Text style={styles.infoType}>Type: </Text>
                <Text style={styles.infoType}>Quantity Type: </Text>
                <Text style={styles.infoType}>Quantity: </Text>
              </View>

              <View style={styles.dateParent}>
                <View style={styles.dateChild}>
                  <Text style={styles.startCon}>Start of Consumption</Text>
                  {/* Pass date and setDate as props to DateField */}
                  <DateField value={startDate} onChangeText={setStartDate} />
                </View>

                <View style={styles.dateChild}>
                  <Text style={styles.endCon}>End of Consumption</Text>
                  <DateField value={endDate} onChangeText={setEndDate} />
                </View>
              </View>

              <View style={styles.parent}>
                <View style={styles.child}>
                  <View style={styles.inputRow}>
                    <View style={styles.numberEdit}>
                      <AddSubButton
                        title="-"
                        handlePress={() => router.push('/sign-in')}
                        containerStyles="mt-100"
                      />
                      <TextInput
                        style={{height: 40, width:150, borderColor: '#fff', borderWidth: 2, borderRadius:10, color: '#fff', fontSize:20, textAlign: 'center' }}
                        keyboardType="numeric"
                        // value={number.toString()}
                        // onChangeText={text => setNumber(parseInt(text))}
                      />
                      <AddSubButton
                        title="+"
                        handlePress={() => router.push('/sign-in')}
                        containerStyles="mt-100"
                      />
                    </View>
                  </View>

                  <View style={styles.lastParent}>
                    <View style={styles.lastModifiedDate}>
                      <Text style={styles.dateMod}>
                        Last Date Modified:
                      </Text>
                    </View>
                  </View>
                  
                </View>
                {/* <View style={styles.saveButton}> */}
                  <SaveButton title="SAVE" />
                {/* </View> */}

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
  header:{
    color: '#ffff',
    fontFamily: "Poppins-SemiBold",
    fontSize: 25,
    marginBottom: 10,
  },
  infoContainer:{
    width: width/1.3, // Adjust the width to match the logoContainer width
    color: '#ffff',
    fontFamily:"Poppins-Regular",
    fontSize: 15,
    //backgroundColor: 'pink'
  },
  inputInfo:{
    height: 40, 
    width:'100%', 
    borderColor: '#fff', 
    borderWidth: 2, 
    borderRadius:10, 
    color: '#fff', 
    fontSize:20, 
    textAlign: 'left',
    paddingLeft: 10, 
    marginBottom: 15,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop:20
  },
  numberEdit: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Align children along the cross axis (vertically)
    // backgroundColor: '#ffffff',
  },
  lastModifiedDate: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
    marginTop:-12,
    // backgroundColor:'orange',
    alignItems:'flex-start'
  },
  startCon:{
    color: '#ffff',
    fontFamily:"Poppins-Medium",
    fontSize: 15
  },
  endCon:{
    color: '#ffff',
    fontFamily:"Poppins-Medium",
    fontSize: 15
  },
  lastParent:{
    // backgroundColor: 'yellow',
    width:'80%'
  },
  dateMod:{
    color: '#fff',
    fontSize: 15,
    fontStyle: 'italic',
  },
  child:{
    flexDirection: 'column',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  parent:{
    flexDirection: 'row',
    justifyContent: 'center', // Add this line
  },
  saveButton: {
    marginLeft: 10, // Adjust the margin as needed
  },
  dateChild:{
    flexDirection: 'column',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  dateParent:{
    flexDirection: 'row',
    justifyContent: 'space-between', // Add this line
    marginBottom: 30, // Add margin bottom for spacing
    marginTop: 20, // Add margin top for spacing
  },
  
})

export default etr;
