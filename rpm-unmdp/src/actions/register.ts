'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { saltAndHashPassword } from '@/lib/password';
import { DocType, StudentStatus } from '@/generated/prisma/client';
import { validateNewUserInfo } from '@/services/user';

const RegisterSchema = z.object({
  firstName: z.string().min(2, 'Nombre muy corto'),
  lastName: z.string().min(2, 'Apellido muy corto'),
  email: z.email('Email inválido'),
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
      errors: validatedFields.error.flatten((issue) => issue.message).fieldErrors,
      message: 'Faltan campos o son inválidos.',
      success: false,
    };
  }

  const { email, password, firstName, lastName, docType, docNumber } = validatedFields.data;

  try {
    const conflict = await validateNewUserInfo(email, docType, docNumber);

    if (conflict) {
      if (conflict.isDeleted) {
        return { 
          message: "Esta cuenta existía anteriormente. Contacta a soporte para reactivarla.",
          success: false,
        };
      }
      return {
        message: conflict.error,
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