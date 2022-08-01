import Icon from '@ant-design/icons';
import { SLInputNumber } from '@yy/sl-admin-components';
import classnames from 'classnames';
import React from 'react';
import styles from './index.module.less';
import { SvgCondition, SvgConditionClose } from '@/static/icons';
import { Tooltip } from 'antd';
import Draggable from './Draggable';

interface IProps {
  value?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: string) => void;
}

const [top, right, bottom, left] = [0, 0, 0, 0];

const Margin: React.FC<IProps> = props => {
  const { value = '0 0 0 0', unit = 'px', min = 0, max = 50, step = 1, onChange } = props;
  const [top, right, bottom, left] = value.split(' ');
  const [condition, setCondition] = React.useState(true);
  const [paddingTop, setPaddingTop] = React.useState(Number.parseInt(top));
  const [paddingRight, setPaddingRight] = React.useState(Number.parseInt(right));
  const [paddingBottom, setPaddingBottom] = React.useState(Number.parseInt(bottom));
  const [paddingLeft, setPaddingLeft] = React.useState(Number.parseInt(left));
  const [showTop, setShowTop] = React.useState(false);
  const [showRight, setShowRight] = React.useState(false);
  const [showBottom, setShowBottom] = React.useState(false);
  const [showLeft, setShowLeft] = React.useState(false);

  const click = (source: string) => {
    if (source === 'top') {
      setShowTop(true);
    }
    if (source === 'right') {
      setShowRight(true);
    }
    if (source === 'bottom') {
      setShowBottom(true);
    }
    if (source === 'left') {
      setShowLeft(true);
    }
  };

  const blur = (source: string) => {
    console.log('source', source);
    if (source === 'top') {
      setShowTop(false);
    }
    if (source === 'right') {
      setShowRight(false);
    }
    if (source === 'bottom') {
      setShowBottom(false);
    }
    if (source === 'left') {
      setShowLeft(false);
    }
  };

  const onChangeInput = (value: any, source: string) => {
    console.log('changed', value);
    if (source === 'top') {
      if (condition) {
        setPaddingTop(value);
        setPaddingRight(value);
        setPaddingBottom(value);
        setPaddingLeft(value);
        if (typeof onChange === 'function') {
          onChange(`${value + unit} ${value + unit} ${value + unit} ${value + unit}`);
        }
      } else {
        setPaddingTop(value);
        if (typeof onChange === 'function') {
          onChange(`${value + unit} ${paddingRight + unit} ${paddingBottom + unit} ${paddingLeft + unit}`);
        }
      }
    }
    if (source === 'right') {
      if (condition) {
        setPaddingTop(value);
        setPaddingRight(value);
        setPaddingBottom(value);
        setPaddingLeft(value);
        if (typeof onChange === 'function') {
          onChange(`${value + unit} ${value + unit} ${value + unit} ${value + unit}`);
        }
      } else {
        setPaddingRight(value);
        if (typeof onChange === 'function') {
          onChange(`${paddingLeft + unit} ${value + unit} ${paddingBottom + unit} ${paddingLeft + unit}`);
        }
      }
    }
    if (source === 'bottom') {
      if (condition) {
        setPaddingTop(value);
        setPaddingRight(value);
        setPaddingBottom(value);
        setPaddingLeft(value);
        if (typeof onChange === 'function') {
          onChange(`${value + unit} ${value + unit} ${value + unit} ${value + unit}`);
        }
      } else {
        setPaddingBottom(value);
        if (typeof onChange === 'function') {
          onChange(`${paddingLeft + unit} ${paddingRight + unit} ${value + unit} ${paddingLeft + unit}`);
        }
      }
    }
    if (source === 'left') {
      if (condition) {
        setPaddingTop(value);
        setPaddingRight(value);
        setPaddingBottom(value);
        setPaddingLeft(value);
        if (typeof onChange === 'function') {
          onChange(`${value + unit} ${value + unit} ${value + unit} ${value + unit}`);
        }
      } else {
        setPaddingLeft(value);
        if (typeof onChange === 'function') {
          onChange(`${paddingLeft + unit} ${paddingRight + unit} ${paddingBottom + unit} ${value + unit}`);
        }
      }
    }
  };

  const onDrag = ({ translation, id }: any) => {
    console.log('onDrag', translation, id);
    if (id === 'top') {
      console.log('translation', translation);
      setPaddingTop(translation.y);
    }
    if (id === 'right') {
      console.log('translation', translation);
      setPaddingRight(140 - 2 - translation.x ? 140 - 2 - translation.x : 0);
    }
    if (id === 'bottom') {
      console.log('translation', translation);
      setPaddingBottom(140 - 2 - translation.y ? 140 - 2 - translation.y : 0);
    }
    if (id === 'left') {
      console.log('translation', translation);
      setPaddingLeft(translation.x);
    }
  };

  const onDragEnd = () => {
    console.log('onDragEnd');
  };

  const DragTop = React.useMemo(() => {
    return (
      <>
        <Draggable
          id="top"
          className={styles['drag-top']}
          style={{
            width: 140 - paddingLeft - paddingRight + unit,
          }}
          position={{ x: paddingLeft, y: paddingTop }}
          parentContainer={{ width: 140, height: 140 }}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
        >
          <div id="top">
            {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <path
                                d={`M ${paddingLeft} ${paddingTop} l ${140 - paddingRight} ${paddingTop}`}
                                fill='none'
                                strokeWidth={1}
                                stroke="green"
                            />
                        </svg> */}
          </div>
        </Draggable>
      </>
    );
  }, [paddingLeft, paddingRight]);
  const DragRight = React.useMemo(() => {
    return (
      <>
        <Draggable
          id="right"
          className={styles['drag-right']}
          style={{
            height: 140 - paddingTop - paddingBottom,
          }}
          position={{ x: 140 - paddingRight - 2, y: paddingTop }}
          parentContainer={{ width: 140, height: 140 }}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
        >
          <div id="right"></div>
        </Draggable>
      </>
    );
  }, [paddingTop, paddingBottom]);
  const DragBottom = React.useMemo(() => {
    return (
      <>
        <Draggable
          id="bottom"
          className={styles['drag-bottom']}
          style={{
            width: 140 - paddingLeft - paddingRight,
          }}
          position={{ x: paddingLeft, y: 140 - paddingBottom - 2 }}
          parentContainer={{ width: 140, height: 140 }}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
        >
          <div id="bottom"></div>
        </Draggable>
      </>
    );
  }, [paddingLeft, paddingRight]);
  const DragLeft = React.useMemo(() => {
    return (
      <>
        <Draggable
          id="left"
          className={styles['drag-left']}
          style={{
            height: 140 - paddingTop - paddingBottom,
          }}
          position={{ x: paddingLeft, y: paddingTop }}
          parentContainer={{ width: 140, height: 140 }}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
        >
          <div id="left"></div>
        </Draggable>
      </>
    );
  }, [paddingTop, paddingBottom]);

  return (
    <div className={styles['container']}>
      <Tooltip title={condition ? '点击关闭四边关联' : '四边关联'}>
        <Icon
          className={styles['condition']}
          component={condition ? SvgConditionClose : SvgCondition}
          onClick={() => {
            const paddingBool = paddingTop === paddingRight && paddingTop === paddingBottom && paddingTop === paddingLeft;
            if (!condition && !paddingBool) {
              setPaddingTop(Number.parseInt(top));
              setPaddingRight(Number.parseInt(right));
              setPaddingBottom(Number.parseInt(bottom));
              setPaddingLeft(Number.parseInt(left));
            }
            setCondition(!condition);
          }}
        />
      </Tooltip>
      <div
        className={styles['outside']}
        style={{
          paddingTop: paddingTop + unit,
          paddingRight: paddingRight + unit,
          paddingBottom: paddingBottom + unit,
          paddingLeft: paddingLeft + unit,
        }}
      >
        <div className={classnames(styles['block'], styles['block-top'])} onClick={() => click('top')}>
          {!showTop && <div className={styles['view']}>{paddingTop}</div>}
          {showTop && (
            <SLInputNumber
              autoFocus
              min={min}
              max={max}
              step={step}
              value={paddingTop}
              onChange={value => onChangeInput(value, 'top')}
              onBlur={() => blur('top')}
            />
          )}
        </div>
        <div className={classnames(styles['block'], styles['block-right'])} onClick={() => click('right')}>
          {!showRight && <div className={styles['view']}>{paddingRight}</div>}
          {showRight && (
            <SLInputNumber
              autoFocus
              min={min}
              max={max}
              step={step}
              value={paddingRight}
              onChange={value => onChangeInput(value, 'right')}
              onBlur={() => blur('right')}
            />
          )}
        </div>
        <div className={classnames(styles['block'], styles['block-bottom'])} onClick={() => click('bottom')}>
          {!showBottom && <div className={styles['view']}>{paddingBottom}</div>}
          {showBottom && (
            <SLInputNumber
              autoFocus
              min={min}
              max={max}
              step={step}
              value={paddingBottom}
              onChange={value => onChangeInput(value, 'bottom')}
              onBlur={() => blur('bottom')}
            />
          )}
        </div>
        <div className={classnames(styles['block'], styles['block-left'])} onClick={() => click('left')}>
          {!showLeft && <div className={styles['view']}>{paddingLeft}</div>}
          {showLeft && (
            <SLInputNumber
              autoFocus
              min={min}
              max={max}
              step={step}
              value={paddingLeft}
              onChange={value => onChangeInput(value, 'left')}
              onBlur={() => blur('left')}
            />
          )}
        </div>

        <div className={styles['top-line']}></div>
        <div className={styles['right-line']}></div>
        <div className={styles['bottom-line']}></div>
        <div className={styles['left-line']}></div>

        {/* {Drag} */}
        {/* <Draggable
          id="top"
          className={styles['drag-top']}
          position={{ x: 0, y: 0 }}
          parentContainer={{ width: 140, height: 140 }}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
        >
          <div id="top"></div>
        </Draggable> */}
        {/* <Draggable 
                    id="right" 
                    className={styles['drag-right']}
                    position={{x: 90 + paddingRight, y: 50 - paddingTop}} 
                    parentContainer={{width: 140, height: 140}} 
                    onDrag={onDrag} 
                    onDragEnd={onDragEnd}
                >
                    <div id="right"></div>
                </Draggable> */}
        {/* <Draggable 
                    id="bottom" 
                    className={styles['drag-bottom']}
                    position={{x: 50 - paddingLeft , y: 50 + paddingBottom}} 
                    parentContainer={{width: 140, height: 140}} 
                    onDrag={onDrag} 
                    onDragEnd={onDragEnd}
                >
                    <div id="bottom"></div>
                </Draggable> */}
        {/* <Draggable 
                    id="left" 
                    className={styles['drag-left']}
                    position={{x: 50 - paddingLeft, y: 50 - paddingTop}} 
                    parentContainer={{width: 140, height: 140}} 
                    onDrag={onDrag} 
                    onDragEnd={onDragEnd}
                >
                    <div id="left"></div>
                </Draggable> */}
        <div className={styles['inside']}>
          {/* <div className={classnames(styles['line'], styles['line-top'])} style={{width: 40 + paddingLeft + paddingRight + unit}}></div>
                    <div className={classnames(styles['line'], styles['line-right'])} style={{height: 40 + paddingTop + paddingBottom + unit,}}></div>
                    <div className={classnames(styles['line'], styles['line-bottom'])} style={{width: 40 + paddingLeft + paddingRight + unit}}></div>
                    <div className={classnames(styles['line'], styles['line-left'])} style={{height: 40 + paddingTop + paddingBottom + unit,}}></div> */}
        </div>
      </div>
      <div className={styles['outside-model']}>
        {DragTop}
        {DragRight}
        {DragBottom}
        {DragLeft}
      </div>
    </div>
  );
};

Margin.displayName = 'Margin';

export default React.memo(Margin);
