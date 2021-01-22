import * as React from 'react';

import retryImport from 'utils/retryImport';

import { Props } from './Tooltip';

// Can't use react-loadable for this since children and other props
// are not passed down - https://github.com/jamiebuilds/react-loadable/pull/161
let AsyncTooltip: React.ComponentType<Props> | null = null;
let AsyncTooltipGroup: React.ComponentType<Props> | null = null;

const useLoadTooltip = () => {
  React.useEffect(() => {
    if (!AsyncTooltip || !AsyncTooltipGroup) {
      retryImport(() => import(/* webpackChunkName: "tooltip" */ './Tooltip')).then((module) => {
        // Dirty but it works
        AsyncTooltip = module.default;
        AsyncTooltipGroup = module.TooltipGroup;
      });
    }
  }, []);
};

const Tooltip = React.memo<Props>(({ children, ...props }) => {
  useLoadTooltip();

  if (!AsyncTooltip) {
    return children as React.ReactElement;
  }

  return <AsyncTooltip {...props}>{children}</AsyncTooltip>;
});
Tooltip.displayName = 'Tooltip';

const TooltipGroup = React.memo<Props>(({ children, ...props }) => {
  useLoadTooltip();

  if (!AsyncTooltipGroup) {
    // cast needed because TooltipGroupProps types children as React.ReactElement which is not
    // compatible with the return type of React.FC, React.ReactElement
    return children as React.ReactElement;
  }

  return <AsyncTooltipGroup {...props}>{children}</AsyncTooltipGroup>;
});
TooltipGroup.displayName = 'TooltipGroup';

export default Tooltip;
export { TooltipGroup };
