export default interface IResetForm {
  step: number;
  oldUsername: string;
  newPassword: string;
  confirmPassword: string;
  domainName: string;
}
