const mockBluetoothManager = {
    requestPermissions: jest.fn(() => Promise.resolve(true)),
    scanForDevices: jest.fn(() => Promise.resolve({ name: 'MockDevice', id: '123' })),
    connectToDevice: jest.fn(() => Promise.resolve()),
    readData: jest.fn(() => Promise.resolve('MockedData')),
    disconnect: jest.fn(() => Promise.resolve())
  };
  
  export default mockBluetoothManager;
  