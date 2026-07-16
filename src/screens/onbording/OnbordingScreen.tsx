import React, {useEffect, useRef, useState} from 'react';
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
import Fonts from '../../theme/fonts';
import Colors from '../../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
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

const OnboardingScreen = () => {
  const navigation=useNavigation<any>()
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
      navigation.navigate("Auth");
    }
  };

  const handleSkip=()=>{
    navigation.navigate("Auth")
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < onboardingData.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }
    }, 3000); 
  
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
         <TouchableOpacity
          onPress={handleSkip}
          style={styles.skipConatiner}
         >
          <Text style={styles.skipText}>Skip</Text>
         </TouchableOpacity>
      </View>
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
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    // paddingHorizontal:24,
  },

  page: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:24,
  },

  image: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 24,
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
    marginTop: 20,
    color: Colors.text,
  },

  description: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 12,
    paddingHorizontal: 10,
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
    backgroundColor: Colors.grey300,
    marginHorizontal: 4,
  },

  activeDot: {
    width: 24,
    backgroundColor: Colors.primary,
  },

  button: {
    backgroundColor: Colors.primary,
    marginHorizontal: 24,
    marginVertical: 30,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.semiBold,
  },
  skipConatiner:{
    alignItems:"flex-end",
    paddingHorizontal:24,
  },
   skipText:{
     color:Colors.text,
     fontSize:18,
     marginVertical:16,
     fontFamily:Fonts.medium
   }
 
});