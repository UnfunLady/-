export default function nTm(number) {
	let result = 0
	if (number >= 10000) {
		const newNumber = (number / 10000).toFixed(0)
		result = newNumber + '万'
	} else {
		result = number
	}
	return result
}
