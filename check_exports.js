try {
  const lib = require('react-native-paystack-webview');
  console.log('Keys:', Object.keys(lib));
} catch (e) {
  console.log('Error:', e.message);
  // Try to require the production lib directly if possible, bypassing index if it fails
  try {
     const lib2 = require('./node_modules/react-native-paystack-webview/production/lib/index.js');
     console.log('Keys direct:', Object.keys(lib2));
  } catch (e2) {
      console.log('Error direct:', e2.message);
  }
}
