import { z } from 'zod';

const nameSchema = z.string().trim().min(2, 'Please enter at least 2 characters.').max(100, 'Name must be 100 characters or fewer.');
const emailSchema = z.string().trim().max(254, 'Email address must be 254 characters or fewer.').email('Please enter a valid email address.');

function isValidPhone(value: string): boolean {
  const digitCount = value.replace(/\D/g, '').length;
  return /^[+]?[0-9 .()-]+$/.test(value) && digitCount >= 7 && digitCount <= 15;
}

const phoneSchema = z.string()
  .trim()
  .min(1, 'Please enter a phone number.')
  .max(20, 'Phone number must be 20 characters or fewer.')
  .refine(isValidPhone, 'Please enter a valid phone number.');

const optionalPhoneSchema = z.string()
  .trim()
  .max(20, 'Phone number must be 20 characters or fewer.')
  .refine((value) => value === '' || isValidPhone(value), 'Please enter a valid phone number.')
  .optional()
  .transform((value) => value ?? '');

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: optionalPhoneSchema,
  subject: z.string().trim().max(150, 'Subject must be 150 characters or fewer.').optional().transform((value) => value ?? ''),
  message: z.string().trim().min(10, 'Message must be at least 10 characters.').max(5000, 'Message must be 5000 characters or fewer.'),
});

export const careersFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: optionalPhoneSchema,
  position: z.string().trim().min(2, 'Please select a position.').max(150, 'Position must be 150 characters or fewer.'),
  experience: z.enum(['0-1', '2-5', '6-10', '10+']).or(z.literal('')).optional().transform((value) => value ?? ''),
  message: z.string().trim().min(20, 'Cover note must be at least 20 characters.').max(5000, 'Cover note must be 5000 characters or fewer.'),
});

export const admissionsFormSchema = z.object({
  parentName: nameSchema,
  childName: nameSchema,
  childAge: z.preprocess(
    (value) => typeof value === 'string' && value.trim() !== '' ? Number(value) : value,
    z.number().int().min(2).max(18),
  ),
  grade: z.enum(['Nursery', 'LKG', 'UKG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5']),
  phone: phoneSchema,
  email: emailSchema,
  source: z.enum(['Online Ads', 'Social Media', 'Residential Complex', 'Event / Workshop', 'Trium Parent - Referral', 'Others']),
});
