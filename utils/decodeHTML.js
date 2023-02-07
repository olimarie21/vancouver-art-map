const decodeHTML = (txt) => {
	const txtContainer = document.createElement('textarea')
	txtContainer.innerHTML = txt
	return txtContainer.value
}

export default decodeHTML
