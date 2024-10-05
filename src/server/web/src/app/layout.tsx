import { Provider } from 'react-redux';
import { wrapper } from '../redux/store';

function RootLayout({ children }: { children: React.ReactNode }) {
  const { store, props } = wrapper.useWrappedStore({});
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}

export default RootLayout;