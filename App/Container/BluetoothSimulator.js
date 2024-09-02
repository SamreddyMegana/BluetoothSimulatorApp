class BluetoothSimulator {
    constructor() {
      this.isConnected = false;
      this.dataInterval = null;
    }
  
    async connect() {
      try {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (!this.isConnected) {
              this.isConnected = true;
              console.log('Connected to Bluetooth device.');
              resolve('Connected');
            } else {
              reject(new Error('Already connected'));
            }
          }, 1000); // Simulate connection delay
        });
      } catch (error) {
        console.error('Bluetooth connect error:', error);
        throw error;
      }
    }
  
    async disconnect() {
      try {
        return await new Promise((resolve) => {
          setTimeout(() => {
            if (this.isConnected) {
              this.isConnected = false;
              clearInterval(this.dataInterval);
              console.log('Disconnected from Bluetooth device.');
              resolve('Disconnected');
            } else {
              resolve('Already disconnected');
            }
          }, 1000); // Simulate disconnection delay
        });
      } catch (error) {
        console.error('Bluetooth disconnect error:', error);
        throw error;
      }
    }
  
    startSendingData(callback) {
      if (!this.isConnected) {
        console.error('Cannot start sending data. Device is not connected.');
        return;
      }
  
      if (this.dataInterval) {
        console.warn('Data sending already in progress.');
        return;
      }
  
      this.dataInterval = setInterval(() => {
        try {
          const randomData = Math.floor(Math.random() * 100); // Random number between 0 and 99
          console.log(`Sending data: ${randomData}`);
          callback(randomData);
        } catch (error) {
          console.error('Error sending data:', error);
        }
      }, 2000); // Send data every 2 seconds
    }
  
    stopSendingData() {
      if (this.dataInterval) {
        clearInterval(this.dataInterval);
        this.dataInterval = null;
        console.log('Stopped sending data.');
      } else {
        console.warn('Data sending was not active.');
      }
    }
  }
  
  export default new BluetoothSimulator();
  