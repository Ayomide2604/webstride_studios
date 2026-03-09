import Link from 'next/link'

export default function AuthCodeError() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h2 className="card-title text-danger">Authentication Error</h2>
              <p className="card-text">
                There was an error during authentication. Please try again.
              </p>
              <Link href="/" className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
