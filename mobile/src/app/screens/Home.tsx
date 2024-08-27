import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed';
import { HomeHeader } from '../components/HomeHeader';
import { Group } from '@/app/components/Group';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { ExerciceCard } from '../components/ExerciceCard';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@/routes/app.routes';

export function Home() {
  const [execices, setExecices] = useState([
    'Puxada frontal',
    'Remada curvada',
    'Remada unilateral',
    'Levantamento terra',
  ]);
  const [groups, setGroups] = useState(['Costa', 'Biceps', 'Triceps', 'Ombro']);
  const [groupSelected, setGroupSelected] = useState('Costas');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleLowerCase() === item.toLocaleLowerCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 32,
        }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />

      <VStack px={'$8'} flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize={'$md'} fontFamily="$heading">
            Exercícios
          </Heading>
          <Text color="$gray200" fontSize={'$sm'} fontFamily="$body">
            {execices.length}
          </Text>
        </HStack>

        <FlatList
          data={execices}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciceCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
