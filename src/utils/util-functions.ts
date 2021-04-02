export const extendNavbar = () => {
  document.getElementById('menu-link')!.style.marginLeft = '20%';
  const menu = document.getElementById('menu');
  menu!.style.display = 'block';
  const el = document.getElementById('content');
  el!.style.marginLeft = '20%';
  el!.style.width = '80%';
};

export const minifyNavbar = () => {
  const menu = document.getElementById('menu');
  menu!.style.display = 'none';
  const el = document.getElementById('content');
  el!.style.marginLeft = '0';
  el!.style.width = '100%';

  const button = document.getElementById('menu-link');
  button!.style.marginLeft = '0';
};
