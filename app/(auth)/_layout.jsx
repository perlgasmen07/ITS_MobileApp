import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false
          }}
          
        />
        <Stack.Screen
          name="existTrackReg"
          options={{
            headerShown: false
          }}
          initialParams={{ itemIdPass: 1 }}
        />
        {/* from testing to existTrackReg, parameter = itemId */}
        <Stack.Screen
          name="testing"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="existTrackCons"
          options={{
            headerShown: false
          }}
          initialParams={{ itemIdPass: 1 }}
        />
      
        <Stack.Screen
          name="storageLists"
          options={{
            headerShown: false
          }}
          initialParams={{ itemId: 1 }}

        />
        <Stack.Screen
          name="itemLists"
          options={{
            headerShown: false
          }}
          initialParams={{ mediumId: 1 }}

        />
        <Stack.Screen
          name="newItem"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="editETC"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="editETR"
          options={{
            headerShown: false,
            gestureEnabled: false  // Disable swipe back gesture
          }}
        />
        <Stack.Screen
          name="existUntrack"
          options={{
            headerShown: false
          }}
          initialParams={{ itemIdPass: 1 }}
        />
        <Stack.Screen
          name="editUntrack"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="storageMed"
          options={{
            headerShown: false
          }}
          initialParams={{ mediumIdPass: 1 }}
        />
        <Stack.Screen
          name="storageEdit"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="scanPage"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="editItem"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="unexist"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="camScreen"
          options={{
            headerShown: false
          }}
        />
      </Stack>
      <StatusBar backgroundColor='#222b3c' style='light' />
    </>
  );
};

export default AuthLayout;