var area = [
	'京', '沪', '津', '渝', '鲁', '冀', '晋', '蒙', '辽', '吉', '黑', '苏', '浙', '皖', '闽', '赣', '豫', '湘', '鄂', '粤', '桂', '琼', '川',
	'贵', '云', '藏', '陕', '甘', '青', '宁', '新', '港', '澳', '台'
]


function getDate(type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 3;
	} else if (type === 'end') {
		year = year + 3;
	}else if (type === 'now') {
		year = year 
	}
	
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;
	return `${year}-${month}-${day}`;
}

function formatDate(date) {
  var date = new Date(date);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  // var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  // var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  // var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  // var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM
}

export {
	area,
	getDate,
	formatDate
}
