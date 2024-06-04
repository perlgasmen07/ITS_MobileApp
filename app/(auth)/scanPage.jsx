import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, Image, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraView, Camera } from 'expo-camera/next';
import icons from '../../constants/icons';
import images from "../../constants/images";
import AddSubButton from '../../components/AddSubButton';
import HomeButton from '../../components/HomeButton';
import SaveButton from '../../components/SaveButton';
import EditButton from '../../components/EditButton';
import DateField from '../../components/DateField';

export default function scanPage() {
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
  const [mediumData, setMediumData] = useState([]);
  const [mediumType, setMediumType] = useState(null);
  const [storedItems, setStoredItems] = useState([]);
  const [creationDate, setCreationDate] = useState(null);
  const [modifiedDate, setModifiedDate] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Accessing camera
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  // Redirecting when button is clicked
  const handleRedirect = (inputId) => {
    if (itemReg && itemReg.TYPE) {
      const mediumId = itemReg.ID;
      const navigateTo = itemReg.TYPE === 'Item' ? `/storageLists?itemId=${inputId}` : `/itemLists?mediumId=${mediumId}`;
  
      router.push(navigateTo);
    }
  };

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
        if (newItemReg.TYPE === 'Item') {
            fetchMediumData(newItemReg.ID);
        } else if (newItemReg.TYPE === 'Storage Medium') {
            fetchItemsByMediumId(newItemReg.ID); // Fetch items stored in the medium
        }
    } else {
      console.log('ID, TYPE, or NAME not found in the scanned data');
    }
  };

  const fetchMediumData = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.235:8080/inventory/itemMedium/itemId/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        console.log(data);
        const formatDate = (dateString) => {
          if (!dateString) return null;
          const date = new Date(dateString);
          const month = ("0" + (date.getMonth() + 1)).slice(-2);
          const day = ("0" + date.getDate()).slice(-2);
          const year = date.getFullYear();
          return `${month}/${day}/${year}`;
        };
  
        const formattedData = data.map(item => ({
          ...item,
          CREATE_DATE: formatDate(item.CREATE_DATE),
          LAST_MODIFIED: formatDate(item.LAST_MODIFIED),
          MEDIUM_ID: item.MEDIUM_ID // Adding mediumId to the item object
        }));
  
        setMediumData(formattedData);
        if (formattedData.length > 0 && formattedData[0].CREATE_DATE) {
          setCreationDate(formattedData[0].CREATE_DATE);
        }
  
        // Set the modifiedDate state with the LAST_MODIFIED date of the first item
        if (formattedData.length > 0 && formattedData[0].LAST_MODIFIED) {
          setModifiedDate(formattedData[0].LAST_MODIFIED);
        }
  
        // Set the mediumType state with the type of the first medium
        if (formattedData.length > 0 && formattedData[0].TYPE) {
          setMediumType(formattedData[0].TYPE);
        }
  
      } else {
        console.error('Failed to fetch item mediums:', data);
      }
    } catch (error) {
      console.error('Error fetching item mediums:', error);
    }
  };
  

  const fetchItemsByMediumId = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.235:8080/inventory/itemMedium/mediumId/${id}`);
      const data = await response.json();
  
      if (response.ok) {
        setStoredItems(data);
      } else {
        console.error('Failed to fetch items by medium ID:', data);
      }
    } catch (error) {
      console.error('Error fetching items by medium ID:', error);
    }
  };
  

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const renderConditionalView = () => {
    if (itemReg.TYPE === 'Item') {
        if (mediumType === 'R'){
            return (
                <>
                <Text style={styles.title}>EXISTING REGULAR TRACKED ITEM</Text>
                    <View style={styles.photoContainer}>
                      <Image 
                        source={icons.imagepic}
                        style={styles.itemImg}
                        resizeMode='contain' 
                      />
                    </View>
                  {itemReg.NAME && <Text style={styles.header}>Item Name: {itemReg.NAME}</Text>}
                  <View style={styles.infoDeets}>
                    {/* <Text style={styles.infoTitle}>Item ID: {itemReg.ID && <Text style={styles.info}>{itemReg.ID}</Text>}</Text> */}
                    <Text style={styles.infoTitle}>Brand: {itemReg.BRAND && <Text style={styles.info}>{itemReg.BRAND}</Text>}</Text>
                    <Text style={styles.infoTitle}>Type: {itemReg.TYPE && <Text style={styles.info}>{itemReg.TYPE}</Text>}</Text>
                    <Text style={styles.infoTitle}>Description: {itemReg.DESCRIPTION && <Text style={styles.info}>{itemReg.DESCRIPTION}</Text>}</Text>
                    {/* <Text style={styles.infoTitle}>Quantity: {item && item.ITEM.QUANTITY && <Text style={styles.info}>{item.ITEM.QUANTITY}</Text>}</Text> */}
                    {/* {mediumType && <Text style={styles.infoTitle}>Item Medium Type: <Text style={styles.info}>{mediumType}</Text></Text>} */}
                    {creationDate && <Text style={styles.infoTitle}>Date Created: <Text style={styles.info}>{creationDate}</Text></Text>}
                    {modifiedDate && <Text style={styles.infoTitle}>Last Date Modified: <Text style={styles.info}>{modifiedDate}</Text></Text>}
                  </View>
                  <View style={styles.infoDeets}>
                    {mediumData.length > 0 && (
                      <View style={styles.mediumsContainer}>
                        <Text style={styles.infoTitle}>Storage Mediums:</Text>
                        {mediumData.map((medium, index) => (
                          <View key={index} style={styles.mediumItem}>
                            <Text style={styles.info}>• {medium.MEDIUM.NAME} ({medium.MEDIUM.PARENT_LOCATION.NAME})</Text>


                          </View>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* <View style={styles.actionRow}>
                        <View style={styles.numberEditContainer}>
                          <View style={styles.lastModifiedDate}>
                            {modifiedDate && <Text style={styles.dateMod}>Last Date Modified: <Text style={styles.dateMod}>{modifiedDate}</Text></Text>}
                          </View>
                        </View>
                        <EditButton
                          handlePress={() => router.push('/editItem')}
                        />
                  </View> */}
        
                      <View style={styles.bottomBtn}>
                        <EditButton
                            handlePress={() => router.push('/editItem')}
                          />
                        {/* <View style={styles.saveButtonContainer}>
                          <SaveButton style={styles.customSave} title="SAVE" />
                        </View> */}

                        <View style={styles.redirect}>
                          <TouchableOpacity style={styles.redirectButtonStore} onPress={() => handleRedirect(itemReg.ID)}>
                            <LinearGradient
                              colors={['#85EBFC', '#74ADFA']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.gradient}
                            >
                              <Text style={styles.redirectButtonText}>See Storage</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
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
                            {modifiedDate && <Text style={styles.dateMod}>Last Date Modified: <Text style={styles.dateMod}>{modifiedDate}</Text></Text>}
                          </View>
                        </View>
                        <EditButton
                          handlePress={() => router.push('/editETR')}
                        />
                      </View>
        
                    <View style={styles.bottomBtn}>
                      <View style={styles.saveButtonContainer}>
                        <SaveButton style={styles.customSave} title="SAVE" />
                      </View>

                      <View style={styles.redirect}>
                        <TouchableOpacity style={styles.redirectButton} onPress={() => handleRedirect(itemReg.ID)}>
                          <LinearGradient
                            colors={['#85EBFC', '#74ADFA']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}
                          >
                            <Text style={styles.redirectButtonText}>See Storage</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                  
                    </View> */}
                      
                </>
              );
        } else if (mediumType === 'U') {
            return (
                <>
                <Text style={styles.title}>EXISTING UNTRACKED ITEM</Text>
                    <View style={styles.photoContainer}>
                      <Image 
                        source={icons.imagepic}
                        style={styles.itemImg}
                        resizeMode='contain' 
                      />
                    </View>
                  {itemReg.NAME && <Text style={styles.header}>Item Name: {itemReg.NAME}</Text>}
                  <View style={styles.infoDeets}>
                    {/* <Text style={styles.infoTitle}>Item ID: {itemReg.ID && <Text style={styles.info}>{itemReg.ID}</Text>}</Text> */}
                    <Text style={styles.infoTitle}>Brand: {itemReg.BRAND && <Text style={styles.info}>{itemReg.BRAND}</Text>}</Text>
                    <Text style={styles.infoTitle}>Type: {itemReg.TYPE && <Text style={styles.info}>{itemReg.TYPE}</Text>}</Text>
                    <Text style={styles.infoTitle}>Description: {itemReg.DESCRIPTION && <Text style={styles.info}>{itemReg.DESCRIPTION}</Text>}</Text>
                    {/* {mediumType && <Text style={styles.infoTitle}>Item Medium Type: <Text style={styles.info}>{mediumType}</Text></Text>} */}
                    {creationDate && <Text style={styles.infoTitle}>Date Created: <Text style={styles.info}>{creationDate}</Text></Text>}
                    {modifiedDate && <Text style={styles.infoTitle}>Last Date Modified: <Text style={styles.info}>{modifiedDate}</Text></Text>}
                  </View>
                  <View style={styles.infoDeets}>
                    {mediumData.length > 0 && (
                      <View style={styles.mediumsContainer}>
                        <Text style={styles.infoTitle}>Storage Mediums:</Text>
                        {mediumData.map((medium, index) => (
                          <View key={index} style={styles.mediumItem}>
                            <Text style={styles.info}>• {medium.MEDIUM.NAME} ({medium.MEDIUM.PARENT_LOCATION.NAME})</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                  <View style={styles.bottomBtn}>
                        <EditButton
                            handlePress={() => router.push('/editItem')}
                          />
                        {/* <View style={styles.saveButtonContainer}>
                          <SaveButton style={styles.customSave} title="SAVE" />
                        </View> */}

                        <View style={styles.redirect}>
                          <TouchableOpacity style={styles.redirectButtonStore} onPress={() => handleRedirect(itemReg.ID)}>
                            <LinearGradient
                              colors={['#85EBFC', '#74ADFA']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.gradient}
                            >
                              <Text style={styles.redirectButtonText}>See Storage</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </View>
        
                  {/* <View style={styles.actionRow}>
                        <View style={styles.numberEditContainer}>
                          <View style={styles.lastModifiedDate}>
                            {modifiedDate && <Text style={styles.dateMod}>Last Date Modified: <Text style={styles.dateMod}>{modifiedDate}</Text></Text>}
                          </View>
                        </View>
                        <EditButton
                          handlePress={() => router.push('/editItem')}
                        />
                      </View>
        
                      <View style={styles.bottomBtn}>
                      <View style={styles.saveButtonContainer}>
                        <SaveButton style={styles.customSave} title="SAVE" />
                      </View>

                      <View style={styles.redirect}>
                        <TouchableOpacity style={styles.redirectButton} onPress={() => handleRedirect(itemReg.ID)}>
                          <LinearGradient
                            colors={['#85EBFC', '#74ADFA']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}
                          >
                            <Text style={styles.redirectButtonText}>See Storage</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                  
                    </View> */}
                  
                </>
              );
        } else {
            // IF (mediumType === 'C')
            return (
                <>
                <Text style={styles.title}>EXISTING CONSUMABLE TRACKED ITEM</Text>
                    <View style={styles.photoContainer}>
                      <Image 
                        source={icons.imagepic}
                        style={styles.itemImg}
                        resizeMode='contain' 
                      />
                    </View>
                  {itemReg.NAME && <Text style={styles.header}>Item Name: {itemReg.NAME}</Text>}
                  <View style={styles.infoDeets}>
                    {/* <Text style={styles.infoTitle}>Item ID: {itemReg.ID && <Text style={styles.info}>{itemReg.ID}</Text>}</Text> */}
                    <Text style={styles.infoTitle}>Brand: {itemReg.BRAND && <Text style={styles.info}>{itemReg.BRAND}</Text>}</Text>
                    <Text style={styles.infoTitle}>Type: {itemReg.TYPE && <Text style={styles.info}>{itemReg.TYPE}</Text>}</Text>
                    <Text style={styles.infoTitle}>Description: {itemReg.DESCRIPTION && <Text style={styles.info}>{itemReg.DESCRIPTION}</Text>}</Text>
                    {/* {mediumType && <Text style={styles.infoTitle}>Item Medium Type: <Text style={styles.info}>{mediumType}</Text></Text>} */}
                    {creationDate && <Text style={styles.infoTitle}>Date Created: <Text style={styles.info}>{creationDate}</Text></Text>}
                    {modifiedDate && <Text style={styles.dateMod}>Last Date Modified: <Text style={styles.dateMod}>{modifiedDate}</Text></Text>}
                  </View>
                  <View style={styles.infoDeets}>
                    {mediumData.length > 0 && (
                      <View style={styles.mediumsContainer}>
                        <Text style={styles.infoTitle}>Storage Mediums:</Text>
                        {mediumData.map((medium, index) => (
                          <View key={index} style={styles.mediumItem}>
                            <Text style={styles.info}>• {medium.MEDIUM.NAME} ({medium.MEDIUM.PARENT_LOCATION.NAME})</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>

                  <View style={styles.bottomBtn}>
                        <EditButton
                            handlePress={() => router.push('/editItem')}
                          />
                        {/* <View style={styles.saveButtonContainer}>
                          <SaveButton style={styles.customSave} title="SAVE" />
                        </View> */}

                        <View style={styles.redirect}>
                          <TouchableOpacity style={styles.redirectButtonStore} onPress={() => handleRedirect(itemReg.ID)}>
                            <LinearGradient
                              colors={['#85EBFC', '#74ADFA']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.gradient}
                            >
                              <Text style={styles.redirectButtonText}>See Storage</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </View>

                  {/* <View style={styles.dateParent}>
                    <View style={styles.dateChild}>
                    <Text style={styles.startCon}>Start of Consumption</Text>
                    <DateField value={startDate} onChangeText={setStartDate} />
                    </View>

                    <View style={styles.dateChild}>
                    <Text style={styles.endCon}>End of Consumption</Text>
                    <DateField value={endDate} onChangeText={setEndDate} />
                    </View>
                  </View>
        
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
                            {modifiedDate && <Text style={styles.dateMod}>Last Date Modified: <Text style={styles.dateMod}>{modifiedDate}</Text></Text>}
                          </View>
                        </View> */}
                        {/* <EditButton
                          handlePress={() => router.push('/editItem')}
                        /> */}
                      {/* </View> */}
        
                      {/* <View style={styles.bottomBtn}>
                      <View style={styles.saveButtonContainer}>
                        <SaveButton style={styles.customSave} title="SAVE" />
                      </View>

                      <View style={styles.redirect}>
                        <TouchableOpacity style={styles.redirectButton} onPress={() => handleRedirect(itemReg.ID)}>
                          <LinearGradient
                            colors={['#85EBFC', '#74ADFA']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}
                          >
                            <Text style={styles.redirectButtonText}>See Storage</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                  
                    </View> */}
                  
                </>
              );
        }
    } else if (itemReg.TYPE === 'Storage Medium') {
        const storageItems = mediumData.filter(medium => medium.MEDIUM_ID === itemReg.ID);
        return (
            <>
            <Text style={styles.title}>STORAGE MEDIUM</Text>
              <View style={styles.photoContainer}>
                <Image 
                  source={icons.imagepic}
                  style={styles.itemImg}
                  resizeMode='contain' 
                />
              </View>
              {itemReg.NAME && <Text style={styles.header}>Storage Name: {itemReg.NAME}</Text>}
              <View style={styles.infoDeets}>
                <Text style={styles.infoTitle}>Medium ID: {itemReg.ID && <Text style={styles.info}>{itemReg.ID}</Text>}</Text>
                <Text style={styles.infoTitle}>Type: {itemReg.TYPE && <Text style={styles.info}>{itemReg.TYPE}</Text>}</Text>
                <Text style={styles.infoTitle}>Description: {itemReg.DESCRIPTION && <Text style={styles.info}>{itemReg.DESCRIPTION}</Text>}</Text>
                {creationDate && <Text style={styles.infoTitle}>Date Created: <Text style={styles.info}>{creationDate}</Text></Text>}
                {modifiedDate && <Text style={styles.infoTitle}>Last Date Modified: <Text style={styles.info}>{modifiedDate}</Text></Text>}
              </View>
              <View style={styles.infoDeets}>
                {storedItems.length > 0 && (
                  <View style={styles.mediumsContainer}>
                    <Text style={styles.infoTitle}>Stored Items:</Text>
                    {storedItems.map((item, index) => (
                      <View key={index} style={styles.mediumItem}>
                        <Text style={styles.info}>• {item.ITEM.NAME} (Item ID: {item.ITEM.ITEM_ID})</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
      
              <View style={styles.actionRowStore}>
                {/* <View style={styles.numberEditContainer}>
                  <View style={styles.lastModifiedDate}>
                    {modifiedDate && <Text style={styles.dateMod}>Last Date Modified: <Text style={styles.dateMod}>{modifiedDate}</Text></Text>}
                  </View>
                </View> */}
                <EditButton
                  handlePress={() => router.push('/storageEdit')}
                />

                <View style={styles.redirect}>
                  <TouchableOpacity style={styles.redirectButtonStore} onPress={() => handleRedirect(itemReg.ID)}>
                    <LinearGradient
                      colors={['#85EBFC', '#74ADFA']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.gradient}
                    >
                      <Text style={styles.redirectButtonText}>See Items</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

              </View>
            </>
          );
        } else {
          return null;
        }
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
            <Text style={styles.title}>SCAN QR CODE</Text>
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
            {/* <Text style={styles.divider}>╰── ⋅ ⋅ ── ✩ ── ⋅ ⋅  ──╯</Text> */}
            <Text style={styles.divider}>──── ⋅ ⋅ ── ✩ ── ⋅ ⋅  ────</Text>
            <View style={styles.infoContainer}>
            {renderConditionalView()}     
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
  bottomBtn:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    // backgroundColor: 'orange'
  },
  customSave:{
    width: 150, 
    height: 80,
    borderRadius: 20,
    // backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redirect:{
    alignItems: 'center',
  },
  redirectButton:{
    width: 150,
    height: 70,
    borderRadius: 10,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  redirectButtonText:{
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: '#222b3c', // Ensure the text is white for better contrast
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: height / 50,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
  },
  redirectButtonStore:{
    width:140,
    height: 60,
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
    width: 330,
    height: 330,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height / 50,
    backgroundColor:'#222b3c',
    padding: 20,
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
  divider:{
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: height / 50,
  },
  cameraContainer:{
    height:300,
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
    width: '80%',
    height: '80%',
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
    alignSelf: 'center',
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
  actionRowStore:{
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

