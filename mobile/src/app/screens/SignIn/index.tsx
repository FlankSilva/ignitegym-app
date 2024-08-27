import { useState } from 'react';
import {
  Center,
  Heading,
  Image,
  Text,
  VStack,
  ScrollView,
  useToast,
} from '@gluestack-ui/themed';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import BackgroundImg from '@/assets/background.png';
import Logo from '@/assets/logo.svg';

import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';

import { AuthNavigatorRoutesProps } from '@/routes/auth.routes';
import { signInSchema } from './schemaValidators';
import { FormDataProps } from './interfaces';
import { useAuth } from '@/contexts/AuthContext';
import { AppError } from '@/utils/AppError';
import { ToastMessage } from '@/app/components/ToastMessage';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { signIn } = useAuth();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível realizar o login. Tente mais tarde.';

      setIsLoading(false);

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Login"
            description={title}
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          w="$full"
          h={624}
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          position="absolute"
        />

        <VStack flex={1} px={'$10'} pb={'$16'}>
          <Center my="$24">
            <Logo />

            <Text color="$gray100" fontSize="$sm">
              Trine sua mente e o seu corpo
            </Text>
          </Center>

          <Center gap={'$2'}>
            <Heading color="$gray100">Acesse a conta</Heading>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  returnKeyType="send"
                />
              )}
            />

            <Button
              title="Acessar"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          </Center>

          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Text
              color="$gray100"
              fontSize={'$sm'}
              mb={'$3'}
              fontFamily="$body"
            >
              Ainda não tem uma acesso?
            </Text>
          </Center>

          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
}
