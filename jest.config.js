module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|react-native-ble-plx)/)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$': '<rootDir>/_mocks_/@react-native-async-storage/async-storage.js',
    '^react-native-ble-plx$': '<rootDir>/_mocks_/react-native-ble-plx.js',
    '^@react-native-community/netinfo$': '<rootDir>/_mocks_/@react-native-community/netinfo.js',
    '^@react-native-firebase/firestore$': '<rootDir>/_mocks_/@react-native-firebase/firestore.js',
  },
  moduleDirectories: ['node_modules', 'src'], 
  testTimeout: 10000,
};
