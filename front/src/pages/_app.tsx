import { Outlet } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box } from "@mui/material";

export default function App(): JSX.Element {
  return (
    <>
      <Box component="main">
        <Outlet />
      </Box>
    </>
  );
}
