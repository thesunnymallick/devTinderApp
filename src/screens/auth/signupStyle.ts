
import { StyleSheet } from "react-native";
import Colors from "../../theme/colors";
import Fonts from "../../theme/fonts";

export const styles = StyleSheet.create({
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