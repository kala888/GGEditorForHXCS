import {Command} from 'gg-editor';
import React from 'react';
import {Balloon} from '@alifd/next';
import IconFont from '../../common/IconFont';

// @ts-ignore
import styles from './index.module.scss';
// import {FormattedMessage} from "react-intl";
const Tooltip = Balloon.Tooltip;

interface ToolbarButtonProps {
  command: string;
  icon?: string;
  text?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = props => {
  const {command, icon} = props;
  const leftTop = <IconFont type={`icon-${icon || command}`} />;
  // const leftTop = <IconFont type={`icon-${icon || command}`} />;
  return (
    <div className={styles.anticon}>
      <Command name={command}>
        <Tooltip
          trigger={leftTop}
          align="b"
          // popupClassName={styles.tooltip}
        >
          {/* <IconFont type={`icon-${icon || command}`} /> */}
          {/* <FormattedMessage id={icon || command} /> */}
        </Tooltip>
      </Command>
    </div>
  );
};

export default ToolbarButton;
