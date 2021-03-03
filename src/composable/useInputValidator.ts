import { ref, watch } from 'vue';
import axios from 'axios';

export const minLength = (min: number) => {
  return (input: string | any[]) =>
    input.length < min ? `Value must be at least ${min} characters` : null;
};

export const isEmail = () => {
  console.log('email validator');
  const re = /\S+@\S+\.\S+/;
  return (input: string) =>
    re.test(input) ? null : 'Must be a valid email address';
};

export const isEmailAvailable = () => {
  return async (input: any): Promise<any> => {
    console.log(isEmail()(input));
    if (isEmail()(input) !== null) return;
    const response = await axios.get(
      `http://127.0.0.1:8000/auth/users/is_email_busy/${input}/`,
    );
    console.log(response);
    return response.data.message;
  };
};

const validators = {
  minLength,
  isEmail,
};

export default function (
  startVal: any,
  validators: any[],
  onValidate: (arg0: { [x: string]: any }) => void,
) {
  const input = ref(startVal);
  const errors = ref([] as any[]);
  watch(input, async (value) => {
    //errors.value = validators.map((validator: any) => validator(value));
    errors.value = await Promise.all(
      validators.map((validator: any) => validator(value)),
    );
    onValidate(value);
  });

  return {
    input,
    errors,
  };
}
