
# TrackQR

- A QR Code Management Platform that supports Dynamic QR Codes, Event Tracking, and Complete Analytics.
- The platform should allow users to generate, update, and manage QR codes, track interactions, and analyze their performance.

## 🌟 Key Features

- QR codes that can be updated in real time, meaning the destination URL can be modified without changing the physical QR code itself.
- The system should track every interaction with a QR code, such as: The time and location of the scan. The device or browser used.
- Users should be able to view detailed performance metrics of their QR codes, including:Total scans. Unique users. Time-based trends (e.g., scans per day/week). Geographic distribution of scans. Device or platform analysis.
- Ensure that QR codes are only accessible or editable by their respective owners. This means implementing proper user authentication and authorization.


## 🛠️ Technology Stack

- Backend: Node.js Express.js
- Database: Mongodb
- ORM: Mongoose
## Run Locally

Clone the project

```bash
  git clone https://github.com/Vedarth1/TrackQR
```

Go to the project directory

```bash
  cd TrackQR
```

### Run Backend

```bash
  npm install
```

```bash
  npm run dev
```

# Swagger Access

http://localhost:4000/api/v1/docs
