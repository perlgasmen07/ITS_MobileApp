import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, TextInput,Dimensions, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import icons from '../../constants/icons';
import images from "../../constants/images";
import HomeButton from '../../components/HomeButton';
import { useRoute } from '@react-navigation/native';
import EditButton from '../../components/EditButton';
import SaveButton from '../../components/SaveButton';
import AddSubButton from '../../components/AddSubButton';

const storageMed = () => {
  const route = useRoute();
  const { mediumIdPass } = route.params;
  const [itemMediums, setItemMediums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemMediums = async () => {
      try {
        if (!mediumIdPass) {
          throw new Error('Invalid item ID');
        }
        const url = `http://192.168.254.109:8080/inventory/medium/${mediumIdPass}`;
        console.log('Fetching data from URL:', url); // Log the URL

        const response = await fetch(url);
        console.log('Response status:', response.status); // Log response status

        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data
        

        if (response.ok) {
          setItemMediums(data);
        } else {
          console.error('Failed to fetch item mediums:', data);
          setError('Failed to fetch item mediums');
        }
      } catch (error) {
        console.error('Error fetching item mediums:', error);
        setError(error.message || 'Error fetching item mediums');
      } finally {
        setLoading(false);
      }
    };

    fetchItemMediums();
  }, [mediumIdPass]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{error}</Text>
      </View>
    );
  }
  console.log('Rendering itemMediums:', itemMediums);


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


            <View style={styles.infoDeets}>
            {itemMediums.NAME && <Text style={styles.header}>Medium Name: {itemMediums.NAME}</Text>}
              <Text style={styles.infoTitle}>Medium ID: {itemMediums.MEDIUM_ID && <Text style={styles.info}>{itemMediums.MEDIUM_ID}</Text>}</Text>
              <Text style={styles.infoTitle}>Location: {itemMediums.PARENT_LOCATION.NAME && <Text style={styles.info}>{itemMediums.PARENT_LOCATION.NAME}</Text>}</Text>
              <Text style={styles.infoTitle}>Description: {itemMediums.DESCRIPTION && <Text style={styles.info}>{itemMediums.DESCRIPTION}</Text>}</Text>
              {/* {creationDate && <Text style={styles.infoTitle}>Creation Date: <Text style={styles.info}>{creationDate}</Text></Text>} */}
            </View>

            {/* <View style={styles.infoDeets}>
             {storedItems.length > 0 && ( 
               <View style={styles.mediumsContainer}>
                 <Text style={styles.infoTitle}>Stored Items:</Text>
                 {storedItems.map((item, index) => (
                   <View key={index} style={styles.mediumItem}>
                     <Text style={styles.info}>• {item.NAME} (ID: {item.ITEM_ID})</Text>
                   </View>
                 ))}
               </View> 
              )}
            </View> */}
      
              {/* <View style={styles.actionRow}>
                <View style={styles.numberEditContainer}>
                  <View style={styles.lastModifiedDate}>
                    <Text style={styles.dateMod}>Last Date Modified: </Text> */}
                    {/* {modifiedDate && <Text style={styles.dateMod}>Last Date Modified: <Text style={styles.dateMod}>{modifiedDate}</Text></Text>} */}
                  {/* </View>
                </View>
                <EditButton
                  handlePress={() => router.push('/storageEdit')}
                />
              </View> */}
      
              {/* <View style={styles.saveButtonContainer}>
                <SaveButton title="SAVE" />
              </View> */}
            

          </View>
        </ScrollView>
        <StatusBar backgroundColor="bg-primary" style='light'/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
  numberEditContainer: {
    flexDirection: 'column',
  },
  lastModifiedDate: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
    marginTop: 20,
  },
  infoDeets:{
    justifyContent:'space-evenly',
    marginBottom: 15,
    alignItems: 'left',
    // backgroundColor:'orange',
    width: '80%'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: height / 50,
  },
  container:{
    flex: 1,
    backgroundColor: '#222b3c',
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
    backgroundColor: 'orange',
    marginTop: -10,
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
  infoTitle:{
    color: '#ffff',
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
  info:{
    color: '#ffff',
    fontFamily:"Poppins-Regular",
    fontSize: 20
  },
  mediumIdText: {
    color: '#ffff',
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  infoContainer:{
    width: width / 1.3, 
    color: '#ffff',
    fontFamily: "Poppins-Regular",
    fontSize: 15,
  },
  flexColumn: {
    flexDirection: 'column',
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
  dateMod:{
    color: '#fff',
    fontSize: 15,
    fontStyle: 'italic',
    marginRight: 5,
  },
  saveButtonContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  noDataText: {
    color: '#ffff',
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  }
});

export default storageMed;