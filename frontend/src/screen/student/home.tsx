import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ProfileHeader from '../../components/common/ProfileHeader';
import TopCard from '../../components/common/TopCard';
import RecommendedCard from '../../components/common/RecommendedCard';
import ServicesCard from '../../components/common/ServicesCard';
import api from '../../services/api';

const consultantData = [
  { id: '1', name: 'John Deering', role: 'Consultant', rating: 4.8 },
  { id: '2', name: 'Jane Smith', role: 'Consultant', rating: 4.5 },
  { id: '3', name: 'Alex Brown', role: 'Consultant', rating: 4.7 },
  { id: '4', name: 'Emily White', role: 'Consultant', rating: 4.9 },
];

const Home = () => {
  const [profile, setProfile] = React.useState<any>(null);
  const [services, setServices] = React.useState<any[]>([]);
  const [servicesLoading, setServicesLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile/me');
        setProfile(res.data);
      } catch (e) {
        setProfile(null);
      }
    };
    fetchProfile();
  }, []);

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        setServices(res.data);
      } catch (e) {
        setServices([]);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProfileHeader
        title="Pick a Consultant"
        userName={profile?.name}
        userImage={profile?.avatar}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Top Consultant</Text>
        <TopCard />
        <View style={styles.consultantRow}>
          <Text style={styles.consultantTitle}>Consultants</Text>
          <TouchableOpacity onPress={() => {}} style={styles.seeAllBtn}>
            <Text style={styles.seeAllBtnText}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centeredContent}>
          <FlatList
            data={consultantData}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.cardRow}
            renderItem={({ item }) => (
              <RecommendedCard
                name={item.name}
                role={item.role}
                rating={item.rating}
              />
            )}
            contentContainerStyle={styles.flatListContentContainer}
            showsVerticalScrollIndicator={false}
            style={styles.flatListFullWidth}
          />
        </View>
        {/* Services Section */}
        <Text style={styles.title}>Services</Text>
        {servicesLoading ? (
          <Text>Loading services...</Text>
        ) : services.length === 0 ? (
          <Text>No services found.</Text>
        ) : (
          <FlatList
            data={services}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.cardRow}
            renderItem={({ item }) => (
              <ServicesCard
                name={item.name}
                desc={item.desc}
                image={item.image}
              />
            )}
            contentContainerStyle={styles.flatListContentContainer}
            showsVerticalScrollIndicator={false}
            style={styles.flatListFullWidth}
          />
        )}
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
