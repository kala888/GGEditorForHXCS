import React from 'react';

// @ts-ignore
import styles from './index.module.scss';

interface BlockquoteProps {
  content?: string
}

class Blockquote extends React.Component<BlockquoteProps> {
  render() {
    return (
      <div className={styles.editBlockquote}>{this.props.content}</div>
    );
  }
};

export default Blockquote;
