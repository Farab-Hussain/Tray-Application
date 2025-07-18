# Tray Admin Dashboard

![Tray Dashboard](https://via.placeholder.com/800x400?text=Tray+Admin+Dashboard)

## Overview

The Tray Admin Dashboard is a powerful web application built with Next.js that provides comprehensive management tools for platform administrators and consultants. It offers intuitive interfaces for user management, service configuration, booking oversight, and detailed analytics.

## Features

### Admin Panel
- **User Management**: Approve, suspend, or manage user accounts
- **Consultant Verification**: Review and approve consultant applications
- **Service Management**: Create, edit, and organize service categories
- **Booking Oversight**: Monitor and manage all platform bookings
- **Financial Tools**: Track earnings, manage commissions, and process payouts
- **Analytics Dashboard**: Visualize platform metrics and performance
- **Notification System**: Send broadcast messages to users

### Consultant Portal
- **Profile Management**: Update professional information and credentials
- **Service Configuration**: Create and manage service offerings
- **Availability Calendar**: Set and manage available time slots
- **Booking Management**: View upcoming and past bookings
- **Earnings Tracker**: Monitor income and commission details
- **Performance Analytics**: View personal metrics and feedback

## Technology Stack

- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Fetching**: SWR for efficient API requests
- **Charts**: Chart.js for analytics visualization
- **Forms**: React Hook Form with validation
- **Authentication**: JWT-based auth with secure HTTP-only cookies

## Getting Started

### Prerequisites
- Node.js (v18+)
- Access to the Tray backend API

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd dashboard
npm install
```

3. Create a `.env.local` file based on `.env.example`

### Development

```bash
# Start development server
npm run dev
```

The dashboard will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
dashboard/
├── app/              # Next.js app directory
│   ├── admin/        # Admin-specific pages
│   ├── consultant/   # Consultant-specific pages
│   ├── auth/         # Authentication pages
│   └── api/          # API routes
├── components/       # Reusable UI components
│   ├── ui/           # Base UI components
│   ├── forms/        # Form components
│   ├── charts/       # Analytics components
│   └── layout/       # Layout components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and services
├── public/           # Static assets
└── styles/           # Global styles
```

## Best Practices

- Follow Next.js best practices for routing and data fetching
- Use TypeScript for type safety
- Implement responsive design for all screen sizes
- Ensure accessibility compliance
- Write unit tests for critical components

## License

MIT