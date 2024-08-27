import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Heading, HStack, Text, useToast, VStack } from '@gluestack-ui/themed';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { HomeHeader } from '../components/HomeHeader';
import { Group } from '@/app/components/Group';
import { ExerciceCard } from '../components/ExerciceCard';
import { ToastMessage } from '../components/ToastMessage';

import { AppNavigatorRoutesProps } from '@/routes/app.routes';
import { AppError } from '@/utils/AppError';
import { api } from '@/service/api';

import { ExerciseDTO } from '@/dtos/ExerciseDTO';

export function Home() {
  const [execices, setExecices] = useState<ExerciseDTO[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState('antebraço');

  console.log(execices);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

  useEffect(() => {
    async function featchGroups() {
      try {
        const response = await api.get('/groups');
        setGroups(response.data);
      } catch (error) {
        const isAppError = error instanceof AppError;

        const title = isAppError
          ? error.message
          : 'Não foi possível carregar os grupos. Tente mais tarde.';

        toast.show({
          placement: 'top',
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="error"
              title="Erro ao carregar os grupos"
              description={title}
              onClose={() => toast.close(id)}
            />
          ),
        });
      }
    }

    featchGroups();
  }, [toast]);

  useFocusEffect(
    useCallback(() => {
      async function featchExercisesByGroup() {
        try {
          const response = await api.get(
            `/exercises/bygroup/${groupSelected.toLocaleLowerCase()}`,
          );

          setExecices(response.data);
        } catch (error) {
          const isAppError = error instanceof AppError;

          const title = isAppError
            ? error.message
            : 'Não foi possível carregar os grupos. Tente mais tarde.';

          toast.show({
            placement: 'top',
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Erro ao carregar os grupos"
                description={title}
                onClose={() => toast.close(id)}
              />
            ),
          });
        }
      }

      featchExercisesByGroup();
    }, [groupSelected, toast]),
  );

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
          keyExtractor={(item) => item.id}
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
