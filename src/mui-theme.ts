import { createMuiTheme } from "@material-ui/core";

const colors = {
  gray: "#adadad",
  orange: "#ff6600",
  orangeLight: "#ff8a3d",
  orangeDark: "#df5a01",
  dark: "#000",
  white: "#fff",
  green: "#52ae30",
  yellow: "#ffcc00",
  charcoal700: "#dedede"
};

const defaultTheme = createMuiTheme({
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(",")
  },
  palette: {
    primary: {
      light: colors.orangeLight,
      main: colors.orange,
      dark: colors.orangeDark,
      contrastText: colors.white
    },
    secondary: {
      light: colors.green,
      main: colors.green,
      dark: colors.green,
      contrastText: colors.white
    },
    text: {
      hint: colors.yellow
    },
    background: {
      default: colors.white
    }
  }
});

const {
  breakpoints,
  spacing,
  typography: { pxToRem }
} = defaultTheme;

export const muiTheme = {
  ...defaultTheme,
  props: {
    MuiInput: {
      disableUnderline: true
    },
    MuiFilledInput: {
      disableUnderline: true
    },
    MuiLink: {
      underline: "none"
    }
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: defaultTheme.palette.common.white,
        fontSize: pxToRem(16),
        color: defaultTheme.palette.common.black,
        fontWeight: 400,
        padding: defaultTheme.spacing(2.5, 3),
        boxShadow: "0 12px 32px 0 rgba(0, 0, 0, 0.2)"
      }
    },
    MuiTypography: {
      h1: {
        fontSize: 120,
        fontFamily: "Lato, SourceSansPro",
        fontWeight: 700,
        [breakpoints.down("md")]: {
          fontSize: 64
        }
      },
      h2: {
        fontSize: 52,
        lineHeight: "120%",
        [breakpoints.down("md")]: {
          fontSize: 28
        }
      },
      h3: {
        fontSize: 40,
        lineHeight: "120%",
        fontWeight: 400,
        [breakpoints.down("md")]: {
          fontSize: 24
        }
      },
      h4: {
        fontSize: 32,
        [breakpoints.down("md")]: {
          fontSize: 20
        }
      },
      h5: {
        fontWeight: 400,
        fontSize: 22,
        [breakpoints.down("md")]: {
          fontSize: 18
        }
      },
      h6: {
        fontSize: 18,
        fontWeight: 400,
        [breakpoints.down("md")]: {
          fontSize: 16
        }
      },
      subtitle1: {
        fontSize: 80,
        fontWeight: 400,
        [breakpoints.down("md")]: {
          fontSize: 42
        }
      },
      subtitle2: {
        fontSize: 16,
        fontWeight: 400,
        [breakpoints.down("md")]: {
          fontSize: 14
        }
      }
    },
    MuiCssBaseline: {
      "@global": {
        body: {
          fontSize: 12,
          [breakpoints.down("md")]: {
            fontSize: 11
          }
        }
      }
    },
    MuiFilledInput: {
      root: {
        border: `1px solid ${defaultTheme.palette.grey[300]}`,
        overflow: "hidden",
        borderRadius: pxToRem(6),
        backgroundColor: defaultTheme.palette.grey[100],
        "&:hover": {
          backgroundColor: defaultTheme.palette.common.white
        },
        "&$focused": {
          backgroundColor: defaultTheme.palette.common.white,
          borderColor: defaultTheme.palette.grey[300]
        }
      },
      focused: {}
    },
    MuiInputLabel: {
      root: {
        "&$focused": {
          color: defaultTheme.palette.secondary.main
        }
      },
      focused: {}
    },
    MuiButton: {
      root: {
        fontWeight: "inherit",
        textTransform: "unset"
      },
      sizeLarge: {
        fontSize: 22,
        padding: "13px 40px",
        [defaultTheme.breakpoints.down("xs")]: {
          padding: "14px 40px",
          fontSize: 20,
          lineHeight: "130%"
        }
      },
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none"
        }
      }
    },
    MuiSlider: {
      root: {
        color: defaultTheme.palette.secondary.main
      },
      rail: {
        backgroundColor: defaultTheme.palette.grey[400]
      }
    },
    MuiExpansionPanel: {
      root: {
        boxShadow: "none",
        "&$expanded": {
          "&:before": {
            opacity: 1
          }
        }
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: defaultTheme.spacing(2, 0)
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        padding: spacing(4, 0),
        overflow: "hidden",
        "&:hover": {
          color: defaultTheme.palette.secondary.main
        }
      },
      expandIcon: {
        color: "inherit",
        "& .MuiSvgIcon-root": {
          fontSize: 40
        },
        "&$expanded": {
          transform: "rotate(45deg)"
        }
      }
    },
    MuiLink: {
      root: {
        cursor: "pointer",
        color: defaultTheme.palette.text.primary,
        "&:hover": {
          color: defaultTheme.palette.secondary.main
        }
      }
    },
    MuiAppBar: {
      root: {
        "&.MuiPaper-elevation8": {
          boxShadow: "0 0 30px rgba(51, 51, 51, 0.23)"
        }
      }
    }
  },
  baseColors: colors
};
