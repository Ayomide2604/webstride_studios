'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProfileSettings() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login/v1')
        return
      }
      setUser(user)
      
      // Set display name from user metadata
      const name = user.user_metadata?.display_name || 
                  user.user_metadata?.full_name || 
                  user.email?.split('@')[0] || 
                  'Admin'
      setDisplayName(name)
      
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.push('/login/v1')
      } else {
        setUser(session.user)
        const name = session.user.user_metadata?.display_name || 
                    session.user.user_metadata?.full_name || 
                    session.user.email?.split('@')[0] || 
                    'Admin'
        setDisplayName(name)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          display_name: displayName.trim()
        }
      })
      
      if (error) throw error
      setMessage('Profile updated successfully!')
      
      // Update local user state
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    
    if (error) {
      setError('Error sending password reset email: ' + error.message)
    } else {
      setMessage('Password reset email sent! Check your inbox.')
    }
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Profile Settings</h1>
            <Link href="/dashboard" className="btn btn-outline-secondary">
              ← Back to Dashboard
            </Link>
          </div>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">
                <i className="bi bi-person me-2"></i>
                Personal Information
              </h5>
              <form onSubmit={handleUpdateProfile}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={user?.email || ''}
                    disabled
                    readOnly
                  />
                  <div className="form-text">Email cannot be changed</div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="displayName" className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                    disabled={saving}
                  />
                  <div className="form-text">This name will be displayed in the navigation bar</div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">
                <i className="bi bi-shield-lock me-2"></i>
                Security
              </h5>
              <p className="text-muted mb-3">
                Want to change your password? Click the button below to receive a password reset email.
              </p>
              <button 
                className="btn btn-outline-primary"
                onClick={handlePasswordChange}
              >
                <i className="bi bi-key me-2"></i>
                Send Password Reset Email
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">
                <i className="bi bi-info-circle me-2"></i>
                Account Information
              </h5>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>User ID:</strong></p>
                  <p className="text-muted font-monospace small">{user?.id || 'N/A'}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Account Created:</strong></p>
                  <p className="text-muted">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Last Sign In:</strong></p>
                  <p className="text-muted">{user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Provider:</strong></p>
                  <p className="text-muted">{user?.app_metadata?.provider || 'email'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
