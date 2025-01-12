import { Text, View, StyleSheet, Alert } from 'react-native';
import { CustomButtonX, SkeletonLoaderX } from 'react-native-reusable-ui';

export default function App() {
  return (
    <View style={styles.container}>
      <CustomButtonX
        title="Click Me"
        onPress={() => Alert.alert('Button Pressed!')}
        style={{ backgroundColor: 'green' }}
        textStyle={{ fontSize: 18, color: 'white' }}
        icon={<Text style={{ marginRight: 8 }}>🔥</Text>} // Optional Icon
        size="small"
      />

      <SkeletonLoaderX
        width="100%"
        height={200}
        borderRadius={10}
        animationStyle="wave"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
