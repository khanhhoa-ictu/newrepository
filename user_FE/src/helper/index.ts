import configs from 'config';
import { message } from 'antd';

export const handleErrorMessage = (error: any) => {
  message.destroy();
  message.error(getErrorMessage(error));
  if (configs.APP_ENV !== 'prod') {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};

export const getErrorMessage = (error: any) => {
  return error?.response?.data?.msg || 'Something went wrong!';
};


export const handleError = (err: string) => {
  message.destroy();
  message.error(err);
};

