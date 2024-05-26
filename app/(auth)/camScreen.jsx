import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { CameraView, Camera } from "expo-camera/next";

export default function CamScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

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
    let type = null;
  
    lines.forEach(line => {
      if (line) { // Check if line is defined and not null
        const [key, value] = line.split(': ');
        const trimmedKey = key.trim().toUpperCase();
        const trimmedValue = value.trim();
  
        if (trimmedKey === 'ID') {
          id = trimmedValue;
        } else if (trimmedKey === 'TYPE') {
          type = trimmedValue;
        }
      }
    });
  
    if (id !== null && type !== null) {
      console.log('Scanned ID:', id);
      console.log('Scanned TYPE:', type);
      searchForItemMediums(id); // Call function to search for item mediums
    } else {
      console.log('ID or TYPE not found in the scanned data');
    }
  };
  

  const searchForItemMediums = async (id) => {
    try {
      // Replace the placeholder URL with your actual API endpoint to fetch item mediums
      const response = await fetch(`http://172.16.208.143:8080/inventory/itemMedium/itemId/${id}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Item mediums with the same ID:', data);
        const itemMediumsMessage = data.map(itemMedium => `${itemMedium.QUANTITY}, ${itemMedium.ITEM_MEDIUM_ID}`).join('\n');
        Alert.alert('Item Mediums', itemMediumsMessage);
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
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  outerContainer:{
    height: "40%",
    width:"80%",
    marginTop: 200,
    marginLeft: 45,
  }
});
