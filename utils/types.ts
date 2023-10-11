import { Database } from '@/database.types';
import { Locale } from '@/i18n-config';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

// global types

export interface Lang {
  lang: Locale;
}

export type Account = Omit<Tables<'accounts'>, 'updated_at' | 'created_at'>;
export type Accounts = Array<Account>;
