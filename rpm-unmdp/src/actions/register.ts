// src/actions/register.ts
'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { saltAndHashPassword } from '@/lib/password';
import { DocType, StudentStatus } from '@/generated/prisma/client';

const RegisterSchema = z.object({
  firstName: z.string().min(2, 'Nombre muy corto'),
  lastName: z.string().min(2, 'Apellido muy corto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  docType: z.enum(DocType),
  docNumber: z.string().min(7, 'Documento inválido'),
});

export type RegisterState = {
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function registerUser(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
  const validatedFields = RegisterSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    docType: formData.get('docType'),
    docNumber: formData.get('docNumber'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos o son inválidos.',
      success: false,
    };
  }

  const { email, password, firstName, lastName, docType, docNumber } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { docType: docType, docNumber: docNumber }
        ]
      }
    });

    if (existingUser) {
      return {
        message: 'El usuario ya existe (Email o DNI repetido).',
        success: false,
      };
    }

    const hashedPassword = await saltAndHashPassword(password);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        docType,
        docNumber,
        isAdmin: false,
        studentStatus: StudentStatus.PENDING,
      },
    });

    return { success: true, message: '¡Usuario creado! Ya podés iniciar sesión.' };

  } catch (error) {
    console.error('Error de registro:', error);
    return {
      message: 'Error en la base de datos.',
      success: false,
    };
  }
}