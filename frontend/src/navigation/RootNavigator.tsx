import { createNavigationContainerRef } from '@react-navigation/native';
import StudentNavigation from './studentNavigator';
import ConsultantNavigation from './consultantNavigator';
import React from 'react';

export const navigationRef = createNavigationContainerRef();

export function resetTo(name: string) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name }],
    });
  }
}

// Example RootNavigator that selects navigation based on userRole
const RootNavigator = ({ userRole }: { userRole?: string }) => {
  // TODO: Replace with real user role logic (from context, redux, etc.)
  if (userRole === 'consultant') return <ConsultantNavigation />;
  // Default to student navigation
  return <StudentNavigation />;
};

export default RootNavigator;
