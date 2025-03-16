import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("❌ 捕捉到錯誤:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>發生錯誤</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
