import {
  Component,
  type ComponentType,
  FC,
  type GetDerivedStateFromError,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

export interface ErrorBoundaryProps extends PropsWithChildren {
  fallback?: ReactNode | ComponentType<{ error: unknown }>;
}

interface ErrorBoundaryState {
  error?: unknown;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {};

  static getDerivedStateFromError: GetDerivedStateFromError<
    ErrorBoundaryProps,
    ErrorBoundaryState
  > = (error) => ({ error });

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const {
      state: { error },
      props: { fallback: Fallback, children },
    } = this;

    return 'error' in this.state ? (
      typeof Fallback === 'function' ? (
        <Fallback error={error} />
      ) : (
        Fallback
      )
    ) : (
      children
    );
  }
}

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const ErrorBoundaryPlaceholder: FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary fallback={ErrorBoundaryError}>{children}</ErrorBoundary>
);

export default ErrorBoundaryPlaceholder;
