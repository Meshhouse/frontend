type Store = {
  error: {
    visible: boolean;
    message: string;
  },
  theme: 'light' | 'dark',
  setError(visible: boolean, message: string): void,
  setTheme(theme: 'light' | 'dark'): void
}

export const createStore = (): Store => {
  const store: Store = {
    error: {
      visible: false,
      message: ''
    },
    theme: 'light',
    setError(visible: boolean, message: string) {
      this.error = {
        visible,
        message
      };
    },
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme;
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>
