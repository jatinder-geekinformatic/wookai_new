import toastr from 'toastr';

export const successToaster = (msg, title) => {
  return toastr.success(msg, title);
};

export const warningToaster = (msg, title) => {
  return toastr.warning(msg, title);
};

export const errorToaster = (msg, title) => {
  return toastr.error(msg, title);
};

export const infoToaster = (msg, title) => {
  return toastr.info(msg, title);
};
