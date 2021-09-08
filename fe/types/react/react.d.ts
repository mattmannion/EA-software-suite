import IntrinsicAttributes from 'react';
declare module react {
  interface IntrinsicAttributes {
    getFormData: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      username: string;
      permissions: string;
      confirmed: boolean;
    };
  }
}
