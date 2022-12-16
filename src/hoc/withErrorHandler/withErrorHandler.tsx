import { AxiosError, AxiosInstance } from 'axios';
import { FC, ReactElement, useEffect, useState } from 'react';
import Modal from '../../components/Modal';

type WrappedComponent<T> = FC<T> & {
  children?: ReactElement;
};

const withErrorHandler =
  <T extends JSX.IntrinsicAttributes>(
    WrappedComponent: WrappedComponent<T>,
    axios: AxiosInstance
  ) =>
  (props: T) => {
    const [error, setError] = useState<AxiosError | null>(null);

    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });

    const resInterceptor = axios.interceptors.response.use(
      res => res,
      (err: AxiosError) => {
        if (err.response?.status !== 401) {
          setError(err);
        }
        return Promise.reject(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor, error]);

    const handleRenderModal = () => {
      setError(null);
    };

    return (
      <>
        <Modal handleRenderModal={handleRenderModal} show={!!error}>
          {error?.message + '. Reload the page'}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };

export default withErrorHandler;
