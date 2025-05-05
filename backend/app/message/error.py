class Error:
    ERR_NOT_FOUND = "ERR_NOT_FOUND"
    ERR_INTERNAL_SERVER_ERROR = "ERR_INTERNAL_SERVER_ERROR"
    ERR_USER_NOT_FOUND = "ERR_USER_NOT_FOUND"
    ERR_PASSWORD_NOT_MATCH = "ERR_PASSWORD_NOT_MATCH"
    ERR_UNAUTHORIZED = "ERR_UNAUTHORIZED"
    ERR_CREATE_USER_EXIST_EMAIL = "ERR_CREATE_USER_EXIST_EMAIL"


ERROR_MESSAGE = {
    Error.ERR_NOT_FOUND: "Dữ liệu không tồn tại",
    Error.ERR_INTERNAL_SERVER_ERROR: "Lỗi máy chủ",
    Error.ERR_USER_NOT_FOUND: "Không tìm thấy người dùng",
    Error.ERR_PASSWORD_NOT_MATCH: "Sai mật khẩu",
    Error.ERR_UNAUTHORIZED: "Lỗi xác thực người dùng",
    Error.ERR_CREATE_USER_EXIST_EMAIL: "Người dùng với địa chỉ email này đã tồn tại trong hệ thống",
}