import "./index.css";

const portalEl = document.createElement("div");
portalEl.className = "ac-bubble-portal";
document.body.append(portalEl);

export interface BubbleButton {
  icon?: string;
  label: string;
  action?: () => void;
}

export interface BubbleOptions {
  icon?: string;
  /** Stay until manually dismiss by clicking the bubble */
  persist?: boolean;
  /** Staying duration in milliseconds */
  duration?: number;
  /** Entering and exiting transition duration in milliseconds */
  transitionDuration?: number;
  buttons?: BubbleButton[];
  buttonsDirection?: "row" | "column";
}

function bubble(message: string, options?: BubbleOptions) {
  // Map options
  const duration = options?.duration || bubble.duration;
  const transitionDuration =
    options?.transitionDuration || bubble.transitionDuration;

  const wrapEl = document.createElement("div");
  wrapEl.className = "ac-bubble ac-bubble--entering";
  const messageEl = document.createElement("div");
  messageEl.className = "ac-bubble__message";
  messageEl.innerHTML = message;
  wrapEl.append(messageEl);
  portalEl.append(wrapEl);

  // Passing JS variables to CSS variables
  wrapEl.style.setProperty(
    "--bubble-height",
    wrapEl.getBoundingClientRect().height + "px"
  );
  wrapEl.style.setProperty(
    "--bubble-transition-duration",
    transitionDuration / 1000 + "s"
  );

  const exit = () => {
    wrapEl.classList.add("ac-bubble--exiting");
    wrapEl.classList.remove("ac-bubble--entered");

    setTimeout(() => {
      wrapEl.classList.add("ac-bubble--exited");
      wrapEl.classList.remove("ac-bubble--exiting");

      wrapEl.remove();
    }, transitionDuration);
  };

  setTimeout(() => {
    wrapEl.classList.add("ac-bubble--entered");
    wrapEl.classList.remove("ac-bubble--entering");
  }, transitionDuration);

  const exitTimeout = setTimeout(exit, transitionDuration + duration);

  wrapEl.onclick = () => {
    clearTimeout(exitTimeout);
    exit();
  };

  return {
    exit
  };
}

// Default options
bubble.duration = 5000;
bubble.transitionDuration = 300;

export default bubble;
