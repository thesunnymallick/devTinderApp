import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { signupAPI } from '../../services/authServices';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const [isLoading, setIsLoading]=useState(false);
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
      const responces = await signupAPI(payload);

    } catch (error) {
      console.log(error)
    }
    finally{
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
       <View style={{paddingHorizontal:24,}}>
       <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
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
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
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
            keyboardType='default'
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
      <View style={[styles.bottomSheet,    { paddingBottom: insets.bottom + 10 },]}>
      <TouchableOpacity
        activeOpacity={1}
        disabled={!isFormValid }
        onPress={handleSignup}
        style={[
          styles.signupButton,
          !isFormValid && { backgroundColor: Colors.grey300 },
        ]}
      >
        <Text style={styles.signupText}>
          {isLoading ? "Loading...." :"Signup"}
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
     
   
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backBuuton: {
    marginTop: 10,
    width: 40,
  },

  header: {
    marginTop: 20,
    marginBottom: 40,
  },

  title: {
    fontSize: 34,
    fontFamily: Fonts.bold,
    color: Colors.text,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontFamily: Fonts.medium,
    color: Colors.text,
    marginBottom: 10,
  },

  input: {
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingHorizontal: 18,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.text,
  },

  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingHorizontal: 18,
    height: 56,
  },

  passwordInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text,
  },
   
  bottomSheet:{
   backgroundColor:Colors.grey50,
   paddingVertical:10,
   paddingHorizontal:24,
  },

  signupButton: {
    marginTop: 25,
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signupText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.semiBold,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:24,
  },

  bottomText: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },

  login: {
    color: Colors.primary,
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },

  errorText: {
    fontSize: 12,
    color: 'red',
    fontFamily: Fonts.regular,
  },
});

export default SignupScreen;
