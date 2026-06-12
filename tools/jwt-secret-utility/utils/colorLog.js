// colorLog.js - Provides RGB ANSI console helpers for readable terminal output.

// RESET returns terminal output back to the default color after a colored message.
export const RESET = '\x1b[0m';

// rgb creates a foreground color escape sequence using red, green, and blue channel values.
export function rgb(red, green, blue) {
  return `\x1b[38;2;${red};${green};${blue}m`;
}

// paint wraps a message in an RGB color and then resets the terminal color.
export function paint(message, red, green, blue) {
  return `${rgb(red, green, blue)}${message}${RESET}`;
}

// success prints positive results in bright RGB green.
export function success(message) {
  console.log(paint(message, 0, 255, 0));
}

// error prints failures in bright RGB red.
export function error(message) {
  console.log(paint(message, 255, 0, 0));
}

// info prints neutral guidance in RGB blue.
export function info(message) {
  console.log(paint(message, 100, 149, 237));
}

// warning prints caution messages in RGB orange.
export function warning(message) {
  console.log(paint(message, 255, 165, 0));
}

// label prints section headings in RGB cyan.
export function label(message) {
  console.log(paint(message, 0, 220, 255));
}
