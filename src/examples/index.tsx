import React, { useState, useMemo } from 'react';
import { Box, Select, MenuItem, useTheme } from '@mui/material';
import { BasicEditor } from './BasicEditor/BasicEditor';
import { DebugTools } from './DebugTools/DebugTools';
import { ReadonlyMode } from './ReadonlyMode/ReadonlyMode';
import { PresentationEditor } from './Presentation/PresentationEditor';

const examples = [
  { name: 'Basic Editor', component: BasicEditor },
  { name: 'Debug Tools', component: DebugTools },
  { name: 'Read-only Mode', component: ReadonlyMode },
  {name: 'Presentation Mode', component: PresentationEditor}
];

export const Examples = () => {
  const theme = useTheme();
  const [currentExample, setCurrentExample] = useState(0);

  const Example = useMemo(() => {
    return examples[currentExample].component;
  }, [currentExample]);

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Box sx={{ width: '100%', height: '100%' }}>{Example && <Example />}</Box>
      <Select
        sx={{
          position: 'absolute',
          bottom: theme.customVars.appPadding.y,
          right: theme.customVars.appPadding.x,
          bgcolor: 'common.white'
        }}
        value={currentExample}
        onChange={(e) => {
          setCurrentExample(e.target.value as number);
        }}
      >
        {examples.map((example, i) => {
          return (
            <MenuItem key={example.name} value={i}>
              {example.name}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};
