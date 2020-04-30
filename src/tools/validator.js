//手机号验证
export const validPhone = (rule, value, callback) => {
	if (!value) {
		return callback(new Error("电话不能为空"));
	} else {
		const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
		if (!reg.test(value)) {
			return callback(new Error("请输入正确的电话"));
		} else {
			return callback();
		}
	}
}

//手机号和座机号验证
export const validTel = (rule, value, callback) => {
	if (!value) {
		return callback(new Error("电话不能为空"));
	} else {
		const reg = /^((0\d{2,3}-\d{7,8})|(1[3568479]\d{9}))$/;
		if (!reg.test(value)) {
			return callback(new Error("请输入正确的电话"));
		} else {
			return callback();
		}
	}
}
//限制字数
export const limitWords = (rule, value, callback) => {
	if (!value) {
		return callback(new Error("标题不能为空"));
	} else {
		if (value.length > 10) {
			return callback(new Error("标题不能超过十个字符"));
		} else {
			return callback();
		}
	}
}
