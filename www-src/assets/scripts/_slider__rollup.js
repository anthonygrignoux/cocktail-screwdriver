import { lory } from 'lory.js';

export function createSlider() {
  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.c-slider');
    lory(slider, {
      // options going here
    });
  });
}
