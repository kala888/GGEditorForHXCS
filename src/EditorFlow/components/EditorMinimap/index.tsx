import {Card} from '@alifd/next';
import {Minimap} from 'gg-editor';
import React from 'react';

const EditorMinimap = () => (
  <>
    <Card free>
      <Card.Header title="缩略图" />
      <Card.Content>
        <Minimap height={200} />
      </Card.Content>
    </Card>
  </>
);

export default EditorMinimap;
