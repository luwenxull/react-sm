import { FunctionElement } from './creatElement';

let _renderingFunctionElement: FunctionElement;

export function updateRenderingFunctionElement(element: FunctionElement): void {
  _renderingFunctionElement = element;
}

export function getRenderingFunctionElement(): FunctionElement {
  return _renderingFunctionElement;
}
