import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Linking } from 'react-native';

const StorageLists = (props) => {
  const [itemId, setItemId] = useState(null);
  const [itemMediums, setItemMediums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInitialURL = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          const urlParams = new URLSearchParams(initialUrl.split('?')[1]);
          const id = urlParams.get('itemId');
          console.log(props)
          console.log(initialUrl);
          console.log(urlParams);
          console.log(id);
          if (id) {
            setItemId(id);
          }
        }
      } catch (error) {
        console.error('Error getting initial URL:', error);
      }
    };

    const handleUrl = ({ url }) => {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const id = urlParams.get('itemId');
      if (id) {
        setItemId(id);
      }
    };

    const linkingListener = Linking.addEventListener('url', handleUrl);

    getInitialURL();

    return () => {
      linkingListener.remove();
    };
  }, []);

  useEffect(() => {
    const fetchItemMediums = async () => {
      try {
        const response = await fetch(`http://172.16.207.180:8080/inventory/itemMedium/itemId/${props.id}`);
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
    <View style={styles.container}>
      <Text style={styles.title}> hi + {itemId} </Text>
      {/* {itemMediums.length > 0 ? (Item Mediums for ID: {props.itemId}
        itemMediums.map((itemMedium, index) => (
          <View key={index} style={styles.card}>
            <Text>Medium Name: {itemMedium.MEDIUM_NAME}</Text>
            <Text>Item Medium ID: {itemMedium.ITEM_MEDIUM_ID}</Text>
            <Text>Quantity: {itemMedium.QUANTITY}</Text>
          </View>
        ))
      ) : (
        <Text>No item mediums found for this ID.</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default StorageLists;
