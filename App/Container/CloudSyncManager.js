import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function syncDataToCloud() {
  try {
    const storedData = await AsyncStorage.getItem('bluetoothData');
    const dataToSync = storedData ? JSON.parse(storedData) : [];

    if (dataToSync.length > 0) {
      console.log('Syncing data to cloud:', dataToSync);

      // Upload each data point to Firestore
      const batch = firestore().batch();
      const collectionRef = firestore().collection('bluetoothData');

      dataToSync.forEach((entry) => {
        const docRef = collectionRef.doc(); // Create a new document for each entry
        batch.set(docRef, entry);
      });

      await batch.commit(); // Commit all writes to Firestore in one go

      console.log('Data synced successfully to cloud');

      // Clear the local data after successful sync
      await AsyncStorage.removeItem('bluetoothData');
    } else {
      console.log('No data to sync');
    }
  } catch (error) {
    console.error('Error syncing data to cloud:', error);
  }
}
