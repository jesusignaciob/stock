import { reactive } from "vue";

interface AppState {
  theme: string;
  darkTheme: boolean;
}

interface AppWithAppState {
  config: {
    globalProperties: {
      $appState?: AppState;
    };
  };
}

export default {
  install: (app: AppWithAppState) => {
    const _appState: AppState = reactive({ theme: "Aura", darkTheme: false });

    app.config.globalProperties.$appState = _appState;
  },
};
