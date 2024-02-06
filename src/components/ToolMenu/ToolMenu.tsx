import React, { useCallback } from 'react';
import { Stack } from '@mui/material';
import {
  PanToolOutlined as PanToolIcon,
  NearMeOutlined as NearMeIcon,
  AddOutlined as AddIcon,
  EastOutlined as ConnectorIcon,
  CropSquareOutlined as CropSquareIcon,
  Title as TitleIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { IconButton } from 'src/components/IconButton/IconButton';
import { UiElement } from 'src/components/UiElement/UiElement';
import { useScene } from 'src/hooks/useScene';
import { TEXTBOX_DEFAULTS } from 'src/config';
import { generateId } from 'src/utils';
import { EditorModeEnum } from 'src/types';

export const ToolMenu = () => {
  const { createTextBox } = useScene();
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  
  const uiStateStoreActions = useUiStateStore((state) => {
    return state.actions;
  });
  const mousePosition = useUiStateStore((state) => {
    return state.mouse.position.tile;
  });

  const createTextBoxProxy = useCallback(() => {
    const textBoxId = generateId();

    createTextBox({
      ...TEXTBOX_DEFAULTS,
      id: textBoxId,
      tile: mousePosition
    });

    uiStateStoreActions.setMode({
      type: 'TEXTBOX',
      showCursor: false,
      id: textBoxId
    });
  }, [uiStateStoreActions, createTextBox, mousePosition]);

  if (uiStateStoreActions.getEditorMode() == EditorModeEnum.PRESENTATION) {
      return (
        <UiElement>
          <Stack direction="row">
          <IconButton
              name="Pan"
              Icon={<PanToolIcon />}
              onClick={() => {
                if (uiStateStoreActions.getMode() == 'INTERACTIONS_DISABLED') {
                  uiStateStoreActions.setMode({
                    type: 'PAN',
                    showCursor: true,
                  });
                } else {
                  uiStateStoreActions.setMode({
                    type: 'INTERACTIONS_DISABLED',
                    showCursor: false
                  });
                }
                uiStateStoreActions.setItemControls(null);
              }}
              isActive={mode.type === 'PAN'}
            />
            <IconButton
              name="Download PNG"
              Icon={<DownloadIcon />}
              onClick={() => {
                uiStateStoreActions.setMode({
                  type: 'INTERACTIONS_DISABLED',
                  showCursor: false
                });
                uiStateStoreActions.setDialog('EXPORT_IMAGE');
              }}
          isActive={false}
        />
          </Stack>
        </UiElement>
      );
    };

  return (
    <UiElement>
      <Stack direction="row">
        <IconButton
          name="Select"
          Icon={<NearMeIcon />}
          onClick={() => {
            uiStateStoreActions.setMode({
              type: 'CURSOR',
              showCursor: true,
              mousedownItem: null
            });
          }}
          isActive={mode.type === 'CURSOR' || mode.type === 'DRAG_ITEMS'}
        />
        <IconButton
          name="Pan"
          Icon={<PanToolIcon />}
          onClick={() => {
            uiStateStoreActions.setMode({
              type: 'PAN',
              showCursor: false
            });

            uiStateStoreActions.setItemControls(null);
          }}
          isActive={mode.type === 'PAN'}
        />
        <IconButton
          name="Add item"
          Icon={<AddIcon />}
          onClick={() => {
            uiStateStoreActions.setItemControls({
              type: 'ADD_ITEM'
            });
            uiStateStoreActions.setMode({
              type: 'PLACE_ICON',
              showCursor: true,
              id: null
            });
          }}
          isActive={mode.type === 'PLACE_ICON'}
        />
        <IconButton
          name="Rectangle"
          Icon={<CropSquareIcon />}
          onClick={() => {
            uiStateStoreActions.setMode({
              type: 'RECTANGLE.DRAW',
              showCursor: true,
              id: null
            });
          }}
          isActive={mode.type === 'RECTANGLE.DRAW'}
        />
        <IconButton
          name="Connector"
          Icon={<ConnectorIcon />}
          onClick={() => {
            uiStateStoreActions.setMode({
              type: 'CONNECTOR',
              id: null,
              showCursor: true
            });
          }}
          isActive={mode.type === 'CONNECTOR'}
        />
        <IconButton
          name="Text"
          Icon={<TitleIcon />}
          onClick={createTextBoxProxy}
          isActive={mode.type === 'TEXTBOX'}
        />
      </Stack>
    </UiElement>
  );
};
