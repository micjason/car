const Mock = require('mockjs')
const BaseUrl = ''

Mock.mock(BaseUrl + '/api/order', {
	code: 1,
	data: [{
			name: '预约单号：',
			value: 'asdasd1233123'
		},
		{
			name: '预约单号：',
			value: 'asdasd1233123'
		},
		{
			name: '预约单号：',
			value: 'asdasd1233123'
		},
		{
			name: '预约单号：',
			value: 'asdasd1233123'
		}
	]
})
