class CookieService {
  // Set a cookie with a given name, value, and expiration time in days
  setCookie(name: string, value: string, days: number): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = encodeURIComponent(value) + `; expires=${expirationDate.toUTCString()}; path=/`;

    document.cookie = `${name}=${cookieValue}`;
  }

  // Get the value of a cookie by name
  getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');

      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }

    return null;
  }

  // Remove a cookie by name
  removeCookie(name: string): void {
    this.setCookie(name, '', -1);
  }
}

export default new CookieService();