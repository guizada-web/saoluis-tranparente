import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, info: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, info) {
		this.setState({ error, info });
		// Log rápido para console (pode enviar para serviço de logging)
		console.error("ErrorBoundary capturou um erro:", error, info);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div style={{ padding: 20 }}>
					<h2>Ocorreu um erro ao renderizar a página</h2>
					<pre style={{ whiteSpace: "pre-wrap" }}>{this.state.error?.toString()}</pre>
					<details style={{ whiteSpace: "pre-wrap" }}>
						{this.state.info?.componentStack}
					</details>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;