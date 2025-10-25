# **App Name**: AgriView

## Core Features:

- Firebase Configuration: Input fields to configure Firebase project ID and a connect button to establish the connection. Connection status indicator for feedback.
- Real-time Data Fetching: Continuously fetch and display sensor data from Firebase Realtime Database as it updates.
- Soil Moisture Visualization: Display a line chart visualizing soil moisture percentage over time, showing the last 100 readings.
- Temperature and Humidity Visualization: Present a dual Y-axis line chart showing temperature and humidity over time, plotting the last 100 readings.
- Current Data Stat Cards: Display the most recent values for temperature, humidity, and soil moisture in stat cards at the top of the dashboard.
- Data Table Display: Present all sensor readings in a scrollable table with columns for datetime, temperature, humidity, soil_moisture_percent, and soil_moisture_raw, with the most recent readings at the top. Includes virtual scrolling for handling large datasets.
- CSV Export: Enable users to export all sensor data to a CSV file with headers: timestamp, datetime, temperature, humidity, soil_moisture_percent, soil_moisture_raw. Filename format: sensor_data_YYYYMMDD_HHMMSS.csv.

## Style Guidelines:

- Primary color: Navy blue (#000080) to convey professionalism and reliability.
- Background color: Light gray (#F0F0F0) for a clean and neutral backdrop.
- Accent color: Teal (#008080) to highlight important data and interactive elements while maintaining a professional look.
- Body font: 'Roboto', a sans-serif font, providing a clean and modern reading experience.
- Headline font: 'Montserrat', a sans-serif font, giving a modern and scientific feel for titles.
- Use consistent and minimalist icons for different sensor types and actions, providing a clear visual language.
- Card-based layout using CSS Grid/Flexbox for responsive design, ensuring usability on both mobile and desktop devices.
- Subtle animations and transitions for loading data and updating charts, providing a smooth user experience.