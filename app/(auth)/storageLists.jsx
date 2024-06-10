import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, ActivityIndicator, ScrollView, Image, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import images from "../../constants/images";
import HomeButton from '../../components/HomeButton';
import Card from '../../components/Cards';
import { router } from 'expo-router';

const storageLists = () => {
  const route = useRoute();
  const { itemId } = route.params;
  const [itemMediums, setItemMediums] = useState([]);
  const [itemDetails, setItemDetails] = useState(null); // State for item details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemMediums = async () => {
      try {
        const response = await fetch(`http://192.168.1.235:8080/inventory/itemMedium/itemId/${itemId}`);
        const data = await response.json();

        if (response.ok) {
          setItemMediums(data);
        } else {
          console.error('Failed to fetch item mediums:', data);
          setError('Failed to fetch item mediums');
        }
      } catch (error) {
        console.error('Error fetching item mediums:', error);
        setError('Error fetching item mediums');
      } finally {
        setLoading(false);
      }
    };

    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.235:8080/inventory/item/${itemId}`);
        const data = await response.json();

        if (response.ok) {
          setItemDetails(data);
        } else {
          console.error('Failed to fetch item details:', data);
          setError('Failed to fetch item details');
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
        setError('Error fetching item details');
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItemMediums();
      fetchItemDetails();
    } else {
      setLoading(false);
      setError('Invalid item ID');
    }
  }, [itemId]);

  const handlePress = (type, itemId) => {
    switch (type) {
      case 'R':
        router.push(`/existTrackReg?itemIdPass=${itemId}`);
        break;
      case 'C':
        router.push(`/existTrackCons?itemIdPass=${itemId}`);
        break;
      case 'U':
        router.push(`/existUntrack?itemIdPass=${itemId}`);
        break;
      default:
        console.log('Invalid item type');
    }
  };

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
              handlePress={() => router.push('/home')}
            />
          </View>
          <View style={styles.titleArea}>
            <Text style={styles.title}>Storage of {itemDetails ? itemDetails.NAME : ''}</Text>
          </View>

          {itemMediums.map((item) => (
            <Card
              key={item.ITEM_MEDIUM_ID}
              title={item.MEDIUM.NAME}
              content={`Location: ${item.MEDIUM.PARENT_LOCATION.NAME} || Item Medium ID: ${item.ITEM_MEDIUM_ID} || Medium ID: ${item.MEDIUM.MEDIUM_ID}`}
              // handlePress={() => router.push(`/storageMed?mediumIdPass=${item.MEDIUM.MEDIUM_ID}`)}
              handlePress={() => handlePress(item.TYPE, item.ITEM_MEDIUM_ID)}
              style={styles.card1}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  titleArea: {
    marginLeft: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#222b3c',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default storageLists;
