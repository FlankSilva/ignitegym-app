import * as Yup from 'yup';

export const signInSchema = Yup.object({
  email: Yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: Yup.string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 digitos.'),
});
