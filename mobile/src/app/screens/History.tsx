import { useState } from 'react';
import { SectionList } from 'react-native';
import { Heading, VStack, Text } from '@gluestack-ui/themed';

import { ScreenHeader } from '../components/ScreenHeader';
import { HistoryCard } from '../components/HistoryCard';

export function History() {
  const [exercices, setExecices] = useState([
    {
      title: '23.07.24',
      data: ['Puxada frontal', 'Remada unilateral'],
    },
    {
      title: '24.07.24',
      data: ['Puxada frontal'],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercices}
        keyExtractor={(item) => item}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="$gray200" fontSize={'$md'} mt={'$10'} mb={'$3'}>
            {section.title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          exercices.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="$gray100" textAlign="center">
            Não há exercícios registrados ainda. {'\n'}Vamos treinar?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
