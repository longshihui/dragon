function warn(...messages: string[]) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(messages);
  }
}

export { warn };
