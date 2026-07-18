import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../../theme/colors';
import Fonts from '../../theme/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  // Chrome,
  // Github,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
  const navigation=useNavigation<any>()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton}>
        <ArrowLeft size={24} color={Colors.text} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back! 👋</Text>
        <Text style={styles.subtitle}>Login to continue your journey</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>

        <TextInput
          placeholder="you@example.com"
          placeholderTextColor={Colors.textLight}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.passwordHeader}>
          <Text style={styles.label}>Password</Text>

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor={Colors.textLight}
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
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

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.line} />
      </View>

      {/* Social Login */}
      {/* <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={26} color="#EA4335" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="github" size={28} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={30} color="#000" />
        </TouchableOpacity>
      </View> */}

      {/* Bottom */}
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>New here? </Text>

        <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate("Signup")}>
          <Text style={styles.signUp}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
  },

  backButton: {
    marginTop: 10,
    width: 40,
  },

  header: {
    marginTop: 40,
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

  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },

  forgot: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: 15,
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

  loginButton: {
    marginTop: 25,
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.semiBold,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 35,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },

  dividerText: {
    marginHorizontal: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: 14,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  socialButton: {
    width: 95,
    height: 60,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
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

  signUp: {
    color: Colors.primary,
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
});
