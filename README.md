This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

# React Native Bluetooth Device Simulator

This project is a simple React Native mobile app that simulates connecting to a Bluetooth device and reading data. The app includes offline data storage and synchronization with Firebase Cloud Firestore when connectivity is restored. 

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

- **Node.js** (version 16 or later) and npm: [Download Node.js](https://nodejs.org/)
- **React Native CLI**: Install globally using `npm install -g react-native-cli`
- **Xcode** (for iOS development): Available from the Mac App Store
- **Android Studio** (for Android development): [Download Android Studio](https://developer.android.com/studio)
- **Git**: [Download Git](https://git-scm.com/)
- **CocoaPods** (for iOS dependencies): Install via `sudo gem install cocoapods`
- **Firebase Account**: [Sign up for Firebase](https://firebase.google.com/)

## Step 1:  **Clone the Repository**

   ```bash
   git clone https://github.com/Samreddy9/BluetoothSimulatorApp/tree/patch-1
   cd react-native-bluetooth-simulator
   ```
## Step 3: Install Dependencies
Run the following command in the project root directory to install the necessary dependencies:

```bash
Copy code
npm install
```
Install iOS Dependencies (Mac Only):

If you're developing on macOS and want to run the app on an iOS simulator or device, install the CocoaPods dependencies:

```bash
Copy code
cd ios
pod install
cd ..
```

## Step 3: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 4: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 5: Firebase Integration

The app is integrated with Firebase Firestore for cloud data synchronization. When the device is offline, data is stored locally using AsyncStorage. When connectivity is restored, the app automatically syncs the local data to Firebase Firestore.

Steps to Configure Firebase:
1.Ensure Firebase SDK is Installed:

```bash
npm install @react-native-firebase/app @react-native-firebase/firestore
```
2.Set Up Firebase in Your App:

Add Firebase configuration to your project files (google-services.json for Android and GoogleService-Info.plist for iOS) 

3.Check Connectivity and Sync Data:

The app automatically checks for network connectivity using the @react-native-community/netinfo package and syncs data to Firestore when the network is available.

Troubleshooting

Metro Bundler Errors: If you encounter errors with the Metro bundler, try restarting it with npm start --reset-cache.

Xcode Build Failures: Ensure that all Xcode components are up to date. Sometimes cleaning the build folder (Shift + Command + K) and reinstalling pods can help.

Android Build Failures: Ensure that Android SDK and related components are installed and up to date. Running ./gradlew clean in the android directory might resolve some issues.

Firebase Configuration Issues: Ensure that your google-services.json and GoogleService-Info.plist files are correctly placed and configured.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
