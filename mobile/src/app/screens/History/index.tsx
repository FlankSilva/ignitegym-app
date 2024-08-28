import { useCallback, useEffect, useState } from 'react';
import { SectionList } from 'react-native';
import { Heading, VStack, Text, useToast } from '@gluestack-ui/themed';

import { ScreenHeader } from '../../components/ScreenHeader';
import { HistoryCard } from '../../components/HistoryCard';
import { AppError } from '@/utils/AppError';
import { ToastMessage } from '@/app/components/ToastMessage';
import { api } from '@/service/api';
import { useFocusEffect } from '@react-navigation/native';
import { HistoryByDayDTO } from '@/dtos/HistoryByDayDTO';

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercices, setExecices] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      async function fetchHistory() {
        try {
          setIsLoading(true);
          const response = await api.get('/history');

          setExecices(response.data);
        } catch (error) {
          const isAppError = error instanceof AppError;

          const title = isAppError
            ? error.message
            : 'Não foi possível carregar o historico.';

          toast.show({
            placement: 'top',
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Erro ao carregar o historico"
                description={title}
                onClose={() => toast.close(id)}
              />
            ),
          });
        } finally {
          setIsLoading(false);
        }
      }

      fetchHistory();
    }, [toast]),
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryCard data={item} />}
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
