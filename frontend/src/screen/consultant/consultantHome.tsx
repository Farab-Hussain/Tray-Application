import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  View,
} from 'react-native';
import ProfileHeader from '../../components/common/ProfileHeader';
import ConsultantCard from '../../components/common/ConsultantCard';

const consultantData = [
  { id: '1', name: 'John Deering', role: 'Consultant', rating: 4.8 },
  { id: '2', name: 'Jane Smith', role: 'Consultant', rating: 4.5 },
  { id: '3', name: 'Alex Brown', role: 'Consultant', rating: 4.7 },
  { id: '4', name: 'Emily White', role: 'Consultant', rating: 4.9 },
];

const home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ProfileHeader title="Pick a Consultant" />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Lead Matched</Text>
          <FlatList
            data={consultantData}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.cardRow}
            renderItem={({ item }) => (
              <ConsultantCard name={item.name} service={item.role} />
            )}
            contentContainerStyle={styles.flatListContentContainer}
            showsVerticalScrollIndicator={false}
            style={styles.flatListFullWidth}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#60C169',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    minHeight: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    color: '#000',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start', // Left align the heading
  },
  titleSmall: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardRow: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 4,
    marginTop: 0,
    marginBottom: 0,
  },
  flatListFullWidth: {
    // width: '100%', // Remove if parent already has width
  },
  centeredContent: {
    // width: '100%', // Remove if parent already has width
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlerowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 6,
  },
  consultantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 6,
    marginBottom: 6,
  },
  consultantTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAllBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  seeAllBtnText: {
    color: 'red',
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
});
