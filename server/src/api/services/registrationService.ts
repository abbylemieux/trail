import axios from 'axios';

const REGISTRATION_ENDPOINT = process.env.REGISTRATION_API_URL as string;

interface RegistrationData {
  email: string;
  password: string;
  objectId?: string; // Optional for guest logins
}

export async function registrationService(data: RegistrationData): Promise<any> {
  try {
    const response = await axios.post(
      REGISTRATION_ENDPOINT,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    const err = error as any;
    throw new Error(err.response?.data?.message || 'Registration failed');
  }
}