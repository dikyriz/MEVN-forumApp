import { createApp, markRaw } from "vue";
import App from "./App.vue";
import router from "./router";

//vue prime
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Editor from "primevue/editor";
import Dropdown from "primevue/dropdown";

import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(pinia);

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

//component
app.component("InputText", InputText);
app.component("Dialog", Dialog);
app.component("Button", Button);
app.component("Editor", Editor);
app.component("Dropdown", Dropdown);

app.mount("#app");
