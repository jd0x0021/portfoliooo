import { cssProps, msToNum, numToMs } from '~/utils/style';

export async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
