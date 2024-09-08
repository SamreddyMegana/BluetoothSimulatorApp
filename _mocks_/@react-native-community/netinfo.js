const NetInfo = {
    addEventListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
    fetch: jest.fn(() => Promise.resolve({
      isConnected: true,
      type: 'wifi',
    })),
  };
  
  export default NetInfo;
  