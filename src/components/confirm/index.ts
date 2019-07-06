import Confirm from './Confirm';
import { createElement, ReactNode } from 'react';
import { render } from 'react-dom';
import { isString } from 'lodash';

export type ConfirmOptions =
  | string
  | {
      title?: string;
      hiddenTitle?: boolean;
      content?: string | ReactNode;
      confirmButtonText?: string;
      cancelButtonText?: string;
    };

let container = null;

export default async function ConfirmProxy(options: ConfirmOptions) {
  if (container === null) {
    container = document.createElement('div');
    container.className = 'alert-container';
    document.body.appendChild(container);
  }

  return new Promise(function(resolve) {
    if (isString(options)) {
      options = {
        content: options
      };
    }

    let onClose = function(result) {
      render(
        createElement(
          Confirm,
          {
            ...(options as object),
            open: false,
            onClose: null
          },
          null
        ),
        container
      );
      onClose = null;
      resolve(result);
    };

    render(
      createElement(
        Confirm,
        {
          ...(options as object),
          open: true,
          onClose
        },
        null
      ),
      container
    );
  });
}
