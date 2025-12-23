try {
  const lib = require('./node_modules/react-native-paystack-webview/production/lib/index.js');
  console.log('Exports:', Object.keys(lib));
  if (lib.default) {
      console.log('Default Exports:', Object.keys(lib.default));
  }
} catch (e) {
  console.log('Error:', e.message);
}
