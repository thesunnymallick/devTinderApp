import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import Colors from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { signupAPI } from '../../services/authServices';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './signupStyle';
import CommonModal from '../../components/CommonModal';

const SignupScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [secureText, setSecureText] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    title: '',
    message: '',
    animation: null,
  });

  const handleOnChanged = (value: string, type: string) => {
    setFormData({ ...formData, [type]: value });
  };

  const isValidate = () => {
    let newError: any = {};
    if (!formData?.firstName?.trim()) {
      newError.firstName = 'First name is required';
    }
    if (!formData?.email?.trim()) {
      newError.email = 'email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newError.email = 'email is not valid';
    }
    if (!formData?.password.trim()) {
      newError.password = 'password is required';
    }

    setErrors(newError);

    return Object.keys(newError).length === 0;
  };

  const handleCloseModal=()=>{
    setTimeout(()=>{
      setModal({
        visible:false,
        title: "",
        message: "",
        animation: null,
      })
    },3000)
  }

  const handleSignup = async () => {
    setIsLoading(true);
    if (!isValidate()) return;
    try {
      const payload = {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        emailId: formData?.email,
        password: formData?.password,
      };
      const { status } = await signupAPI(payload);
      if (status === 200 || status === 201) {
        setModal({
          visible: true,
          title: 'Success 🎉',
          message: 'Your account has been created successfully.',
          animation: require('../../assets/lottie/doneLottie.json'),
        });
        handleCloseModal()
        setTimeout(()=>{
          navigation.navigate("Login")
        },5000)
    

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.log(error);
      setModal({
        visible: true,
        title: 'Oops!',
        message: 'Something went wrong.',
        animation: require('../../assets/lottie/errorLottie.json'),
      });
      handleCloseModal()
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData?.firstName.trim() &&
    formData?.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData?.password.trim();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={30}
        contentContainerStyle={{
          flexGrow: 1,
          // paddingBottom: 24,
          paddingBottom: 180,
        }}
      >
        <View style={{ paddingHorizontal: 24 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account 🚀</Text>
            <Text style={styles.subtitle}>join devTider Today</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="First Name"
              placeholderTextColor={Colors.textLight}
              value={formData.firstName}
              onChangeText={value => handleOnChanged(value, 'firstName')}
              style={[styles.input, errors.firstName && { borderColor: 'red' }]}
              keyboardType="default"
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Last Name"
              placeholderTextColor={Colors.textLight}
              value={formData.lastName}
              onChangeText={value => handleOnChanged(value, 'lastName')}
              style={[styles.input, errors.lastName && { borderColor: 'red' }]}
              keyboardType="default"
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor={Colors.textLight}
              value={formData.email}
              onChangeText={value => handleOnChanged(value, 'email')}
              style={[styles.input, errors.email && { borderColor: 'red' }]}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordBox}>
              <TextInput
                style={[
                  styles.passwordInput,
                  errors.password && { borderColor: 'red' },
                ]}
                placeholder="Enter your password"
                placeholderTextColor={Colors.textLight}
                secureTextEntry={secureText}
                value={formData.password}
                onChangeText={value => handleOnChanged(value, 'password')}
                keyboardType="default"
              />

              <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                {secureText ? (
                  <Eye size={22} color={Colors.textSecondary} />
                ) : (
                  <EyeOff size={22} color={Colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>
        </View>
        <View
          style={[styles.bottomSheet, { paddingBottom: insets.bottom + 10 }]}
        >
          <TouchableOpacity
            activeOpacity={1}
            disabled={!isFormValid || isLoading}
            onPress={handleSignup}
            style={[
              styles.signupButton,
              !isFormValid && { backgroundColor: Colors.grey300 },
            ]}
          >
            <Text style={styles.signupText}>
              {isLoading ? 'Loading....' : 'Signup'}
            </Text>
          </TouchableOpacity>

          <View style={styles.bottom}>
            <Text style={styles.bottomText}>Already have account? </Text>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <CommonModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        animation={modal.animation}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
};

export default SignupScreen;
