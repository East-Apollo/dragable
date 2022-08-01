import React, { useState, useCallback, useMemo, useEffect } from 'react';

let POSITION = { x: 0, y: 0 };

interface Iprops {
  children: any;
  id: any;
  onDrag: any;
  onDragEnd: any;
  parentContainer: any;
  position?: any;
  className?: any;
  style?: any;
  positionX?: any;
  positionY?: any;
}

const Draggable: React.FC<Iprops> = ({
  children,
  id,
  onDrag,
  onDragEnd,
  parentContainer,
  position = { x: 0, y: 0 },
  positionX = 0,
  positionY = 0,
  className = null,
  style = {},
}) => {
  POSITION = position ? position : POSITION;
  if (positionX) {
    POSITION.x = positionX;
  }
  if (positionY) {
    POSITION.y = positionY;
  }
  console.log('position', id, position);
  console.log('id', id, POSITION);
  const [translationX, setTranslationX] = useState(position.x);
  const [translationY, setTranslationY] = useState(position.y);
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: {
      x: POSITION.x,
      y: POSITION.y,
    },
  });

  useEffect(() => {
    setTranslationX(position.x);
    setTranslationY(position.y);
  }, [position]);

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState(state => ({
      ...state,
      isDragging: true,
      origin: { x: clientX - state.translation.x, y: clientY - state.translation.y },
    }));
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const width = (document as any).getElementById(id).offsetWidth;
      const height = (document as any).getElementById(id).offsetHeight;
      const translation = { x: clientX - state.origin.x, y: clientY - state.origin.y };
      console.log('=========');
      console.log(clientX, clientY);
      console.log(state.origin.x, state.origin.y);
      console.log(width, height);
      console.log(translation);

      // 边界控制
      if (id === 'top') {
        if (translation.x < position.x) {
          translation.x = position.x;
        }
        if (translation.y < 0) {
          translation.y = 0;
        }
        if (translation.x >= position.x) {
          translation.x = position.x;
        }
        // if (translation.x + width > 140 - (translation.x + width)) {
        //     translation.x = 140 - (translation.x + width);
        // }
        if (translation.y + height > parentContainer.height - 90) {
          translation.y = parentContainer.height - 90;
        }
      }
      if (id === 'right') {
        if (translation.x < 90 - 2) {
          translation.x = 90 - 2;
        }
        if (translation.y < position.y) {
          translation.y = position.y;
        }
        if (translation.x + width > 140 - 2) {
          translation.x = 140 - 2;
        }
        if (translation.y >= position.y) {
          translation.y = position.y;
        }
        // if (translation.y + height > 140 - (translation.y + height)) {
        //     translation.y = 140 - (translation.y + height);
        // }
      }
      if (id === 'bottom') {
        if (translation.x < position.x) {
          translation.x = position.x;
        }
        if (translation.y < 90 - 2) {
          translation.y = 90 - 2;
        }
        if (translation.x >= position.x) {
          translation.x = position.x;
        }
        // if (translation.x + width > 140 - (translation.x + width)) {
        //     translation.x = 140 - (translation.x + width);
        // }
        if (translation.y + height > 140 - 2) {
          translation.y = 140 - 2;
        }
      }
      if (id === 'left') {
        if (translation.x < 0) {
          translation.x = 0;
        }
        if (translation.y < position.y) {
          translation.y = position.y;
        }
        if (translation.x + width > 50) {
          translation.x = 50;
        }
        if (translation.y >= position.y) {
          translation.y = position.y;
        }
        // if (translation.y + height > 90) {
        //     translation.y = 90;
        // }
      }

      setState(state => ({
        ...state,
        translation,
      }));
      setTranslationX(translation.x);
      setTranslationY(translation.y);

      onDrag({ translation, id });
    },
    [state.origin, onDrag, id],
  );

  const handleMouseUp = useCallback(() => {
    setState(state => ({
      ...state,
      isDragging: false,
    }));

    onDragEnd();
  }, [onDragEnd]);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
      transform: `translate(${translationX}px, ${translationY}px)`,
      transition: state.isDragging ? 'none' : 'transform 500ms',
      zIndex: state.isDragging ? 2 : 1,
      position: state.isDragging ? 'absolute' : 'absolute',
    }),
    [state.isDragging, translationX, translationY],
  );

  return (
    <div className={className} style={{ ...style, ...(styles as any) }} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default React.memo(Draggable);
