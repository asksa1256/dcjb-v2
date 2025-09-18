type Timer = ReturnType<typeof setTimeout> | null;

const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  timeout = 300
) => {
  let timer: Timer = null;

  const debounced = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, timeout);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced as T & { cancel: () => void };
};

export default debounce;
