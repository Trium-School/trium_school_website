import { describe, expect, it } from 'vitest';

import { admissionsFormSchema, careersFormSchema, contactFormSchema } from '../form-validation';

describe('contact form validation', () => {
  it('trims fields and accepts valid optional fields', () => {
    const result = contactFormSchema.safeParse({
      name: '  Alex Example ',
      email: ' alex@example.com ',
      phone: '+91 98765 43210',
      subject: ' School visit ',
      message: ' I would like to know more. ',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Alex Example');
      expect(result.data.email).toBe('alex@example.com');
      expect(result.data.subject).toBe('School visit');
    }
  });

  it('rejects invalid email, blank names, and short messages', () => {
    const result = contactFormSchema.safeParse({
      name: '  ',
      email: 'not-an-email',
      message: 'Hi',
    });

    expect(result.success).toBe(false);
  });

  it('rejects malformed optional phone numbers', () => {
    const result = contactFormSchema.safeParse({
      name: 'Alex Example',
      email: 'alex@example.com',
      phone: 'call me',
      message: 'Please contact me about admissions.',
    });

    expect(result.success).toBe(false);
  });
});

describe('careers form validation', () => {
  it('accepts an application with an optional experience value', () => {
    const result = careersFormSchema.safeParse({
      name: 'Alex Example',
      email: 'alex@example.com',
      phone: '',
      position: 'Primary Teacher',
      experience: '2-5',
      message: 'I would be excited to contribute to the school.',
    });

    expect(result.success).toBe(true);
  });

  it('rejects unsupported experience values and short cover notes', () => {
    const result = careersFormSchema.safeParse({
      name: 'Alex Example',
      email: 'alex@example.com',
      position: 'Teacher',
      experience: '20',
      message: 'Interested.',
    });

    expect(result.success).toBe(false);
  });
});

describe('admissions form validation', () => {
  const validEnquiry = {
    parentName: 'Alex Example',
    childName: 'Jamie Example',
    childAge: '5',
    grade: 'UKG',
    phone: '+91 98765 43210',
    email: 'alex@example.com',
    source: 'Social Media',
  };

  it('coerces age input to an integer', () => {
    const result = admissionsFormSchema.safeParse(validEnquiry);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.childAge).toBe(5);
    }
  });

  it.each(['1', '18.5', 'not-an-age'])('rejects invalid child age %s', (childAge) => {
    const result = admissionsFormSchema.safeParse({ ...validEnquiry, childAge });

    expect(result.success).toBe(false);
  });

  it('rejects unsupported grades and invalid phone numbers', () => {
    expect(admissionsFormSchema.safeParse({ ...validEnquiry, grade: 'Grade 6' }).success).toBe(false);
    expect(admissionsFormSchema.safeParse({ ...validEnquiry, phone: '123' }).success).toBe(false);
  });
});
