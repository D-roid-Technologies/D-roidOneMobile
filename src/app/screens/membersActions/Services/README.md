# Services (React Native)

This folder contains a complete, single-screen Services module.

## Entry File
- `ServicesScreen.tsx`

## Files
- `ServicesScreen.tsx` – state machine navigation + UI
- `ServiceCard.tsx` – reusable grid card
- `data.ts` – sample data (replace with your real data)
- `types.ts` – type definitions
- `components/*` – detail components + back button
- `WhatsAppButton.tsx` – floating WhatsApp button

## How to use
1. Copy the entire `Services` folder into your React Native project.
2. Import and render it:
```ts
import ServicesScreen from "./Services/ServicesScreen";

export default function App() {
  return <ServicesScreen whatsappPhone="2348012345678" />;
}
```

## Notes
- This implementation uses only React Native core components (no navigation library required).
- If you want React Navigation integration later, you can replace `view` state with actual screens.
