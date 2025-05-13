import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import router from "./router";

import Noir from "./presets/Noir.ts";
import { InputText, Button, Select, Tag, DatePicker, Chip, MultiSelect, Dialog, Divider, ProgressBar, Message, Badge, Card, InputIcon } from "primevue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: "p",
      darkModeSelector: ".p-dark",
      cssLayer: false,
    },
  },
});


app.component('InputText', InputText);
app.component('Dropdown', Select);
app.component('Button', Button);
app.component('Tag', Tag);
app.component('Chip', Chip);
app.component('MultiSelect', MultiSelect);
app.component('DatePicker', DatePicker);
app.component('Dialog', Dialog);
app.component('Divider', Divider);
app.component('ProgressBar', ProgressBar);
app.component('Message', Message);
app.component('Badge', Badge);
app.component('Card', Card);
app.component('InputIcon', InputIcon);

app.mount("#app");
