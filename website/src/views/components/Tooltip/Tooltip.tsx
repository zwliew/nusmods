import * as React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';
import { animateFill } from 'tippy.js'; // eslint-disable-line import/no-extraneous-dependencies

import { isIOS } from 'bootstrapping/browser';

import 'styles/tippy/tippy.css';

// To use plugins, add them to DEFAULT_PLUGINS
const DEFAULT_PLUGINS = [animateFill];

export type Props = Omit<TippyProps, 'plugins'>;
const Tooltip: React.FC<Props> = (props) => {
  // Clone the props to make it extensible
  const tippyProps = { plugins: DEFAULT_PLUGINS, animateFill: true, ...props };

  // HACK: Emulate Android tooltip behavior (hold to show tooltip, tap to
  // activate click) on iOS
  if (tippyProps.touch === 'hold' && isIOS) {
    tippyProps.trigger = 'focus';
  }

  return <Tippy {...tippyProps} />;
};

const TooltipGroup: React.FC<Props> = (props) => {
  const singletonProps = {
    plugins: DEFAULT_PLUGINS,
    animateFill: true,
    ...props,
  };

  return <Tippy {...singletonProps} />;
};

export default Tooltip;
export { TooltipGroup };
