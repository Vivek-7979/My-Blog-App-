import loadingAnimation from '../assets/loading.webm'

function LoadingAnimation({ className = '' }) {
    return (
        <div className={`flex items-center justify-center ${className}`} role="status" aria-label="Loading">
            <video className="h-40 w-40" src={loadingAnimation} autoPlay loop muted playsInline />
        </div>
    )
}

export default LoadingAnimation