import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

import  icons  from "../constants/icons";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.label}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyehide}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 3,
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 7,
    fontFamily: "Poppins-Medium",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    maxWidth: 350,
    height: 55,
    paddingHorizontal: 10,
    backgroundColor: "#2a3447",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B5C1D8",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default FormField;
