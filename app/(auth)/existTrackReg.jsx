import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, Image, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CameraView, Camera } from 'expo-camera/next';
import icons from '../../constants/icons';
import images from "../../constants/images";
import AddSubButton from '../../components/AddSubButton';
import HomeButton from '../../components/HomeButton';
import SaveButton from '../../components/SaveButton';
import EditButton from '../../components/EditButton';

export default function etr() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [itemReg, setItemReg] = useState({
    ID: '',
    NAME: '',
    TYPE: '',
    DESCRIPTION: '',
    BRAND: '',
    QUANTITY: '',

  });
  const [mediumNames, setMediumNames] = useState([]);
  const [creationDate, setCreationDate] = useState(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    const lines = data.split('\n');
    const newItemReg = { ...itemReg };

    lines.forEach(line => {
      if (line) {
        const [key, value] = line.split(': ');
        const trimmedKey = key?.trim().toUpperCase();
        const trimmedValue = value?.trim();

        if (trimmedKey && trimmedValue) {
          newItemReg[trimmedKey] = trimmedValue;
        }
      }
    });

    setItemReg(newItemReg);

    if (newItemReg.ID && newItemReg.TYPE && newItemReg.NAME) {
      // console.log('Scanned ID:', newItemReg.ID);
      // console.log('Scanned TYPE:', newItemReg.TYPE);
      // console.log('Scanned NAME:', newItemReg.NAME);
      fetchMediumNames(newItemReg.ID);
    } else {
      console.log('ID, TYPE, or NAME not found in the scanned data');
    }
  };

  const fetchMediumNames = async (id) => {
    try {
      const response = await fetch(`http://172.16.76.102:8080/inventory/itemMedium/itemId/${id}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Item mediums with the same ID:', data);
        //const itemMediumsMessage = data.map(itemMedium => `${itemMedium.MEDIUM_NAME}, ${itemMedium.MEDIUM_ID}`).join('\n');
        // Alert.alert('Item Mediums', itemMediumsMessage);
        const names = data.map(itemMedium => itemMedium.MEDIUM_NAME);
        setMediumNames(names);

        if (data.length > 0 && data[0].CREATED_DATE) {
          setCreationDate(data[0].CREATED_DATE);
        }
      } else {
        console.error('Failed to fetch item mediums:', data);
      }
    } catch (error) {
      console.error('Error fetching item mediums:', error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
            <Text style={styles.title}>Existing Tracked Regular Item</Text>
            <View style={styles.cameraContainer}>
              <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                  barcodeTypes: ["qr", "pdf417"],
                }}
                style={StyleSheet.absoluteFillObject}
              />
              {scanned && (
                <TouchableOpacity style={styles.tapAgainButton} onPress={() => setScanned(false)}>
                  <Text style={styles.tapAgainText}>Tap to Scan Again</Text>
                </TouchableOpacity>
              )}
              {!scanned && (
                <Text style={styles.initialScanText}>Scan QR Code</Text>
              )}
            </View>
            
            <View style={styles.photoContainer}>
              <Image 
                source={icons.box}
                style={styles.itemImg}
                resizeMode='contain' 
              />
            </View>
            
            <View style={styles.infoContainer}>
              {itemReg.ID || itemReg.NAME || itemReg.TYPE ||itemReg.BRAND || itemReg.DESCRIPTION || itemReg.TYPE || mediumNames.length > 0 || creationDate ? (
                <>
                  {itemReg.NAME && <Text style={styles.header}>Item Name: {itemReg.NAME}</Text>}
                  <Text style={styles.infoTitle}>Item ID:  {itemReg.ID && <Text style={styles.info}>{itemReg.ID}</Text>}</Text>
                  <Text style={styles.infoTitle}>Brand:  {itemReg.BRAND && <Text style={styles.info}>{itemReg.BRAND}</Text>}</Text>
                  <Text style={styles.infoTitle}>Type:  {itemReg.TYPE && <Text style={styles.info}>{itemReg.TYPE}</Text>}</Text>
                  <Text style={styles.infoTitle}>Description:  {itemReg.DESCRIPTION && <Text style={styles.info}>{itemReg.DESCRIPTION}</Text>}</Text>
                  
                  {creationDate && <Text style={styles.infoTitle}>Date Created: {new Date(creationDate).toLocaleDateString()}</Text>}
                  {mediumNames.length > 0 && (
                    <View style={styles.mediumsContainer}>
                      <Text style={styles.infoTitle}>Storage Mediums:</Text>
                      {mediumNames.map((name, index) => (
                        <Text key={index} style={styles.info}>• {name}</Text>
                      ))}
                    </View>
                  )}
                </>
              ) : null}
      {/* </View> */}

              <View style={styles.actionRow}>
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
                    <Text style={styles.dateMod}>
                      Last Date Modified:
                    </Text>
                  </View>
                </View>
                <EditButton
                  handlePress={() => router.push('/home')}
                />
              </View>

              <View style={styles.saveButtonContainer}>
                <SaveButton title="SAVE" />
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
  cameraContainer:{
    height:200,
    width: 340,
    flex: 0.8,
    justifyContent: 'center',
    position: 'relative',
    // margin: 30,
    marginBottom:20,
  },
  initialScanText: {
    position: 'absolute',
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tapAgainButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  tapAgainText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: '#ffff',
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

