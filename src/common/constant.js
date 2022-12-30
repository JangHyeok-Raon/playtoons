/**
 * Toast.jsx type
 */
export const TOAST_TYPE = {
  info : 1,
  success: 2,
  error : 3,
};

export const DATE_FORMAT = "YYYY/MM/DD";

export const FILE_MAX_SIZE = 2000000;

export const TIMELINE_DELAY = 5000; // 5 seconds

/**
 * result code message list
 */
export const RESULT_CODE_LIST = [
  { code:0	 , name : 'OK'},
  { code:1	 , name : 'PARAMETER_REQUIRED'},
  { code:2   , name : 'INVALID_PARAMETER'},
  { code:3	 , name : 'UNCAUGHT_EXCEPTION'},
  { code:4	 , name : 'NOT_FOUND'},
  { code:5	 , name : 'PROCESS_FAILED_DB'},
  { code:6	 , name : 'PROCESS_FAILED_LOGIC'},
  { code:7	 , name : 'PROCESS_FAILED_SECURITY'},
  { code:8	 , name : 'DUPLICATED'},
  { code:9	 , name : 'AUTHORIZATION_REQUIRED'},
 { code: 10, name : 	'ACCOUNT_BLOCKED'},
 { code: 11, name : 	'INVALID_CREDENTIAL'},
 { code: 12, name : 	'MIGRATION_REQUIRED'},
 { code: 13, name : 	'MIGRATION_NOT_COMPLETED'},
 { code: 14, name : 	'MIGRATION_FAILED'},
 { code: 15, name : 	'TOO_MANY_SESSIONS'},
 { code: 16, name : 	'UNAUTHORIZED'},
 { code: 17, name : 	'FORBIDDEN'},
 { code: 18, name : 	'EXPIRED'},
 { code: 19, name : 	'PAYMENT_REQUIRED'},
 { code: 20, name : 	'EMAIL_BLACKLISTED'},
 { code: 21, name : 	'ALREADY_VERIFIED'},
 { code: 22, name : 	'EMAIL_NOT_CHANGED'},
 { code: 23, name : 	'PASSWORD_NOT_CHANGED'},
 { code: 24, name : 	'EMAIL_REQUIRED'},
 { code: 25, name : 	'EULA_UPDATED'},
 { code: 26, name : 	'PRIVACY_UPDATED'},
 { code: 27, name : 	'TOTP_REQUIRED'},
 { code: 28, name : 	'NOT_ALLOWED'},
 { code: 29, name : 	'LIMIT_EXCEEDED'},
];
