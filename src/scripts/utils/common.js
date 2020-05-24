const Timeout = {
  SHAKE_ANIMATION: 600,
  SHOW_ELEMENT: 4000,
};

// Добавляет элементу активный класс при клике
export const activateElement = (activeClickElement, container, activeClass) => {
  const activeElement = container.querySelector(`.${activeClass}`);

  if (activeElement) {
    activeElement.classList.remove(activeClass);
    activeClickElement.classList.add(activeClass);
  }
};

// Эффект `покачивание головой при неудачной отправке/удалении коммента`
export const shake = (element) => {
  element.classList.add(`shake`);

  setTimeout(() => {
    element.classList.remove(`shake`);
  }, Timeout.SHAKE_ANIMATION);
};

export const showElement = (element) => {
  element.style.display = 'block';

  setTimeout(() => {
    element.style.display ='none';
  }, Timeout.SHOW_ELEMENT);
};
