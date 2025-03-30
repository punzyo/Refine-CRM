import { AuthPage } from '@refinedev/mui'
import Logo from '/icon-192.png'

const Login = () => {
  return (
    <AuthPage
      type="login"
      title={<img src={Logo} style={{ width: 180 }} alt="logo" />}
      registerLink={false}
      forgotPasswordLink={false}
      contentProps={{
        sx: { padding: '32px' },
      }}
      renderContent={(content, title) => (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 32,
            }}
          >
            {title}
          </div>
          {content}
        </>
      )}
    />
  )
}

export default Login
