class BleManager {
    constructor() {
      // Mock implementation
    }
  
    startDeviceScan(_, __, callback) {
      // Simulate finding a device
      setTimeout(() => {
        callback(null, { name: 'MyBluetoothDevice', id: 'mock-id' });
      }, 100); // Simulate a short delay
    }
  
    stopDeviceScan() {
      // Mock stop device scan
    }
  
    on() {
      // Mock event handling
    }
  
    off() {
      // Mock event removal
    }
  }
  
  export { BleManager };
  