import { CircularProgress } from '@material-ui/core';

export const LoadingOverlay = ({ loading, children }) => {
  return (
    <div style={{ position: 'relative', opacity: loading ? 0.5 : 1 }}>
      {children}
      {loading && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};