'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { Loader } from '@/components/common/Loader';

const schema = zod.object({
  email: zod.string().min(1, { message: 'El correo es obligatorio' }).email({ message: 'Correo inválido' }),
  password: zod.string().min(1, { message: 'La contraseña es obligatoria' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: 'usuario@ejemplo.com', password: 'Usuario123' } satisfies Values;

// Utilidades para generar un JWT falso
function generateFakeJWT(payload: object): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encode = (obj: object) => btoa(JSON.stringify(obj)).replace(/=/g, '');

  return `${encode(header)}.${encode(payload)}.firma-falsa`;
}

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = (values: Values): void => {
    setIsPending(true);
    setLoading(true);

    const { email, password } = values;

    let role = '';
    if (email === 'usuario@ejemplo.com' && password === 'Usuario123') {
      role = 'user';
    } else if (email === 'admin@ejemplo.com' && password === 'Admin123') {
      role = 'admin';
    } else {
      setError('root', { type: 'manual', message: 'Correo o contraseña incorrectos' });
      setIsPending(false);
      setLoading(false);
      return;
    }

    const fakeToken = generateFakeJWT({
      email,
      role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hora de expiración
    });

    // Guarda el token en localStorage (opcional)
    sessionStorage.setItem('token', fakeToken);
    sessionStorage.setItem('role', role);


    setLoading(false);
    router.push(paths.dashboard.overview);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Iniciar sesión MediExpress</Typography>
        <Typography color="text.secondary" variant="body2">
          ¿No tienes una cuenta?{' '}
          <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
            Regístrate
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Correo electrónico</InputLabel>
                <OutlinedInput {...field} label="Correo electrónico" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Contraseña</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => setShowPassword(false)}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => setShowPassword(true)}
                      />
                    )
                  }
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <div>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Entrar
          </Button>
        </Stack>
      </form>
      <Alert color="warning">
        Usa los siguientes datos para probar:{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          usuario@ejemplo.com / Usuario123
        </Typography>{' '}
        o{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          admin@ejemplo.com / Admin123
        </Typography>
      </Alert>
    </Stack>
  );
}
