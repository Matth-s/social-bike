import SignupForm from '../../features/auth/signup/SignupForm';

import './styles.scss';

export default function SignupPage() {
  return (
    <div className="signup-page" style={{ flex: 'display' }}>
      <SignupForm />
    </div>
  );
}
