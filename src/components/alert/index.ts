import Alert from './Alert';
import { createElement, ReactNode } from 'react';
import { render } from 'react-dom';
import { isString } from 'lodash';

export type AlertOptions =
  | string
  | {
      title?: string;
      hiddenTitle?: boolean;
      content?: ReactNode | string;
      closeButtonText?: string;
    };

let container = null;

export default async function AlertProxy(options: AlertOptions) {
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

    let onClose = function() {
      render(
        createElement(
          Alert,
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
      resolve();
    };

    render(
      createElement(
        Alert,
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
