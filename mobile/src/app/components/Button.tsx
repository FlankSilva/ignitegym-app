import {
  Button as GluestackButton,
  Text,
  ButtonSpinner,
} from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  variant?: 'solid' | 'outline';
  isLoading?: boolean;
};

export function Button({
  title,
  isLoading,
  variant = 'solid',
  ...rest
}: Props) {
  return (
    <GluestackButton
      w="$full"
      h={'$14'}
      bg={variant === 'outline' ? 'transparent' : '$green700'}
      borderWidth={variant === 'outline' ? '$1' : '$0'}
      borderColor="$green500"
      $active-bg={variant === 'outline' ? '$gray500' : '$green500'}
      disabled={isLoading}
      opacity={isLoading ? 0.5 : 1}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color={'$white'} />
      ) : (
        <Text
          color={variant === 'outline' ? '$green500' : '$white'}
          fontFamily="$heading"
          fontSize={'$sm'}
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  );
}
