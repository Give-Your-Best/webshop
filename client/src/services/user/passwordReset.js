import { getAutoEmailContent } from '../../utils/helpers';

export const passwordReset = async (email) => {
  try {
    const response = await fetch('/api/auth/passwordreset', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
        emailContent: getAutoEmailContent('password_reset'),
      }),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in passwordreset: ${error}`);
    return error;
  }
};
