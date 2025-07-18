# Tray Consultancy Platform

A robust, full-stack consultancy platform enabling seamless connections between students and consultants, with real-time chat, video consultations, booking, and a powerful admin dashboard.

![Tray Platform](https://via.placeholder.com/800x400?text=Tray+Consultancy+Platform)

## Overview

Tray is a comprehensive platform that connects students with expert consultants across various fields. The platform facilitates scheduling, real-time communication, and service management through three main components:

- **Backend API**: TypeScript/Node.js REST API with MongoDB and Socket.IO
- **Mobile App**: React Native application for students and consultants
- **Admin Dashboard**: Next.js web application for platform management

## Key Features

### For Students
- Browse and search for consultants by expertise
- Book consultation sessions with preferred consultants
- Real-time chat and video consultations
- Manage bookings and payments
- Leave reviews and ratings

### For Consultants
- Create and manage professional profiles
- Set availability and service offerings
- Conduct video consultations
- Track earnings and bookings
- Communicate with students

### For Administrators
- Approve and manage consultants
- Monitor platform activity and metrics
- Manage services and categories
- Handle commission structures
- Generate reports and analytics

## Technology Stack

### Backend
- **Language**: TypeScript
- **Framework**: Node.js with Express
- **Database**: MongoDB
- **Real-time**: Socket.IO
- **Authentication**: JWT, OAuth (Google, Facebook, Apple)
- **Documentation**: Swagger/OpenAPI

### Mobile App
- **Framework**: React Native
- **Navigation**: React Navigation
- **State Management**: Context API
- **UI Components**: Custom components with consistent design
- **Video Calls**: WebRTC integration

### Dashboard
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Charts**: Chart.js for analytics
- **Authentication**: JWT-based auth

## Getting Started

See the README files in each project directory for detailed setup instructions:

- [Backend Setup](./backend/README.md)
- [Mobile App Setup](./frontend/README.md)
- [Dashboard Setup](./dashboard/README.md)

## Project Structure

```
tray/
├── backend/         # TypeScript Node.js API
├── frontend/        # React Native mobile app
└── dashboard/       # Next.js admin dashboard
```

## Security Features

- JWT authentication for all protected routes
- Password hashing with bcrypt
- Rate limiting on sensitive endpoints
- Secure HTTP headers with Helmet
- Input validation and sanitization
- Environment variables for secrets

## License

MIT