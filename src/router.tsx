import { createBrowserRouter } from "react-router";

import { App } from "./App";
import { JraDashboardPage } from "./pages/JraDashboardPage";
import { SearchPage } from "./pages/SearchPage";
import { UploadPage } from "./pages/UploadPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: SearchPage },
      { path: "upload", Component: UploadPage },
      { path: "retensi", Component: JraDashboardPage },
    ],
  },
]);
