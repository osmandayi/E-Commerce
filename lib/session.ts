export const startSession = (user: any, jwt: any) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('jwt', jwt);
}