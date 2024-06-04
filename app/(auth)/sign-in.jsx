import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import FormField from '../../components/FormField';

import images from '../../constants/images';
import CustomButton from '../../components/SignButton';
import { Link, router } from 'expo-router';

const SignIn = ({ navigation }) => {
  const [form,setForm] = useState({
    // email:'',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit=()=>{

  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.content}>
          
          <Image 
            source={images.logo2}
            style={styles.logo}
            resizeMode='contain' 
          />

          {/* <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles={{ marginTop: -70 }}
          /> */}

          <Text style={styles.title}>Welcome back,</Text>
          <Text style={styles.title1}>Tracker!</Text>

          <CustomButton
            title="Home"
            handlePress={() => router.push('/home')}
            // handlePress={() => navigation.navigate('Home')}
            // handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
  title:{
    color: '#ffff',
    fontFamily:"Poppins-Medium",
    fontSize: 30,
    fontStyle: 'italic',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: -60
  },
  title1:{
    color: '#ffff',
    fontFamily:"Poppins-Medium",
    fontSize: 30,
    fontStyle: 'italic',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: -10,
    marginBottom: 40,

  },
  container: {
    flex: 1,
    backgroundColor: '#222b3c',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    minHeight: '83vh',
    marginTop: height/5000,
  },
  logo:{
    resizeMode: 'contain',
    width: '65%',
    height: '65%',
    marginTop: height * 0.1,
    marginBottom: 0.001,
    // backgroundColor: '#ffff',
  }
});

export default SignIn;
