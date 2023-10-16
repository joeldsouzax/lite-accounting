/*
 * Filename: /Users/joel/Code/start-up/lite-accounting/app/[lang]/home/accounts/account-select.tsx
 * Path: /Users/joel/Code/start-up/lite-accounting
 * Created Date: Wednesday, October 11th 2023, 4:06:25 pm
 * Author: Joel Dsouza
 *
 * Copyright (c) 2023 Your Company
 */

'use client';

import { FC } from 'react';
import { useSearchFetch } from '@/hooks';
import { Account } from '@/utils/types';
import { ACCOUNTS_API } from '@/constants';
import AsyncSelect from 'react-select/async';
import { components, DropdownIndicatorProps } from 'react-select';
import {} from 'react-icons/';
import clsx from 'clsx';

interface AccountSelectProps {
  placeholder: string;
  name: string;
  account?: Account;
  focus: 'primary' | 'secondary';
}

const placeholderStyles = 'text-gray-500';
const singleValueStyles = 'leading-7 ml-1';
const clearIndicatorStyles = 'btn btn-sm btn-ghost';
const dropdownIndicatorStyles = 'btn btn-sm btn-ghost';
const menuStyles = 'menu bg-base-200 rounded-box';
const groupHeadingStyles = 'text-label';
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded',
  focus: 'bg-gray-100 active:bg-gray-200',
  selected:
    "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
};
const noOptionsMessageStyles =
  'p-2 border border-dashed border-secondary rounded-sm';

const AccountSelect: FC<AccountSelectProps> = ({
  placeholder,
  name,
  focus = 'primary',
  account = null,
}) => {
  const controlStyles = {
    base: 'input input-bordered',
    focus: clsx(
      focus === 'primary'
        ? 'border-primary ring-primary'
        : 'border-secondary ring-secondary',
      'ring-1'
    ),
    nonFocus: 'border-gray-300 hover:border-gray-400',
  };
  const { data, error, isLoading, setSearchTerm } =
    useSearchFetch<Account[]>(ACCOUNTS_API);

  const getAccounts = () => {
    if (!data) return [{}];
    return data.map((account) => ({
      label: `${account.account_code} - ${account.name}`,
      value: `${account.id}`,
    }));
  };

  return (
    <AsyncSelect
      isClearable
      unstyled
      isSearchable
      cacheOptions
      defaultOptions={getAccounts()}
      closeMenuOnSelect
      hideSelectedOptions
      isLoading={data === undefined || isLoading}
      loadOptions={async (inputSearchValue) => {
        setSearchTerm(inputSearchValue);
        return getAccounts();
      }}
      styles={{
        input: (base) => ({
          ...base,
          'input:focus': {
            boxShadow: 'none',
          },
        }),
        // On mobile, the label will truncate automatically, so we want to
        // override that behaviour.
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: 'normal',
          overflow: 'visible',
        }),
        control: (base) => ({
          ...base,
          transition: 'none',
        }),
      }}
      classNames={{
        control: ({ isFocused }) =>
          clsx(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base
          ),
        placeholder: () => placeholderStyles,
        singleValue: () => singleValueStyles,
        clearIndicator: () => clearIndicatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          clsx(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
      onChange={(props) => console.log(props)}
    />
  );
};

export default AccountSelect;
