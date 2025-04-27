import * as React from 'react';

import Alert from './Alert';

interface ErrorBoundaryProps {
  title?: React.ReactNode;
  /**
   * @deprecated please use `title` instead.
   */
  message?: React.ReactNode;
  /**
   * @deprecated please use `content` instead.
   */
  description?: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
}

interface ErrorBoundaryStates {
  error?: Error | null;
  info?: {
    componentStack?: string;
  };
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryStates> {
  state = {
    error: undefined,
    info: {
      componentStack: '',
    },
  };

  componentDidCatch(error: Error | null, info: object) {
    this.setState({ error, info });
  }

  render() {
    const { message, title, description, content, id, children } = this.props;
    const { error, info } = this.state;
    const mergedTitle = title ?? message;
    const mergedContent = content ?? description;
    const componentStack = info?.componentStack || null;
    const errorMessage =
      typeof mergedTitle === 'undefined' ? (error || '').toString() : mergedTitle;
    const errorContent = typeof mergedContent === 'undefined' ? componentStack : mergedContent;
    if (error) {
      return (
        <Alert
          id={id}
          type="error"
          title={errorMessage}
          content={<pre style={{ fontSize: '0.9em', overflowX: 'auto' }}>{errorContent}</pre>}
        />
      ) as React.ReactNode;
    }
    return children;
  }
}

export default ErrorBoundary;
