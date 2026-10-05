import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { failed: boolean };

// Catches render crashes (canvas, clock, lists) so one bad section
// never whitescreens the whole page.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('UI crashed:', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.failed) {
      return (
        <div role="alert" className="mx-auto max-w-[1200px] border border-line px-6 py-16 md:px-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Something broke</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 font-mono text-sm uppercase tracking-widest underline underline-offset-4"
          >
            Reload ↑
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
