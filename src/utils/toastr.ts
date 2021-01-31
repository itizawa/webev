import * as toastr from 'toastr';

const toastrOption = {
  error: {
    closeButton: true,
    progressBar: true,
    newestOnTop: false,
    showDuration: 100,
    hideDuration: 100,
    timeOut: 0,
  },
  success: {
    closeButton: true,
    progressBar: true,
    newestOnTop: false,
    showDuration: 100,
    hideDuration: 100,
    timeOut: 3000,
  },
};

// accepts both a single error and an array of errors
export const toastError = (err: { message: string }, header = 'Error', option = toastrOption.error): void => {
  toastr.error(err.message, header, option);
};

// only accepts a single item
export const toastSuccess = (body: string, header = 'Success', option = toastrOption.success): void => {
  toastr.success(body, header, option);
};
