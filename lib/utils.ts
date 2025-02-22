import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[_\s]+/g, " ") // Replace underscores and spaces with a single space
    .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize first letter of each word
}

export function formatNumber(value: number): string {
  if (value % 1 === 0) {
    return value.toString(); // Convert whole numbers without decimal
  } else if (value > 0 && value < 1) {
    return (value * 100).toFixed(0) + "%"; // Convert decimal fractions to percentage
  }
  return value.toString(); // Default case
}

export function adjustColorForDarkBg(color: string): string {
  // Convert named colors and CSS formats to HEX/RGB
  let rgb = parseColorToRGB(color);
  if (!rgb) return "#FFFFFF"; // Default fallback (white)

  // Convert RGB to HSL
  let { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // Adjust lightness and saturation
  l = Math.max(l, 0.7); // Ensure brightness
  s = Math.min(s, 0.4); // Reduce saturation

  // Convert back to RGB
  let { r, g, b } = hslToRgb(h, s, l);

  // Convert to HEX
  return rgbToHex(r, g, b);
}

/* ----------------- Helper Functions ----------------- */

// Convert named colors, HEX, RGB, RGBA, HSL, HSLA to RGB
function parseColorToRGB(
  color: string
): { r: number; g: number; b: number } | null {
  let ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = color;
  let computed = ctx.fillStyle; // This converts named colors to RGB

  // Match RGB(A)
  let rgbMatch = computed.match(/^rgb(a)?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[2]),
      g: parseInt(rgbMatch[3]),
      b: parseInt(rgbMatch[4]),
    };
  }

  return null; // Unsupported format
}

// Convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number) {
  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h =
      max === r
        ? (g - b) / d + (g < b ? 6 : 0)
        : max === g
        ? (b - r) / d + 2
        : (r - g) / d + 4;
    h *= 60;
  }
  return { h, s, l };
}

// Convert HSL to RGB
function hslToRgb(h: number, s: number, l: number) {
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
      ? [x, c, 0]
      : h < 180
      ? [0, c, x]
      : h < 240
      ? [0, x, c]
      : h < 300
      ? [x, 0, c]
      : [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// Convert RGB to HEX
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}
