import {
  Input as GluestackInput,
  InputField,
  FormControl,
  FormControlErrorText,
  FormControlError,
} from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  isReadOnly?: boolean;
};

export function Input({
  isReadOnly = false,
  errorMessage = null,
  isInvalid = false,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} w={'$full'} mb={'$2'}>
      <GluestackInput
        h={'$14'}
        borderWidth={'$0'}
        borderRadius={'$md'}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? '$red500' : '$green500',
        }}
        $invalid={{
          borderWidth: 1,
          borderColor: '$red500',
        }}
      >
        <InputField
          bg="$gray700"
          px={'$4'}
          color="$white"
          fontFamily="$body"
          placeholderTextColor={'$gray300'}
          {...rest}
        />
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
