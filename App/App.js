import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';
import BluetoothSimulator from './BluetoothSimulator';

// Simulate an API function to sync data to a cloud service
async function syncDataToCloud(localData) {
    // Check network connectivity
    const state = await NetInfo.fetch();
  
    if (state.isConnected) {
      try {
        // Reference to Firestore collection
        const collectionRef = firestore().collection('deviceData');
  
        // Upload each local data entry to Firestore
        const batch = firestore().batch();
  
        localData.forEach((data) => {
          const docRef = collectionRef.doc(data.id);
          batch.set(docRef, data);
        });
  
        // Commit batch upload
        await batch.commit();
  
        console.log('Data synced successfully to Firestore.');
        Alert.alert('Sync Success', 'Data has been synced to the cloud.');
      } catch (error) {
        console.error('Error syncing data to cloud:', error);
        Alert.alert('Sync Error', 'Failed to sync data to the cloud. Please try again.');
      }
    } else {
      console.log('No network connection. Sync will retry when online.');
      Alert.alert('No Connection', 'No network connection. Sync will retry when online.');
    }
  }

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [receivedData, setReceivedData] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);

   useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        const localData = await getDataLocally();
        await syncDataToCloud(localData);
      }
    });

    return () => unsubscribe();
  }, []);

  async function storeDataLocally(data) {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@local_data', jsonValue);
      console.log('Data stored locally.');
    } catch (error) {
      console.error('Error storing data locally:', error);
    }
  }

  async function getDataLocally() {
    try {
      const jsonValue = await AsyncStorage.getItem('@local_data');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error retrieving local data:', error);
    }
  }

  const handleConnect = async () => {
    if (!isConnected) {
      try {
        await BluetoothSimulator.connect();
        setIsConnected(true);
        BluetoothSimulator.startSendingData((data) => {
          const validatedData = validateData(data);
          if (validatedData !== null) {
            setReceivedData((prevData) => {
              const newData = [...prevData, validatedData];
              storeDataLocally(newData);
              return newData;
            });
          }
        });
      } catch (error) {
        console.error('Failed to connect:', error);
        Alert.alert('Connection Error', 'Failed to connect to the Bluetooth device.');
      }
    } else {
      await BluetoothSimulator.disconnect();
      setIsConnected(false);
      setReceivedData([]);
      await AsyncStorage.removeItem('bluetoothData');
      console.log('Cleared local storage');
    }
  };

  const handleSync = async () => {
    if (isOffline || syncInProgress) {
      Alert.alert('Network Error', 'Cannot sync data while offline or sync in progress.');
      return;
    }

    setSyncInProgress(true);

    try {
      await syncDataToCloud(receivedData);
      await AsyncStorage.removeItem('bluetoothData');
      setReceivedData([]);
      console.log('Data synced and cleared locally');
    } catch (error) {
      console.error('Failed to sync data to cloud:', error);
      Alert.alert('Sync Error', 'Failed to sync data to the cloud.');
    } finally {
      setSyncInProgress(false);
    }
  };

  const validateData = (data) => {
    if (typeof data !== 'number' || data < 0 || data > 100) {
      console.error('Invalid data received:', data);
      return null;
    }
    return data;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Device Simulator</Text>
      <Button
        title={isConnected ? 'Disconnect' : 'Connect'}
        onPress={handleConnect}
      />
      {isConnected && (
        <View style={styles.dataContainer}>
          <Text style={styles.subtitle}>Received Data:</Text>
          {receivedData.map((data, index) => (
            <Text key={index} style={styles.dataText}>
              {data}
            </Text>
          ))}
        </View>
      )}
      <Button
        title="Sync Data to Cloud"
        onPress={handleSync}
        disabled={isOffline || syncInProgress}
      />
      {isOffline && (
        <Text style={styles.offlineText}>
          Currently Offline. Data will be synced when online.
        </Text>
      )}
      {syncInProgress && (
        <Text style={styles.syncText}>
          Sync in progress...
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dataContainer: {
    marginTop: 20,
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataText: {
    fontSize: 16,
    color: '#333',
  },
  offlineText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  syncText: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
});

export default App;
