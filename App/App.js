import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import bluetoothManager from '../App/Container/BluetoothManager';
import NetInfo from '@react-native-community/netinfo';
import { syncDataToCloud } from '../App/Container/CloudSyncManager';

const App = () => {
  const [device, setDevice] = useState(null);
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Request Bluetooth permissions on mount
    const requestPermissions = async () => {
      const granted = await bluetoothManager.requestPermissions();
      if (!granted) {
        Alert.alert('Permissions Denied', 'Bluetooth permissions are required.');
      }
    };
    requestPermissions();

    return () => {
      // Disconnect device on unmount
      bluetoothManager.disconnect();
    };
  }, []);

  // Monitor network connectivity and sync data when online
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        syncDataToCloud(); // Sync data when the device is online
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleScan = async () => {
    try {
      const foundDevice = await bluetoothManager.scanForDevices();
      setDevice(foundDevice);
      Alert.alert('Device Found', `Found device: ${foundDevice.name}`);
    } catch (error) {
      Alert.alert('Error', `Failed to scan for devices: ${error.message}`);
    }
  };

  const handleConnect = async () => {
    try {
      if (device) {
        await bluetoothManager.connectToDevice(device);
        setIsConnected(true);
        Alert.alert('Connected', `Connected to device: ${device.name}`);
      } else {
        Alert.alert('No Device', 'No device to connect to.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to connect: ${error.message}`);
    }
  };

  const handleReadData = async () => {
    try {
      if (isConnected) {
        const serviceUUID = 'your-service-uuid'; // Replace with actual service UUID
        const characteristicUUID = 'your-characteristic-uuid'; // Replace with actual characteristic UUID
        const receivedData = await bluetoothManager.readData(serviceUUID, characteristicUUID);
        setData(receivedData);
      } else {
        Alert.alert('Not Connected', 'You need to connect to a device first.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to read data: ${error.message}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Scan for Bluetooth Devices" onPress={handleScan} />
      {device && <Text>Found Device: {device.name}</Text>}

      <Button title="Connect to Device" onPress={handleConnect} disabled={!device} />
      <Button title="Read Data from Device" onPress={handleReadData} disabled={!isConnected} />

      {data && (
        <View style={{ marginTop: 20 }}>
          <Text>Data from device:</Text>
          <Text>{data}</Text>
        </View>
      )}
    </View>
  );
};

export default App;
