import { ReactNode } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function AuthForm({
  title,
  description,
  children,
}: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  form: {
    width: '100%',
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: colors.muted,
    fontSize: 15,
    marginBottom: 30,
  },
});