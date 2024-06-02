import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, ActivityIndicator, ScrollView } from 'react-native';
import icons from '../../constants/icons';
import images from "../../constants/images";
import HomeButton from '../../components/HomeButton';
import Card from '../../components/Cards';
import { router } from 'expo-router';

const itemList = () => {
  const route = useRoute();
  const { mediumId } = route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('Medium ID:', mediumId);

  useEffect(() => {
    const fetchItemMediums = async () => {
      try {
        const response = await fetch(`http://192.168.254.109:8080/inventory/itemMedium/mediumId/${mediumId}`);
        const data = await response.json();

        if (response.ok) {
          setItems(data);
          console.log('Fetched items:', data); // Log the fetched items
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

    if (mediumId) {
      fetchItemMediums(mediumId);
    } else {
      setLoading(false);
      setError('Invalid item ID');
    }
  }, [mediumId]);

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
    );r
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
            <Text style={styles.title}>Items</Text>
          </View>

          {items.map((item) => (
            <Card
              key={item.ITEM_ID}
              title={item.NAME}
              content={`ID: ${item.ITEM_ID} || Quantity: ${item.QUANTITY} || Type: ${item.TYPE}`}
              handlePress={() => handlePress(item.TYPE, item.ITEM_ID)}
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
  homeButton:{
    marginLeft: 500,
  },
});

export default itemList;
