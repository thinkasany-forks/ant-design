import type { ReactElement } from 'react';
import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import CSSMotion from '@rc-component/motion';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { composeRef } from '@rc-component/util/lib/ref';
import cls from 'classnames';

import type { ClosableType } from '../_util/hooks/useClosable';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { replaceElement } from '../_util/reactNode';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useStyle from './style';

export interface AlertRef {
  nativeElement: HTMLDivElement;
}

type SemanticName = 'root' | 'icon' | 'section' | 'title' | 'content' | 'actions';
export interface AlertProps {
  /** Type of Alert styles, options:`success`, `info`, `warning`, `error` */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** Whether Alert can be closed */
  closable?: ClosableType;
  /**
   * @deprecated please use `closable.closeIcon` instead.
   * Close text to show
   */
  closeText?: React.ReactNode;
  /** Content of Alert */
  title?: React.ReactNode;
  /**
   * @deprecated please use `title` instead.
   */
  message?: React.ReactNode;
  /**
   * @deprecated please use `content` instead.
   *  Additional content of Alert
   */
  description?: React.ReactNode;
  content?: React.ReactNode;
  /** Callback when close Alert */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  /** Trigger when animation ending of Alert */
  afterClose?: () => void;
  /** Whether to show icon */
  showIcon?: boolean;
  /** https://www.w3.org/TR/2014/REC-html5-20141028/dom.html#aria-role-attribute */
  role?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  rootClassName?: string;
  banner?: boolean;
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  action?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;

  id?: string;
}

const iconMapFilled = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
};

interface IconNodeProps {
  type: AlertProps['type'];
  icon: AlertProps['icon'];
  prefixCls: AlertProps['prefixCls'];
  content: AlertProps['content'];
  className?: string;
  style?: React.CSSProperties;
}

const IconNode: React.FC<IconNodeProps> = (props) => {
  const { icon, prefixCls, type, className, style } = props;
  const iconType = iconMapFilled[type!] || null;
  if (icon) {
    return replaceElement(icon, <span className={`${prefixCls}-icon`}>{icon}</span>, () => ({
      className: cls(
        (
          icon as ReactElement<{
            className?: string;
          }>
        ).props.className,
        className,
      ),
      style,
    })) as ReactElement;
  }
  return React.createElement(iconType, {
    className,
    style,
  });
};

type CloseIconProps = {
  isClosable: boolean;
  prefixCls: AlertProps['prefixCls'];
  closeIcon: AlertProps['closeIcon'];
  handleClose: AlertProps['onClose'];
  ariaProps: React.AriaAttributes;
};

const CloseIconNode: React.FC<CloseIconProps> = (props) => {
  const { isClosable, prefixCls, closeIcon, handleClose, ariaProps } = props;
  const mergedCloseIcon =
    closeIcon === true || closeIcon === undefined ? <CloseOutlined /> : closeIcon;
  return isClosable ? (
    <button
      type="button"
      onClick={handleClose}
      className={`${prefixCls}-close-icon`}
      tabIndex={0}
      {...ariaProps}
    >
      {mergedCloseIcon}
    </button>
  ) : null;
};

