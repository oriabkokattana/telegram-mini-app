import { CSSProperties, forwardRef, HTMLAttributes } from 'react';
import { Text as RootText, TextProps as RootTextProps } from '@radix-ui/themes';

export type TextProps = {
  customSize?: CSSProperties['fontSize'];
  lineHeight?: CSSProperties['lineHeight'];
  letterSpacing?: CSSProperties['letterSpacing'];
  textTransform?: CSSProperties['textTransform'];
} & RootTextProps &
  HTMLAttributes<HTMLSpanElement>;

export const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ customSize, lineHeight, letterSpacing, textTransform, ...props }, forwardedRef) => {
    const style: CSSProperties = {};
    if (customSize) {
      style.fontSize = customSize;
    }
    if (lineHeight) {
      style.lineHeight = lineHeight;
    }
    if (letterSpacing) {
      style.letterSpacing = letterSpacing;
    }
    if (textTransform) {
      style.textTransform = textTransform;
    }
    return <RootText {...props} style={{ ...props.style, ...style }} ref={forwardedRef} />;
  }
);