# Gravity Tiles App Setup Guide for React Native Expo

## Project Setup

### Prerequisites
- Node.js (LTS)
- npm (Node package manager)
- Expo CLI

### Installation Steps
1. **Install Node.js**: Download from [Node.js official website](https://nodejs.org/) and install it on your machine.
2. **Install Expo CLI**: Open your terminal and run:
   
   ```bash
   npm install -g expo-cli
   ```

3. **Clone the Repository**: Clone the Gravity Tiles App repository:
   
   ```bash
   git clone https://github.com/nagarco111/Gravity-Tiles-App.git
   ```

4. **Navigate to the Project Directory**:  
   ```bash
   cd Gravity-Tiles-App
   ```

5. **Install Dependencies**:  
   ```bash
   npm install
   ```

6. **Start the Development Server**:  
   ```bash
   expo start
   ```

## Building the APK for Android
1. **Install Expo Application Services (EAS)**: If not already installed, you can install EAS CLI via npm:
   
   ```bash
   npm install -g eas-cli
   ```

2. **Login to EAS**: Authenticate using your Expo account:
   
   ```bash
   eas login
   ```

3. **Configure EAS**: Create an eas.json file by running:
   
   ```bash
   eas build:configure
   ```

4. **Build the APK**: To build an APK for Android, use:
   
   ```bash
   eas build --platform android
   ```

5. **Download the APK**: Once the build is successful, you'll receive a link to download the APK file.

## Notes
- Ensure you have signed the app and followed the necessary steps for APK distribution if you plan to publish it on the Google Play Store.