import { BleManager } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class BluetoothManager {
  constructor() {
    this.manager = new BleManager();
    this.device = null;
  }

  async requestPermissions() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      return (
        granted['android.permission.BLUETOOTH_SCAN'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.BLUETOOTH_CONNECT'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true; // iOS automatically grants permissions after Info.plist is set
  }

  async scanForDevices() {
    return new Promise((resolve, reject) => {
      this.manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          reject(error);
          return;
        }

        console.log('Found device:', device.name);

        // Stop scanning after finding a device
        if (device && device.name === 'MockDevice') {
          this.manager.stopDeviceScan();
          resolve(device);
        }
      });
    });
  }

  async connectToDevice(device) {
    this.device = await device.connect();
    await this.device.discoverAllServicesAndCharacteristics();
    console.log('Connected to device:', this.device.id);
  }

  // Simulating reading random numerical data from the device
  async readData(serviceUUID, characteristicUUID) {
    if (!this.device) {
      throw new Error('Device not connected');
    }

    // Simulate receiving random numerical data
    const randomData = (Math.random() * 100).toFixed(2); // Simulate a floating-point number between 0 and 100
    console.log('Received simulated data:', randomData);

    // Store the data locally
    await this.storeDataLocally(randomData);

    return randomData; // Return the simulated data
  }

  async storeDataLocally(data) {
    try {
      const existingData = await AsyncStorage.getItem('bluetoothData');
      const parsedData = existingData ? JSON.parse(existingData) : [];
      parsedData.push({ data, timestamp: new Date().toISOString() });
      await AsyncStorage.setItem('bluetoothData', JSON.stringify(parsedData));
      console.log('Data stored locally:', parsedData);
    } catch (error) {
      console.error('Failed to store data locally:', error);
    }
  }

  async disconnect() {
    if (this.device) {
      this.device.cancelConnection();
    }
  }
}

const bluetoothManager = new BluetoothManager();
export default bluetoothManager;
