import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import superAdminReducer from "./reducers/superAdminReducer";
import tempReducer from "./reducers/tempReducer";
import stockReducer from "./reducers/stockReducer";
import qmpurchaseReducer from "./reducers/qmpurchaseReducer";
import qmissueReducer from "./reducers/qmissueReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import categoryReducer from "./reducers/categoryReducer";
import officeReducer from "./reducers/officeReducer";
import indentBillReducer from "./reducers/indentBillReducer";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "role", "pen"],
};

const qmpurchasePersistConfig = {
  key: "qmpurchase",
  storage,
  whitelist: ["purchaseEntry"], // Adjust the whitelist as needed
};

const qmissuePersistConfig = {
  key: "qmissue",
  storage,
  whitelist: ["entries"], // Adjust the whitelist as needed
};
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedQMPurchaseReducer = persistReducer(
  qmpurchasePersistConfig,
  qmpurchaseReducer
);
const persistedQMIssueReducer = persistReducer(
  qmissuePersistConfig,
  qmissueReducer
);


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    superAdmin: superAdminReducer,
    temp: tempReducer,
    stock: stockReducer,
    qmpurchase: persistedQMPurchaseReducer,
    qmissue: persistedQMIssueReducer,
    category: categoryReducer,
    office: officeReducer,
    indentBill: indentBillReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);