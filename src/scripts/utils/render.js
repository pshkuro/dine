export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// Функция рендеринга DOM-элементов на страницу
export const render = (container, component, place) => {
  const element = component instanceof DocumentFragment
    ? component
    : component.getElement();
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Функция для создания DOM-элемента на основе шаблона разметки
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template.trim().replace(`\n`, ``);

  return newElement.firstChild;
};