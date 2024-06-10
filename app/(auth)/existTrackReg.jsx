import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, StyleSheet, Dimensions, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import icons from '../../constants/icons';
import images from "../../constants/images";
import AddSubButton from '../../components/AddSubButton';
import HomeButton from '../../components/HomeButton';
import SaveButton from '../../components/SaveButton';
import DateField from '../../components/DateField';
import EditButton from '../../components/EditButton';
import { useRoute } from '@react-navigation/native';

const etr = () => {
  // Declare state variables for date
  const [creationDate, setCreationDate] = useState(null);
  const [modifiedDate, setModifiedDate] = useState(null);
  const route = useRoute();
  const { itemIdPass } = route.params;
  const [item, setItem] = useState({
    ID: '',
    NAME: '',
    TYPE: '',
    DESCRIPTION: '',
    BRAND: '',
    QUANTITY: '',
    LOCATION: '',
    PARENT_LOCATION:''
});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://192.168.1.235:8080/inventory/itemMedium/${itemIdPass}`);
        const data = await response.json();
  
        if (response.ok) {
          setItem(data);

        } else {
          console.error('Failed to fetch item:', data);
          setError('Failed to fetch item');
        }
      } catch (error) {
        console.error('Error fetching item:', error);
        setError('Error fetching item');
      } finally {
        setLoading(false);
      }
    };
  
    if (itemIdPass) {
      fetchItem(itemIdPass);
    } else {
      setLoading(false);
      setError('Invalid item ID');
    }
  }, [itemIdPass]);

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


  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

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

            {/* <Text style={styles.title1}>TRACKED REGULAR</Text> */}
            <Text style={styles.title1}>ITEM MEDIUM</Text>
            {/* <View style={styles.photoContainer}>
              <Image 
                source={icons.imagepic}
                style={styles.itemImg}
                resizeMode='contain' 
              />
            </View> */}
            <View style={styles.infoDeets}>
            {item && item.ITEM_MEDIUM_ID && <Text style={styles.header}>Item Medium: {item.ITEM_MEDIUM_ID}</Text>}
            {/* {item && item.TYPE && <Text style={styles.header}>Type: {item.TYPE}</Text>} */}
            <View style={styles.subDeet}>
              <Text style={styles.infoTitle}>Type: {item && item.TYPE && <Text style={styles.info}>{item.TYPE}</Text>}</Text>
            </View>
            
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Item ID: {item && item.ITEM.ITEM_ID && <Text style={styles.info}>{item.ITEM.ITEM_ID}</Text>}</Text>
              <Text style={styles.infoTitle}>Item Name: {item && item.ITEM.NAME && <Text style={styles.info}>{item.ITEM.NAME}</Text>}</Text>
              <Text style={styles.infoTitle}>Quantity: {item && item.QUANTITY && <Text style={styles.info}>{item.QUANTITY}</Text>}</Text>
              <Text style={styles.infoTitle}>Description: {item && item.ITEM.DESCRIPTION && <Text style={styles.info}>{item.ITEM.DESCRIPTION}</Text>}</Text>
              <Text style={styles.infoTitle}>Brand: {item && item.ITEM.BRAND && <Text style={styles.info}>{item.ITEM.BRAND}</Text>}</Text>
              <Text style={styles.infoTitle}>Date Created: {item && item.ITEM.CREATE_DATE && <Text style={styles.info}>{formatDate(item.ITEM.CREATE_DATE)}</Text>}</Text>
              <Text style={styles.infoTitle}>Last Date Modified: {item && item.ITEM.LAST_MODIFIED && <Text style={styles.info}>{formatDate(item.ITEM.LAST_MODIFIED)}</Text>}</Text>
            </View>

            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Medium ID: {item && item.MEDIUM.MEDIUM_ID && <Text style={styles.info}>{item.MEDIUM.MEDIUM_ID}</Text>}</Text>
              <Text style={styles.infoTitle}>Medium Name: {item && item.MEDIUM.NAME && <Text style={styles.info}>{item.MEDIUM.NAME}</Text>}</Text>
              <Text style={styles.infoTitle}>Description: {item && item.MEDIUM.DESCRIPTION && <Text style={styles.info}>{item.MEDIUM.DESCRIPTION}</Text>}</Text>
              <Text style={styles.infoTitle}>Location: {item && item.MEDIUM.PARENT_LOCATION.NAME && <Text style={styles.info}>{item.MEDIUM.PARENT_LOCATION.NAME}</Text>}</Text>
              <Text style={styles.infoTitle}>Date Created: {item && item.MEDIUM.CREATE_DATE && <Text style={styles.info}>{formatDate(item.MEDIUM.CREATE_DATE)}</Text>}</Text>
              <Text style={styles.infoTitle}>Last Date Modified: {item && item.MEDIUM.LAST_MODIFIED && <Text style={styles.info}>{formatDate(item.MEDIUM.LAST_MODIFIED)}</Text>}</Text>
              </View>

            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Date Created: {item && item.CREATE_DATE && <Text style={styles.info}>{formatDate(item.CREATE_DATE)}</Text>}</Text>
              <Text style={styles.infoTitle}>Last Date Modified: {item && item.LAST_MODIFIED && <Text style={styles.info}>{formatDate(item.LAST_MODIFIED)}</Text>}</Text>
            </View>
              <View style={styles.infoDeets}>
                {item && item.MEDIUMS && item.MEDIUMS.length > 0 && (
                  <View style={styles.mediumsContainer}>
                    <Text style={styles.infoTitle}>Storage Mediums:</Text>
                    {item.MEDIUMS.map((medium, index) => (
                      <View key={index} style={styles.mediumItem}>
                        <Text style={styles.info}>• {medium.MEDIUM_NAME} ({medium.LOCATION_NAME})</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.editBtn}>
                <EditButton handlePress={() => router.push('/editETR')}/>
              </View>

              {/* <View style={styles.actionRow}>
                <View style={styles.numberEditContainer}>
                  <View style={styles.numberEdit}>
                    <AddSubButton
                      title="-"
                      handlePress={() => router.push('/sign-in')}
                    />
                    <TextInput
                      style={styles.textInput}
                      keyboardType="numeric"
                      // value={number.toString()}
                      // onChangeText={text => setNumber(parseInt(text))}
                    />
                    <AddSubButton
                      title="+"
                      handlePress={() => router.push('/sign-in')}
                    />
                  </View>
                  <View style={styles.lastModifiedDate}>
                    <Text style={styles.dateMod}>Last Date Modified: {item && item.LAST_MODIFIED && <Text style={styles.dateMod}>{formatDate(item.LAST_MODIFIED)}</Text>}</Text>
                  </View>
                </View>
                <EditButton
                  handlePress={() => router.push('/editETR')}
                />
              </View>
        
              <View style={styles.saveButtonContainer}>
                <SaveButton title="SAVE" />
              </View> */}
 
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
  subDeet:{
    marginTop: -5
  },
  itemContainer:{
    marginTop: 20
  },
  editBtn:{
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
    marginTop: 15
  },
  title1: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 1,
    fontFamily: 'Poppins-Bold'
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: height / 20,
    fontFamily: 'Poppins-Bold'
  },
  saveButtonContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  bottomBtn:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'orange',
    width: 350
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
    marginTop: -10,
    backgroundColor:'#222b3c',
    padding: 20,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
    marginTop: 20,
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
    width: '80%',
    height: '80%',
  },
  header:{
    color: '#ffff',
    fontFamily: "Poppins-SemiBold",
    fontSize: 25,
    marginBottom: 10,
  },
  customSave: {
    width: 350,
    height:60,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  infoContainer:{
    width: width/1.3,
    color: '#ffff',
    fontFamily:"Poppins-Regular",
    fontSize: 15,
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
    alignItems: 'left',
    // backgroundColor:'orange',
    width: '80%',
    marginTop: 35
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop:20
  },
  numberEdit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberEditContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    marginRight: 10,
  },
  lastModifiedEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  textInput: {
    height: 40,
    width: 150,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
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
  dateMod:{
    color: '#fff',
    fontSize: 15,
    fontStyle: 'italic',
    marginTop: 10,
  },
  mainContainer:{
    flexDirection: 'column',
    alignItems: 'center',
  },
  subContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButtonContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  dateChild:{
    flexDirection: 'column',
    alignItems: 'center',
  },
  dateParent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 20,
  },
})

export default etr;
