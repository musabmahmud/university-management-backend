import { Response } from 'express';
import httpStatus from 'http-status';

type TResponse<T> = {
  statusCode?: number;
  success?: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode || httpStatus.OK).json({
    success: data.success || true,
    message: data.message,
    data: data.data
  });
};

export default sendResponse;
