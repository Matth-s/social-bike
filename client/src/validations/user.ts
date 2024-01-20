import { z } from 'zod';

export const signupValidation = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Champ requis')
    .email('Email invalide'),
  password: z
    .string()
    .refine((value) => value.length >= 8, {
      message:
        "Le mot de passe doit avoir une longueur d'au moins 8 caractères",
    })
    .refine((value) => /[a-z]/.test(value), {
      message:
        'Le mot de passe doit contenir au moins une lettre minuscule',
    })
    .refine((value) => /[A-Z]/.test(value), {
      message:
        'Le mot de passe doit contenir au moins une lettre majuscule',
    })
    .refine((value) => /\d/.test(value), {
      message: 'Le mot de passe doit contenir au moins un chiffre',
    })
    .refine((value) => /[!@#$%^&*()_+]/.test(value), {
      message:
        'Le mot de passe doit contenir au moins un caractère spécial',
    }),
  username: z
    .string()
    .trim()
    .min(3, '3 caractères minimun')
    .max(20, '20 caractères maximun'),
  avatar: z.any(),
  description: z.string(),
});

export const signinValidation = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Champ requis')
    .email('Email invalide'),
  password: z.string().trim().min(1, 'Champ requis'),
});
