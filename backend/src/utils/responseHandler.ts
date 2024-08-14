import { Response } from "express";

const program = "Bevolv";
const version = "1.0.0";
const release = "01";

export const successMessage = (
  data: any,
  res: Response,
  message: string = "OK"
) => {
  const date = new Date();
  const timestamp = date.getTime();

  res.status(200).json({
    program: program,
    version: version,
    release: release,
    datetime: date,
    timestamp: timestamp,
    status: "Success",
    code: 200,
    message: message,
    data: data,
  });
};

export const errorMessage = (
  res: Response,
  error: string = "Something went wrong",
  statusCode: number = 500
) => {
  const date = new Date();
  const timestamp = date.getTime();

  res.status(statusCode).json({
    program: program,
    version: version,
    release: release,
    datetime: date,
    timestamp: timestamp,
    status: "Error",
    code: statusCode,
    message: error,
  });
};
