import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  FlatList,
} from 'react-native';
import ProfileHeader from '../../components/common/ProfileHeader';
import TopCard from '../../components/common/TopCard';
import RecommendedCard from '../../components/common/RecommendedCard';
import { useUserStore } from '../../services/authService';
import { getAllConsultants } from '../../services/api';

// Remove demoConsultants, use backend data

const Home = () => {
  // Remove all backend logic
  const [consultants, setConsultants] = React.useState<any[]>([]);
  const [loadingConsultants, setLoadingConsultants] = React.useState(true);
  const [errorConsultants, setErrorConsultants] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    const fetchConsultants = async () => {
      try {
        setLoadingConsultants(true);
        const data = await getAllConsultants();
        setConsultants(data);
      } catch (err) {
        setErrorConsultants('Failed to load consultants');
      } finally {
        setLoadingConsultants(false);
      }
    };
    fetchConsultants();
  }, []);

  const userName = useUserStore(state =>
    state.email ? state.email.split('@')[0] : 'Student',
  );
  const userImage = undefined; // Replace with actual image if available

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader
        title="Home"
        userName={userName}
        userImage={userImage || require('../../assets/images/consultant.png')}
        subtitle="start your productive day"
      />
      <ScrollView>
        <View style={{ paddingHorizontal: 12 }}>
          <TopCard />
        </View>
        <View style={styles.sectionConsultants}>
          <Text style={styles.sectionTitle}>Consultants</Text>
          {loadingConsultants ? (
            <Text>Loading consultants...</Text>
          ) : errorConsultants ? (
            <Text style={{ color: 'red' }}>{errorConsultants}</Text>
          ) : (
            <FlatList
              data={consultants}
              renderItem={({ item }) => (
                <RecommendedCard
                  name={item.name || item.fullName || item.email}
                  role={item.role || 'Consultant'}
                  rating={item.rating || 0}
                  consultantId={item._id}
                />
              )}
              keyExtractor={item =>
                item._id?.toString?.() || Math.random().toString()
              }
              numColumns={2}
              columnWrapperStyle={styles.consultantRow}
              contentContainerStyle={styles.consultantListContent}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<Text>No consultants found.</Text>}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
    justifyContent: 'space-between',
    marginBottom: 4,
    columnGap: 8, // Reduce center gap
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
  section: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  sectionConsultants: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 12, // Equal left/right spacing
  },
  consultantListContent: {
    paddingBottom: 10,
  },
  sectionTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
