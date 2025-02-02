export class AuthService {
  private static readonly API_URL = process.env.REACT_APP_API_URL + '/auth';

  static async googleLogin(googleToken: string) {
    const response = await fetch(`${this.API_URL}/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ googleToken })
    });

    if (!response.ok) {
      throw new Error('Error en la autenticación');
    }

    return response.json();
  }
}