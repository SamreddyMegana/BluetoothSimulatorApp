// __tests__/App.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App/App';
import BluetoothManager from "../_mocks_/BlutoothManager"; // This will automatically use the mock

test('App reads and displays Bluetooth data', async () => {
  const { getByText, getByRole } = render(<App />);

  // Simulate the user scanning for devices
  const scanButton = getByRole('button', { name: 'Scan for Bluetooth Devices' });
  fireEvent.press(scanButton);

  // Wait for the mock device to be displayed
  await waitFor(() => getByText('Found Device: MockDevice'));

  // Simulate connecting to the device
  const connectButton = getByRole('button', { name: 'Connect to Device' });
  fireEvent.press(connectButton);

  // Simulate reading data from the connected device
  const readButton = getByRole('button', { name: 'Read Data from Device' });
  fireEvent.press(readButton);

  // Ensure the mocked data is displayed
  await waitFor(() => getByText('Data from device: MockedData'));
  expect(getByText('MockedData')).toBeTruthy();
});
