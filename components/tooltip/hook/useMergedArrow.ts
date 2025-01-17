import React from 'react';

import { AbstractTooltipProps } from '..';
import { TooltipConfig } from '../../config-provider/context';

interface MergedArrow {
  show?: boolean;
  pointAtCenter?: boolean;
}
const useMergedArrow = (
  providedArrow?: AbstractTooltipProps['arrow'],
  providedContextArrow?: TooltipConfig['arrow'],
): MergedArrow => {
  const toConfig = (arrow?: boolean | AbstractTooltipProps['arrow']) =>
    typeof arrow === 'boolean' ? { show: arrow } : arrow || {};

  return React.useMemo(() => {
    const arrowConfig = toConfig(providedArrow);
    const contextArrowConfig = toConfig(providedContextArrow);

    return { ...contextArrowConfig, ...arrowConfig };
  }, [providedArrow, providedContextArrow]);
};

export default useMergedArrow;
