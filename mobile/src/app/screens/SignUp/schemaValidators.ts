import * as Yup from 'yup';

export const signUpSchema = Yup.object({
  name: Yup.string().required('Informe o nome.'),
  email: Yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: Yup.string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 digitos.'),

  password_confirm: Yup.string()
    .required('Confirme a senha.')
    .oneOf([Yup.ref('password'), ''], 'As senhas devem ser iguais.'),
});
