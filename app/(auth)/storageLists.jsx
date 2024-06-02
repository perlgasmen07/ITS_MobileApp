import React, { useEffect, useState } from 'react';
import { View, SafeAreaView,Text, StyleSheet, ActivityIndicator, Linking,ScrollView , Image, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import images from "../../constants/images";
import HomeButton from '../../components/HomeButton';
import Card from '../../components/Cards';
import { router } from 'expo-router';

const storageLists = () => {
  const route = useRoute();
  const { itemId } = route.params;
  const [itemMediums, setItemMediums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemMediums = async () => {
      try {
        const response = await fetch(`http://192.168.254.109:8080/inventory/itemMedium/itemId/${itemId}`);
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

    if (itemId) {
      fetchItemMediums(itemId);
    } else {
      setLoading(false);
      setError('Invalid item ID');
    }
  }, [itemId]);

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
          handlePress={() => router.push('/home')}/>
        </View>
        <View style={styles.titleArea}>
          <Text style={styles.title}>Storage</Text>
        </View>

        {itemMediums.map((item) => (
          <Card
            key={item.MEDIUM_ID}
            title={item.MEDIUM_NAME}
            content={`Location: ${item.LOCATION_NAME}`}
            // onPress={() => handlePress(item.mediumId)}
            handlePress={() => router.push(`/storageMed?mediumIdPass=${item.MEDIUM_ID}`)}
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

    });


export default storageLists;
