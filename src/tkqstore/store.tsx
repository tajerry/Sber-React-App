import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { photoApi } from "./services/photoApi";
import { postApi } from "./services/postApi";
import { commentApi } from "./services/commentApi";
import { userApi } from "./services/userApi";

const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      photoApi.middleware,
      commentApi.middleware,
      userApi.middleware,
    ),
});

// настраиваем листенеры для обработки запросов и мутаций.
setupListeners(store.dispatch);
export default store;
