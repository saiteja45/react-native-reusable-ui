import { Text, StyleSheet, Alert, ScrollView } from 'react-native';
import {
  CustomButtonX,
  SkeletonLoaderX,
  AutocompleteTextInputX,
} from 'react-native-reusable-ui';

export default function App() {
  const suggestions = [
    'React Native',
    'React',
    'Redux',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Express',
    'MongoDB',
    'SQL',
    'GraphQL',
  ];
  const handleSelect = (value: string) => {
    console.log('Selected:', value);
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
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

      <AutocompleteTextInputX
        suggestions={suggestions}
        onSelect={handleSelect}
        displayMode="dropdown"
      />
      <AutocompleteTextInputX
        suggestions={suggestions}
        onSelect={handleSelect}
        displayMode="modal"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '22%',
    width: 'auto',
  },
});
