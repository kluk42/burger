import {AxiosInstance, AxiosError} from 'axios';
import {FC, useEffect, useState} from 'react';

import Modal from '../../components/Modal';

const withErrorHandler = <T, >(WrappedComponent: FC<T>, axios: AxiosInstance)  =>
        (props: T) => {
        const [error, setError] = useState<AxiosError | null>(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const resInterceptor = axios.interceptors.response.use(
            res => res,
            (err: AxiosError) => {
                setError(err);
                return Promise.reject(err);
            }
        );

        useEffect(() => {
        return () => {
            console.log('bang');
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        };
        }, [reqInterceptor, resInterceptor, error]);

        const handleRenderModal = () => {
            setError(null);
        };

        return (
            <>
                <Modal handleRenderModal={handleRenderModal} show={!!error}>{error?.message+'. Reload the page'}</Modal>
                <WrappedComponent {...props}/>
            </>
        )
    }

export default withErrorHandler;
