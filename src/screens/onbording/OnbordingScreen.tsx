import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import onboarding1 from "../../assets/images/onboarding1.png"
export const onboardingData = [
  {
    id: '1',
    title: 'Meet Developers Like You',
    description:
      'Swipe through talented developers and build meaningful tech connections.',
    image: onboarding1,
  },
  {
    id: '2',
    title: 'Connect & Collaborate',
    description:
      'Chat with developers, collaborate on projects and grow together.',
    image: onboarding1,
  },
  {
    id: '3',
    title: 'Build Your Dream Team',
    description:
      'Find teammates, mentors, and coding partners for your next big idea.',
    image: onboarding1,
  },
];

const {width} = Dimensions.get('window');

const OnboardingScreen = ({navigation}: any) => {
  const flatListRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / width,
    );

    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({item}) => (
          <View style={styles.page}>
            <Image source={item.image} style={styles.image} />

            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>
          </View>
        )}
      />

      {/* Pagination */}

      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* Button */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === onboardingData.length - 1
            ? 'Get Started'
            : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  page: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  image: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    color: '#111827',
  },

  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 12,
    paddingHorizontal: 20,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },

  activeDot: {
    width: 24,
    backgroundColor: '#FF4458',
  },

  button: {
    backgroundColor: '#FF4458',
    marginHorizontal: 24,
    marginVertical: 30,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});