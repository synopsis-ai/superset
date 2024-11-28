
function interceptHistory() {
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  const interceptNavigation = (
    method: typeof window.history.pushState,
    args: [any, string, string | URL | null],
  ): void => {
    const [state, title, url] = args;
    if (url && window.self !== window.top) {
      // Notify the parent frame about the navigation attempt
      window.parent.postMessage(
        {
          type: 'NAVIGATION_REQUEST',
          url: new URL(url, window.location.origin).toString(),
        },
        '*', // Replace '*' with the parent frame's origin for better security
      );

      // Block the navigation by not calling the original method
      console.log(`Blocked navigation to: ${url}`);
      return;
    }

    // Allow navigation if not in an iframe or the URL is permitted
    method.apply(window.history, args);
  };

  // Override pushState
  window.history.pushState = function (
    state: any,
    title: string,
    url: string | URL | null,
  ): void {
    interceptNavigation(originalPushState, [state, title, url]);
  };

  // Override replaceState
  window.history.replaceState = function (
    state: any,
    title: string,
    url: string | URL | null,
  ): void {
    interceptNavigation(originalReplaceState, [state, title, url]);
  };

  console.log('History navigation interception initialized.');
}

function handleNavigation(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const anchor = target.closest('a');

  if (anchor && window.self !== window.top) {
    const url = anchor.href;
    const selfDomain = window.location.hostname;
    const urlDomain = new URL(url, window.location.origin).hostname;
    // Allow navigation away from superset
    if (selfDomain !== urlDomain) {
      return;
    }
    
    event.preventDefault();
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
  interceptHistory();
}