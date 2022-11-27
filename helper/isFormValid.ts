import IResetForm from "../interfaces/IResetForm";

export default function isFormValid(data: IResetForm) {
  let isValid = false;
  let message = "";

  switch (data.step) {
    case 1:
      if (data.oldUsername.length === 0) {
        message = "Field is empty!";
        break;
      }

      if (!(data.oldUsername.length >= 8 && data.oldUsername.length <= 12)) {
        message = "Not a valid username!";
        break;
      }

      isValid = true;
      break;

    case 2:
      if (data.answer.length > 12) {
        message = "Domain too long!";
        break;
      }

      isValid = true;
      break;

    case 3:
      if (data.newPassword.length === 0 || data.confirmPassword.length === 0) {
        message = "Please fill out all the fields.";
        break;
      }

      if (
        !(data.newPassword.length >= 8 && data.confirmPassword.length <= 12)
      ) {
        message = "Not a valid password!";
        break;
      }

      if (data.newPassword !== data.confirmPassword) {
        message = "Password do not match!";
        break;
      }

      isValid = true;
      break;
  }

  return { isValid, message };
}
