export type ColorScale = {
  [key: string]: string;
};

export interface ThemeTokens {
  seed: string;
  foundation: {
    primary: {
      base: string;
      hover: string;
      pressed: string;
      disabled: string;
      subtle: string;
    };
    secondary: {
      base: string;
      hover: string;
      pressed: string;
      disabled: string;
      subtle: string;
    };
    tertiary: {
      base: string;
      hover: string;
      pressed: string;
      disabled: string;
      subtle: string;
    };
    gray: ColorScale;
    primaryShades: ColorScale;
  };
  button: {
    seed: {
      base: string;
      hover: string;
      pressed: string;
      disabled: string;
    };
    primary: {
      base: string;
      hover: string;
      pressed: string;
      disabled: string;
    };
  };
  text: {
    onPrimary: {
      base: string;
      secondary: string;
      disabled: string;
    };
    default: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
    };
    onColor: {
      onPrimary: string;
      onSuccess: string;
      onWarning: string;
      onError: string;
    };
  };
  border: {
    base: string;
    hover: string;
    pressed: string;
    disabled: string;
    variant: {
      base: string;
      hover: string;
      pressed: string;
      divider: string;
      disabled: string;
    };
  };
  semantic: {
    success: {
      base: string;
      hover: string;
      pressed: string;
      background: string;
    };
    warning: {
      base: string;
      hover: string;
      pressed: string;
      background: string;
    };
    error: {
      base: string;
      hover: string;
      pressed: string;
      background: string;
    };
    info: {
      base: string;
      hover: string;
      pressed: string;
      background: string;
    };
  };
  background: {
    base: string;
    secondary: string;
    tertiary: string;
    overlay: string;
    section: string;
    card: string;
    slot: {
      active: string;
      disabled: string;
    };
    overlayScrim: string;
    overlaySheet: string;
    overlayHover: string;
    overlayPressed: string;
    surface: {
      seed: string;
      primary: string;
      hover: string;
      pressed: string;
      disabled: string;
    };
  };
  titlebar: {
    background: {
      base: string;
      disabled: string;
      control: {
        hover: string;
        hoverClose: string;
        pressed: string;
        pressedClose: string;
        disabled: string;
      };
    };
    icon: {
      base: string;
      hover: string;
      pressed: string;
      disabled: string;
    };
    text: {
      base: string;
      disabled: string;
    };
  };
  loader: {
    gray: {
      active: string;
      inactive: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
    };
    primary: {
      active: string;
      inactive: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
    };
  };
}
