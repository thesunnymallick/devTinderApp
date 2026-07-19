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
const SignupScreen = () => {
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
    if (formData?.password.trim()) {
      newError.password = 'password is required';
    }

    setErrors(newError);

    return Object.keys(newError).length === 0;
  };

  const handleSignup = async () => {
    if (!isValidate()) return;
    try {
    } catch (error) {}
  };

  const isFormValid =
    formData?.firstName.trim() &&
    formData?.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData?.password.trim();

  return (
    <SafeAreaView style={styles.container}>
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
          style={styles.input}
          keyboardType="default"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="Last Name"
          placeholderTextColor={Colors.textLight}
          value={formData.lastName}
          onChangeText={value => handleOnChanged(value, 'lastName')}
          style={styles.input}
          keyboardType="default"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="you@example.com"
          placeholderTextColor={Colors.textLight}
          value={formData.email}
          onChangeText={value => handleOnChanged(value, 'email')}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor={Colors.textLight}
            secureTextEntry={secureText}
            value={formData.password}
            onChangeText={value => handleOnChanged(value, 'password')}
          />

          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            {secureText ? (
              <Eye size={22} color={Colors.textSecondary} />
            ) : (
              <EyeOff size={22} color={Colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        disabled={!isFormValid}
        style={[
          styles.signupButton,
          !isFormValid && { backgroundColor: Colors.grey300 },
        ]}
      >
        <Text style={styles.signupText}>Signup</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
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
    marginTop: 10,
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
    marginTop: 'auto',
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default SignupScreen;
