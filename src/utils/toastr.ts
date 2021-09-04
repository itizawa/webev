import { error, success } from 'toastr';

const toastrOption = {
  error: {
    closeButton: true,
    progressBar: true,
    newestOnTop: false,
    showDuration: 100,
    hideDuration: 100,
    timeOut: 3000,
    positionClass: 'toast-bottom-left',
  },
  success: {
    closeButton: true,
    progressBar: true,
    newestOnTop: false,
    showDuration: 100,
    hideDuration: 100,
    timeOut: 3000,
    positionClass: 'toast-bottom-left',
  },
};

// NOTE: accepts both a single error and an array of errors
export const toastError = (err: { message: string }, header = 'Error', option = toastrOption.error): void => {
  error(err.message, header, option);
};

// NOTE: only accepts a single item
export const toastSuccess = (body: string, header = 'Success', option = toastrOption.success): void => {
  success(body, header, option);
};
