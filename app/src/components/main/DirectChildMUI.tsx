import React from 'react';
import { ChildElement, MUIType } from '../../interfaces/Interfaces';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import DeleteButton from './DeleteButton';
import { useDispatch, useSelector } from 'react-redux';
import { changeFocus } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';

function DirectChildMUI({ childId, name, type, typeId, style }: ChildElement) {
  const state = useSelector((store: RootState) => store.appState);

  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const dispatch = useDispatch();

  // find the MUI element corresponding with this instance of an MUI element
  // find the current component to render on the canvas
  const MUIType: MUIType = state.MUITypes.find(
    (type: MUIType) => type.id === typeId
  );
  // hook that allows component to be draggable
  const [{ isDragging }, drag] = useDrag({
    // setting item attributes to be referenced when updating state with new instance of dragged item
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: false,
      childId: childId,
      instanceType: type,
      instanceTypeId: typeId
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const changeFocusFunction = (componentId: number, childId: number | null) => {
    dispatch(changeFocus({ componentId, childId }));
    if (roomCode) {
      emitEvent('changeFocusAction', roomCode, {
        componentId: componentId,
        childId: childId
      });
      // console.log('emit focus event from DirectChildMUI');
    }
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandler(event) {
    event.stopPropagation();
    changeFocusFunction(state.canvasFocus.componentId, childId);
  }

  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style of the referenced HTML element, and 3) default styling
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '2px solid #0671e3'
        : '1px solid #31343A'
  };

  const combinedStyle = combineStyles(
    combineStyles(combineStyles(globalDefaultStyle, MUIType.style), style),
    interactiveStyle
  );

  return (
    <div
      onClick={onClickHandler}
      style={{ ...combinedStyle, backgroundColor: '#1E2024' }}
      ref={drag}
      id={`canv${childId}`}
    >
      <span>
        <strong style={{ color: 'white' }}>{MUIType.placeHolderShort}</strong>
        <DeleteButton
          id={childId}
          name={name[0].toLowerCase() + name.slice(1)}
          onClickHandler={onClickHandler}
        />
      </span>
    </div>
  );
}

export default DirectChildMUI;
