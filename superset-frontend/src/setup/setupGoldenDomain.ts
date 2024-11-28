function postNavigationMessage(url: string) {
  window.parent.postMessage(
    {
      type: 'NAVIGATION_REQUEST',
      url: url,
    },
    '*',
  );
};

// function interceptHistory() {
//   const originalPushState = window.history.pushState;
//   const originalReplaceState = window.history.replaceState;

//   const interceptNavigation = (
//     method: typeof window.history.pushState,
//     args: [any, string, string | URL | null],
//   ): void => {
//     const [state, title, url] = args;
//     if (url && window.self !== window.top) {
//       postNavigationMessage(new URL(url, window.location.origin).toString())

//       // Block the navigation by NOT calling the original method
//       console.log(`Blocked navigation to: ${url}`);
//       return;
//     }

//     // Allow navigation if not in an iframe or the URL is permitted
//     method.apply(window.history, args);
//   };

//   // Override pushState
//   window.history.pushState = function (
//     state: any,
//     title: string,
//     url?: string | URL | null,
//   ): void {
//     console.log("pushState")
//     interceptNavigation(originalPushState, [state, title, url]);
//   };

//   // Override replaceState
//   window.history.replaceState = function (
//     state: any,
//     title: string,
//     url?: string | URL | null,
//   ): void {
//     console.log("replaceState")
//     interceptNavigation(originalReplaceState, [state, title, url]);
//   };

//   // Listen for `popstate` events to intercept back/forward navigations
  // window.addEventListener('popstate', (event) => {
  //   console.log("POP STATE");
  //   event.preventDefault();
  //   if (window.self !== window.top) {
  //     const currentUrl = window.location.href;
  //     console.log(`Intercepted popstate navigation to: ${currentUrl}`);

  //     postNavigationMessage(currentUrl);

  //     // Optionally prevent default behavior
  //     window.history.pushState(event.state, document.title, currentUrl);
  //   }
  // });

//   console.log('History navigation interception initialized.');
// }

function handleNavigation(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const anchor = target.closest('a');

  if (anchor && window.self !== window.top) {
    event.preventDefault();
    const url = anchor.href;
    // console.log('Intercepted navigation to', url);
    postNavigationMessage(url);
  }
}

export default function setupGoldenDomain() {
  document.addEventListener('click', handleNavigation);


  const oldOpen = window.open;
  window.open = (url: string, target: string, features: string): null => {
    console.log("window.open", url, target, features);
    if (window.self !== window.top) {
      postNavigationMessage(url);
    } else {
      oldOpen(url, target, features);
    }
    return null;
  };

  // interceptHistory();
  // Send the initial URL to the parent window
  // console.log("SEND INITIAL URL");
  postNavigationMessage(window.location.href);
}
