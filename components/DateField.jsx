import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';

const DateField = ({ value, onChangeText }) => {
  const handleChangeText = (text) => {
    // Replace any non-numeric characters (except '/')
    text = text.replace(/[^0-9/]/g, '');

    // Add '/' automatically after the second and fifth character
    if ((text.length === 3 && text.charAt(text.length - 1) !== '/') || (text.length === 6 && text.charAt(text.length - 1) !== '/')) {
        text = text.substring(0, text.length - 1) + '/' + text.charAt(text.length - 1);
      }
      

    // Update the state with the formatted text
    onChangeText(text);
  };

  const handleBackspace = () => {
    // Get the index of the character before the last '/'
    const index = value.lastIndexOf('/') - 1;
  
    // Check if the character before the last '/' is a number
    if (!isNaN(value[index])) {
      // Remove the character before the last '/' and the '/'
      onChangeText(value.slice(0, index) + value.slice(index + 2));
    } else {
      // If the character before the last '/' is not a number, remove only the '/'
      onChangeText(value.slice(0, -1));
    }
  };
  


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/YYYY"
        placeholderTextColor="#999" // Placeholder text color
        value={value}
        keyboardType='numeric'
        onChangeText={handleChangeText}
        maxLength={10} // Limit the input length to 10 characters (DD/MM/YYYY)
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Backspace') {
            handleBackspace();
          }
        }}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // Add styling for the container if needed
  },
  input: {
    height: 40,
    width: 160,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
    marginBottom:15,
  },
});

export default DateField;
