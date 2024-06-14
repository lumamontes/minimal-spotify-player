interface Preset {
  name: string;
  gradient: string;
}

export const presets: Preset[] = [
  { name: 'Dark Mode', gradient: 'bg-dark-mode' },
  { name: 'Sunset', gradient: 'bg-sunset' },
  { name: 'Ocean', gradient: 'bg-ocean' },
  { name: 'Forest', gradient: 'bg-forest' },
  { name: 'Cyberpunk Wave', gradient: 'bg-cyberpunk-wave' },
  { name: '80s Synth', gradient: 'bg-80s-synth' },
  { name: 'Soft Pastel', gradient: 'bg-soft-pastel' },
  { name: 'Retro Wave', gradient: 'bg-retro-wave' },
];


export const gradients = [
  {
    name: 'bg-dark-mode',
    gradient: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
  },
  {
    name: 'bg-sunset',
    gradient: 'linear-gradient(to right, #f64f59, #c471ed, #12c2e9)',
  },
  {
    name: 'bg-ocean',
    gradient: 'linear-gradient(to right, #86fde8, #acb6e5)',
  },
  {
    name: 'bg-forest',
    gradient: 'linear-gradient(to right, #f7797d, #FBD786, #C6FFDD)',
  },
  {
    name: 'bg-cyberpunk-wave',
    gradient: 'linear-gradient(to right, #A5FECB, #20BDFF, #5433FF)',
  },
  {
    name: 'bg-80s-synth',
    gradient: 'linear-gradient(to right, #ffdde1, #ee9ca7)',
  },
  {
    name: 'bg-soft-pastel',
    gradient: 'linear-gradient(to right, #b8cbb8, #b8cbb8)',
  },
  {
    name: 'bg-retro-wave',
    gradient: 'linear-gradient(to right, #f6d365, #fda085)',
  },
];

// 'dark-mode': 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
// 'sunset': 'linear-gradient(to right, #f64f59, #c471ed, #12c2e9)',
// 'ocean': 'linear-gradient(to right, #86fde8, #acb6e5)',
// 'forest': 'linear-gradient(to right, #f7797d, #FBD786, #C6FFDD)',
// 'cyberpunk-wave': 'linear-gradient(to right, #A5FECB, #20BDFF, #5433FF)',
// '80s-synth': 'linear-gradient(to right, #ffdde1, #ee9ca7)',
// 'soft-pastel': 'linear-gradient(to right, #b8cbb8, #b8cbb8)',
// 'retro-wave': 'linear-gradient(to right, #f6d365, #fda085)',