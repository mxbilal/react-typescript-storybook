// .storybook/FormikForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import FormikForm from './FormikForm';
import * as Yup from 'yup';

const meta = {
  title: 'Example/FormikForm',
  component: FormikForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} satisfies Meta<typeof FormikForm>;

export default meta;
type Story = StoryObj<typeof meta>;
export const SingleForm: Story = {
  args: {
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      gender: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      gender: Yup.string().required('Gender is required'),
    }),
    formFields: [
      {
        title: "Personal Information",
        fields: [
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'first_name', label: 'First Name', type: 'text' },
          { name: 'last_name', label: 'Last Name', type: 'text' },
          {
            name: 'gender', label: 'Gender', type: 'radio', options: [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' }
            ]
          },
        ]
      },
    ],
    onSubmit: (values: any) => {
      console.log(values)
    },
  },
};

export const MultiForm: Story = {
  args: {
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      country: '',
      state: '',
      city: '',
      gender: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      country: Yup.string().required('Country is required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      gender: Yup.string().required('Gender is required'),
    }),
    formFields: [
      {
        title: "Personal Information",
        fields: [
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'first_name', label: 'First Name', type: 'text' },
          { name: 'last_name', label: 'Last Name', type: 'text' },
          {
            name: 'gender', label: 'Gender', type: 'radio', options: [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' }
            ]
          },
        ]
      },
      {
        title: "Address Information",
        fields: [
          {
            name: 'country', label: 'Country', type: 'select', options: [
              { value: 'Pakistan', label: 'pk' },
              { value: 'Saudi Arabia', label: 'sa' },
              { value: 'United States', label: 'us' },
            ]
          },
          { name: 'state', label: 'State', type: 'text' },
          { name: 'city', label: 'City', type: 'text' },
        ]
      },
    ],
    onSubmit: (values: any) => {
      console.log(values)
    },
  },
};
