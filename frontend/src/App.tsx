import { RouterProvider } from "react-router";

import { CustomCursor } from "@components/common/custom-cursor/CustomCursor";
import routers from "@routes/index";

function App() {
  return (
    <>
      <CustomCursor />
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
