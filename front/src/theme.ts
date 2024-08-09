import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    cancel: Palette["primary"];
  }
  interface PaletteOptions {
    cancel?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    cancel: true;
  }
}

export let theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

theme = createTheme(theme, {
  palette: {
    cancel: theme.palette.augmentColor({
      color: {
        main: grey[500],
      },
      name: "cancel",
    }),
  },
});
