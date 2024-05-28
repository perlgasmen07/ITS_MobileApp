import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { CameraView, Camera } from 'expo-camera/next';
import HomeButton from '../../components/HomeButton';
import icons from '../../constants/icons';
import images from "../../constants/images";

export default function CamScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedId, setScannedId] = useState(null);
  const [scannedName, setScannedName] = useState(null);
  const [scannedType, setScannedType] = useState(null);
  const [mediumNames, setMediumNames] = useState([]);

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

    let id = null;
    let name = null;
    let type = null;

    lines.forEach(line => {
      if (line) {
        const [key, value] = line.split(': ');
        const trimmedKey = key?.trim().toUpperCase();
        const trimmedValue = value?.trim();

        if (trimmedKey === 'ID') {
          id = trimmedValue;
        } else if (trimmedKey === 'TYPE') {
          type = trimmedValue;
        } else if (trimmedKey === 'NAME') {
          name = trimmedValue;
        } 
      }
    });

    if (id !== null && type !== null && name !== null) {
      console.log('Scanned ID:', id);
      console.log('Scanned TYPE:', type);
      console.log('Scanned NAME:', name);
      setScannedId(id);
      setScannedType(type);
      setScannedName(name);
      fetchMediumNames(id); // Fetch the medium names based on the scanned ID
    } else {
      console.log('ID, TYPE, or NAME not found in the scanned data');
    }
  };

  const fetchMediumNames = async (id) => {
    try {
      // Replace the placeholder URL with your actual API endpoint to fetch item mediums
      const response = await fetch(`http://172.16.76.175:8080/inventory/itemMedium/itemId/${id}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Item mediums with the same ID:', data);
        
        // Extract medium names and store them in the state
        const names = data.map(itemMedium => itemMedium.MEDIUM_NAME);
        setMediumNames(names);
        
        const itemMediumsMessage = data.map(itemMedium => `${itemMedium.QUANTITY}, ${itemMedium.MEDIUM_ID}`).join('\n');
        Alert.alert('Item Mediums', itemMediumsMessage);

        // Navigate to storage screen with the item ID if needed
        // router.push({
        //   pathname: '/storageLists',
        //   params: { itemId: id },
        // });
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
    <View style={styles.container}>
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
      <View style={styles.infoContainer}>
        {scannedId && (
          <Text style={styles.infoText}>Item ID: {scannedId}</Text>
        )}
        {scannedName && (
          <Text style={styles.infoText}>Item Name: {scannedName}</Text>
        )}
        {scannedType && (
          <Text style={styles.infoText}>Type: {scannedType}</Text>
        )}
        {mediumNames.length > 0 && (
          <View style={styles.mediumsContainer}>
            <Text style={styles.mediumTitle}>Medium Names:</Text>
            {mediumNames.map((name, index) => (
              <Text key={index} style={styles.mediumName}>{name}</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  logoContainer: {
    height: height * 0.16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: height / 20,
    marginLeft: 30,
  },
  logoPic: {
    resizeMode: 'contain',
    width: '90%',
    height: '90%',
    marginLeft: -90,
    marginRight: -50,
  },
  homeButton: {
    marginLeft: 500,
  },
  container: {
    flex: 1,
    backgroundColor: '#222b3c',
  },
  cameraContainer: {
    flex: 0.8,
    justifyContent: 'center',
    position: 'relative',
    margin: 30,
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
  infoContainer: {
    flex: 1,
    width: width/1.3, 
    color: '#ffff',
    fontFamily:"Poppins-Regular",
    fontSize: 15,
    // padding: 10,
    // backgroundColor: '#222b3c',
    backgroundColor: 'orange'
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginVertical: 8,
  },
  mediumsContainer: {
    marginTop: 10,
  },
  mediumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  mediumName: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
