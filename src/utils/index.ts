export const isDev = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

export function warn(...messages: string[]) {
    if (isDev) {
        console.warn(messages);
    }
}
