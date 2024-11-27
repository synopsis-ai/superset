
function handleNavigation(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const anchor = target.closest('a');

  if (anchor && window.self !== window.top) {
    event.preventDefault();
    const url = anchor.href;
    console.log("intercepted navigation to", url);

    window.parent.postMessage(
      {
        type: 'NAVIGATION_REQUEST',
        url: url,
      },
      '*',
    );
  }
}

export default function setupGoldenDomain() {
  document.addEventListener('click', handleNavigation);
}