const Alert = React.forwardRef<AlertRef, AlertProps>((props, ref) => {
  const {
    description,
    content,
    prefixCls: customizePrefixCls,
    message,
    title,
    banner,
    className,
    rootClassName,
    style,
    onMouseEnter,
    onMouseLeave,
    onClick,
    afterClose,
    showIcon,
    closable,
    closeText,
    closeIcon,
    action,
    id,
    styles,
    classNames,
    ...otherProps
  } = props;
  const mergedContent = content ?? description;

  const mergedTitle = title ?? message;

  const [closed, setClosed] = React.useState(false);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Alert');
    [
      ['closeText', 'closable.closeIcon'],
      ['message', 'title'],
      ['description', 'content'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  const internalRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: internalRef.current!,
  }));

  const {
    getPrefixCls,
    direction,
    closable: contextClosable,
    closeIcon: contextCloseIcon,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('alert');

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
  );
  const prefixCls = getPrefixCls('alert', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClosed(true);
    props.onClose?.(e);
  };

  const type = React.useMemo<AlertProps['type']>(() => {
    if (props.type !== undefined) {
      return props.type;
    }
    // banner mode defaults to 'warning'
    return banner ? 'warning' : 'info';
  }, [props.type, banner]);

  // closeable when closeText or closeIcon is assigned
  const isClosable = React.useMemo<boolean>(() => {
    if (typeof closable === 'object' && closable.closeIcon) return true;
    if (closeText) {
      return true;
    }
    if (typeof closable === 'boolean') {
      return closable;
    }
    // should be true when closeIcon is 0 or ''
    if (closeIcon !== false && closeIcon !== null && closeIcon !== undefined) {
      return true;
    }

    return !!contextClosable;
  }, [closeText, closeIcon, closable, contextClosable]);

  // banner mode defaults to Icon
  const isShowIcon = banner && showIcon === undefined ? true : showIcon;

  const alertCls = cls(
    prefixCls,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-with-description`]: !!description,
      [`${prefixCls}-no-icon`]: !isShowIcon,
      [`${prefixCls}-banner`]: !!banner,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    contextClassName,
    className,
    rootClassName,
    mergedClassNames.root,
    cssVarCls,
    hashId,
  );

  const restProps = pickAttrs(otherProps, { aria: true, data: true });

  const mergedCloseIcon = React.useMemo(() => {
    if (typeof closable === 'object' && closable.closeIcon) {
      return closable.closeIcon;
    }
    if (closeText) {
      return closeText;
    }
    if (closeIcon !== undefined) {
      return closeIcon;
    }
    if (typeof contextClosable === 'object' && contextClosable.closeIcon) {
      return contextClosable.closeIcon;
    }
    return contextCloseIcon;
  }, [closeIcon, closable, closeText, contextCloseIcon]);

  const mergedAriaProps = React.useMemo<React.AriaAttributes>(() => {
    const merged = closable ?? contextClosable;
    if (typeof merged === 'object') {
      const { closeIcon: _, ...ariaProps } = merged;
      return ariaProps;
    }
    return {};
  }, [closable, contextClosable]);

  return (
    <CSSMotion
      visible={!closed}
      motionName={`${prefixCls}-motion`}
      motionAppear={false}
      motionEnter={false}
      onLeaveStart={(node) => ({ maxHeight: node.offsetHeight })}
      onLeaveEnd={afterClose}
    >
      {({ className: motionClassName, style: motionStyle }, setRef) => (
        <div
          id={id}
          ref={composeRef(internalRef, setRef)}
          data-show={!closed}
          className={cls(alertCls, motionClassName)}
          style={{
            ...mergedStyles.root,
            ...contextStyle,
            ...style,
            ...motionStyle,
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          role="alert"
          {...restProps}
        >
          {isShowIcon ? (
            <IconNode
              className={cls(`${prefixCls}-icon`, mergedClassNames.icon)}
              style={mergedStyles.icon}
              content={content}
              icon={props.icon}
              prefixCls={prefixCls}
              type={type}
            />
          ) : null}
          <div
            className={cls(`${prefixCls}-section`, mergedClassNames.section)}
            style={mergedStyles.section}
          >
            {mergedTitle ? (
              <div
                className={cls(`${prefixCls}-title`, mergedClassNames.title)}
                style={mergedStyles.title}
              >
                {mergedTitle}
              </div>
            ) : null}
            {mergedContent ? (
              <div
                className={cls(`${prefixCls}-content`, mergedClassNames.content)}
                style={mergedStyles.content}
              >
                {mergedContent}
              </div>
            ) : null}
          </div>
          {action ? (
            <div
              className={cls(`${prefixCls}-actions`, mergedClassNames.actions)}
              style={mergedStyles.actions}
            >
              {action}
            </div>
          ) : null}
          <CloseIconNode
            isClosable={isClosable}
            prefixCls={prefixCls}
            closeIcon={mergedCloseIcon}
            handleClose={handleClose}
            ariaProps={mergedAriaProps}
          />
        </div>
      )}
    </CSSMotion>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Alert.displayName = 'Alert';
}

export default Alert;
